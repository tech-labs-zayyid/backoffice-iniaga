import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AgentsChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "New Agents Joined",
        data: [5, 10, 8, 15, 20, 18],
        backgroundColor: "#201D2A",
        borderColor: "#201D2A",
        pointBackgroundColor: "rgba(255, 52, 172, 1)",
        pointBorderColor: "#ffffff",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Supaya ukuran chart bisa fleksibel
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "Inter, sans-serif",
          },
          color: "#666666",
        },
      },
      title: {
        display: true,
        text: "Monthly New Agents Joined",
        font: {
          size: 18,
          family: "Inter, sans-serif",
        },
        color: "#444",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#888",
          font: {
            family: "Inter, sans-serif",
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "#888",
          font: {
            family: "Inter, sans-serif",
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
};

const Sales = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "New Agents Joined",
        data: [5, 10, 8, 15, 20, 18],
        backgroundColor: [
          "rgba(43, 190, 203, 0.6)",
          "rgba(255, 52, 172, 0.6)",
          "rgba(253, 230, 243, 0.6)",
          "rgba(144, 202, 249, 0.6)",
          "rgba(123, 239, 178, 0.6)",
          "rgba(250, 177, 160, 0.6)",
        ],
        borderColor: [
          "rgba(43, 190, 203, 1)",
          "rgba(255, 52, 172, 1)",
          "rgba(253, 230, 243, 1)",
          "rgba(144, 202, 249, 1)",
          "rgba(123, 239, 178, 1)",
          "rgba(250, 177, 160, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Agar chart bisa menyesuaikan ukuran layar
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "Inter, sans-serif",
          },
          color: "#666",
        },
      },
      title: {
        display: true,
        text: "Monthly New Agents Joined",
        font: {
          size: 18,
          family: "Inter, sans-serif",
        },
        color: "#444",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#888",
          font: {
            family: "Inter, sans-serif",
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "#888",
          font: {
            family: "Inter, sans-serif",
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white shadow-lg rounded-lg p-4 min-h-[350px]">
        <Sales />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 min-h-[350px]">
        <AgentsChart />
      </div>
    </div>
  );
};

export default Dashboard;
