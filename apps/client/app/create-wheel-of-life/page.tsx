"use client";
import React, { useState, useEffect } from "react";
import { AreasTable } from "../components/AreasTable";
import WheelChart from "../components/WheelChart";
import Link from "next/link";
import { predefinedAreas } from "../utils/predefinedAreas";

// Define the structure for each area in the Wheel of Life
interface Area {
  id: string;
  name: string;
  rating: number;
  color: string;
}

interface Assessment {
  id: string;
  name: string;
  date: string;
  areas: Area[];
}

const CreateAssessmentPage = () => {
  // Initialize areas state with localStorage data or default value
  const [areas, setAreas] = useState<Area[]>(() => {
    const savedAreas = localStorage.getItem("currentAreas");
    return savedAreas
      ? JSON.parse(savedAreas)
      : predefinedAreas.map((area) => ({ ...area, rating: 0 }));
  });

  const [assessmentName, setAssessmentName] = useState("");

  // Prepare data for the WheelChart component
  const chartData = {
    labels: areas.map((area) => area.name),
    datasets: [
      {
        label: "Wheel of Life",
        data: areas.map((area) => area.rating),
        backgroundColor: areas.map((area) => area.color + "80"), // 80 for 50% opacity
        borderColor: areas.map((area) => area.color),
        borderWidth: 2,
      },
    ],
  };

  // Handler to update the rating of an area
  const handleRatingChange = (id: string, newRating: number) => {
    const updatedAreas = areas.map((area) =>
      area.id === id ? { ...area, rating: newRating } : area
    );
    setAreas(updatedAreas);
  };

  // Effect to save areas to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("currentAreas", JSON.stringify(areas));
  }, [areas]);

  const handleSave = () => {
    if (!assessmentName.trim()) {
      alert("Please enter a name for your assessment.");
      return;
    }

    const newAssessment: Assessment = {
      id: Date.now().toString(),
      name: assessmentName,
      date: new Date().toISOString(),
      areas: areas,
    };

    const savedAssessments = JSON.parse(
      localStorage.getItem("savedAssessments") || "[]"
    );
    savedAssessments.push(newAssessment);
    localStorage.setItem("savedAssessments", JSON.stringify(savedAssessments));

    setAssessmentName("");
    alert("Assessment saved successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Create Your Wheel of Life
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Left column: Areas table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AreasTable areas={areas} onRatingChange={handleRatingChange} />
        </div>

        {/* Right column: Wheel chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <WheelChart data={chartData} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={assessmentName}
          onChange={(e) => setAssessmentName(e.target.value)}
          placeholder="Enter assessment name"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
        >
          Save Assessment
        </button>
      </div>
      {/* Navigation link back to home */}
      <Link
        href="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default CreateAssessmentPage;
