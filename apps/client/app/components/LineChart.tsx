import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Evolution Over Years",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
