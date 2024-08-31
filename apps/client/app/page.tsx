"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import barGraph from "../public/assets/images/barGraph.png";
import polarGraph from "../public/assets/images/polarGraph.png";
import AssessmentsTable from "./components/AssessmentsTable";
import PurchaseModal from "./components/PurchaseModal";
import { useRouter } from "next/navigation";

const HomePage = () => {
  // State to control the visibility of the purchase modal
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Handler for the "Create Assessment" button click
  const handleCreateAssessment = (e: React.MouseEvent) => {
    e.preventDefault();
    // setShowModal(true);
    router.push("/create-wheel-of-life");
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

      <PurchaseModal isOpen={false} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default HomePage;
