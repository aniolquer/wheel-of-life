"use client";
import React, { useState, useEffect } from "react";
import { AreasTable } from "../components/AreasTable";
import WheelChart from "../components/WheelChart";
import { AddAreaForm } from "../components/AddAreaForm";
import Link from "next/link";

// Define the structure for each area in the Wheel of Life
interface Area {
  areaName: string;
  rating: number;
}

const HomePage = () => {
  // Initialize areas state with localStorage data or default value
  const [areas, setAreas] = useState<Area[]>(() => {
    const savedAreas = localStorage.getItem("areas");
    return savedAreas
      ? JSON.parse(savedAreas)
      : [
          {
            areaName: "Family",
            rating: 5,
          },
          {
            areaName: "Fitness",
            rating: 3,
          },
        ];
  });

  // State to keep track of which area is being edited
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Prepare data for the WheelChart component
  const chartData = {
    labels: areas.map((area) => area.areaName),
    datasets: [
      {
        label: "Wheel of Life",
        data: areas.map((area) => area.rating),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(199, 199, 199, 0.5)",
          "rgba(83, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(199, 199, 199)",
          "rgb(83, 102, 255)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Handler to add a new area
  const handleAddArea = (areaName: string, rating: number) => {
    const newArea: Area = { areaName, rating };
    setAreas([...areas, newArea]);
  };

  // Handler to remove an area
  const handleRemoveArea = (index: number) => {
    const filteredAreas = areas.filter((_, areaIndex) => areaIndex !== index);
    setAreas(filteredAreas);
  };

  // Handler to set an area for editing
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  // Handler to update the rating of an area
  const handleRatingChange = (index: number, newRating: number) => {
    const updatedAreas = [...areas];
    updatedAreas[index].rating = newRating;
    setAreas(updatedAreas);
  };

  // Effect to save areas to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("areas", JSON.stringify(areas));
  }, [areas]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Create Your Wheel of Life
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Left column: Areas table and Add Area form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AreasTable
            areas={areas}
            onRatingChange={handleRatingChange}
            onRemoveArea={handleRemoveArea}
            onEdit={handleEdit}
            editingIndex={editingIndex}
          />
          <div className="mt-6">
            <AddAreaForm onAddArea={handleAddArea} />
          </div>
        </div>

        {/* Right column: Wheel chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <WheelChart data={chartData} />
        </div>
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

export default HomePage;
