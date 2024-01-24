"use client";
import React, { useState, useEffect } from "react";
import { Table } from "./components/Table";
import WheelChart from "./components/WheelChart";
import { AddAreaForm } from "./components/AddAreaForm";

const HomePage = () => {
  // Define your chart data here

  const [areas, setAreas] = useState(() => {
    const savedAreas = localStorage.getItem("areas");
    return savedAreas
      ? JSON.parse(savedAreas)
      : [
          {
            areaName: "Family",
            rating: 5,
          },
        ];
  });

  // Create a handler to update the areas state
  const handleRatingChange = (index, newRating) => {
    const updatedAreas = [...areas];
    updatedAreas[index].rating = newRating;
    setAreas(updatedAreas);
  };

  const handleAddArea = (areaName, rating) => {
    const newArea = { areaName, rating };
    setAreas([...areas, newArea]);
  };

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

  useEffect(() => {
    localStorage.setItem("areas", JSON.stringify(areas));
  }, [areas]);

  return (
    <div className="w-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-4xl font-bold text-indigo-500 m-8">
        My Wheel of Life
      </h1>
      <div className="w-11/12 h-5/6 flex items-center justify-center p-10 border-0 border-yellow-500">
        <div className="w-[500px] h-[500px] mr-20 ml-20 items-center border-0 border-purple-800">
          <Table areas={areas} onRatingChange={handleRatingChange} />
          <AddAreaForm onAddArea={handleAddArea} />
        </div>

        <div className="w-[700px] h-[700px] bg-white p-6 rounded-lg shadow-lg border-gray-200">
          <WheelChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
