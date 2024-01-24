import React from "react";
import { PolarArea } from "react-chartjs-2";
import "chart.js/auto";

const WheelChart = ({ data }) => {
  const config = {
    type: "polarArea",
    data: data,
    options: {
      borderAlign: "inner",
      responsive: true,
      scales: {
        r: {
          pointLabels: {
            display: true,
            centerPointLabels: true,
            font: {
              size: 18,
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "",
        },
      },
    },
  };

  return (
    <PolarArea data={data} options={config.options} className="w-2/5 h-2/5" />
  );
};

export default WheelChart;
