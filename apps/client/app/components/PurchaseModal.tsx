import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch the client secret when the modal opens
      fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) =>
          console.error("Error fetching client secret:", error)
        );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-lg shadow-xl w-full max-w-5xl flex">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-6">Purchase Assessment Token</h2>
          <p className="text-xl mb-6">
            To conduct an assessment, you need to purchase 1 token. This token
            allows you to:
          </p>
          <ul className="list-disc list-inside mb-6 text-lg">
            <li>Complete a comprehensive self-assessment</li>
            <li>Receive a detailed analysis of your life balance</li>
            <li>Access personalized insights and recommendations</li>
          </ul>
          <p className="text-lg mb-8">
            Your purchase helps us maintain and improve our services. Thank you
            for your support!
          </p>
          <div className="flex justify-start">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300 text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="w-1/2 pl-8 border-l border-gray-300">
          {clientSecret ? (
            <div className="h-full">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          ) : (
            <p className="text-xl">Loading checkout...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
