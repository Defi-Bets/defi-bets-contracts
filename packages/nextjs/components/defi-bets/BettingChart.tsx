import React from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

export const BettingChart = (labels: [], bettingSizes: [], winningSizes: [], maxWinnings: []) => {
  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: maxWinnings,
      },
      {
        type: "bar" as const,
        label: "Dataset 2",
        backgroundColor: "rgb(75, 192, 192)",
        data: bettingSizes,
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "bar" as const,
        label: "Dataset 3",
        backgroundColor: "rgb(53, 162, 235)",
        data: winningSizes,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
};
