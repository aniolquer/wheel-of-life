"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import barGraph from "../public/assets/images/barGraph.png";
import polarGraph from "../public/assets/images/polarGraph.png";
import AssessmentsTable from "./components/AssessmentsTable";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const HomePage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleCreateAssessment = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        console.error("Stripe failed to load");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <h1 className="text-5xl font-bold text-white mb-8">My Wheel of Life</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <Image
            src={polarGraph}
            width={400}
            height={400}
            alt="Polar Graph"
            className="mb-4"
          />
          <button
            onClick={handleCreateAssessment}
            className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Create Assessment
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <Image
            src={barGraph}
            width={400}
            height={400}
            alt="Bar Graph"
            className="mb-4"
          />
          <Link
            href="/evolution"
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
          >
            View Evolution
          </Link>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <AssessmentsTable />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Purchase Assessment</h2>
            <p className="mb-4">Would you like to purchase an assessment?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
