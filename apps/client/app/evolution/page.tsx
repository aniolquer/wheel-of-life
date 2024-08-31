"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { predefinedAreas } from "../utils/predefinedAreas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AreaRating {
  name: string;
  id: string;
  rating: number;
}

interface RatingEntry {
  id: string;
  name: string;
  date: string;
  areas: AreaRating[];
}

export default function Evolution() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("savedAssessments");
    console.log("Stored data:", storedData);
    if (storedData) {
      const parsedData: RatingEntry[] = JSON.parse(storedData);
      console.log("Parsed data:", parsedData);

      // Prepare data for the chart
      const datasets = predefinedAreas.map((area) => ({
        label: area.name,
        data: parsedData.map(
          (entry) => entry.areas.find((a) => a.id === area.id)?.rating || 0
        ),
        borderColor: area.color,
        backgroundColor: area.color + "20", // 20 for 12.5% opacity
        fill: false,
      }));

      setChartData({
        labels: parsedData.map((entry) =>
          new Date(entry.date).toLocaleDateString()
        ),
        datasets,
      });
    } else {
      console.log("No data found in localStorage");
    }
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Area Ratings Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Evolution</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        {chartData ? (
          <Line options={chartOptions} data={chartData} />
        ) : (
          <div className="h-96 flex flex-col items-center justify-center text-2xl text-gray-500">
            <p>No chart data available</p>
            <pre className="text-sm mt-4 overflow-auto max-h-64">
              {JSON.stringify(
                JSON.parse(localStorage.getItem("savedAssessments") || "[]"),
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
      <Link
        href="/"
        className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
