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
    labels: Array.from({ length: 30 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ),
    datasets: [
      {
        label: "New Agents Joined",
        data: [
          5, 10, 8, 15, 20, 18, 12, 9, 14, 7, 11, 16, 13, 19, 22, 17, 25, 21,
          24, 28, 26, 30, 27, 23, 29, 6, 3, 2, 4, 1,
        ],
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
    maintainAspectRatio: false,
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
      tooltip: {
        callbacks: {
          title: (context) => {
            return `Date: ${context[0].label}, ${new Date().toLocaleString(
              "en-US",
              { month: "long", year: "numeric" }
            )}`;
          },
          label: (context) => {
            const value = context.parsed.y;
            return `Agents Joined: ${value} agent`;
          },
        },
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
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "New Agents Joined",
        data: [5, 10, 8, 15, 20, 18, 12, 9, 14, 7, 11, 16],
        backgroundColor: [
          "rgba(43, 190, 203, 0.6)",
          "rgba(255, 52, 172, 0.6)",
          "rgba(253, 230, 243, 0.6)",
          "rgba(144, 202, 249, 0.6)",
          "rgba(123, 239, 178, 0.6)",
          "rgba(250, 177, 160, 0.6)",
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
    maintainAspectRatio: false,
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
      tooltip: {
        callbacks: {
          title: (context) => {
            const month = context[0].label;
            const year = new Date().getFullYear();
            return `Date: ${month}, ${year}`;
          },
          label: (context) => {
            const value = context.parsed.y;
            return `Agents Joined: ${value} agent`;
          },
        },
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

const VisitorsChart = () => {
  const data = {
    labels: Array.from({ length: 30 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ),
    datasets: [
      {
        label: "Visitors",
        data: [
          100, 150, 120, 180, 200, 160, 140, 170, 190, 210, 220, 230, 250, 240,
          260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390,
          400, 410,
        ],
        backgroundColor: "#FFC107",
        borderColor: "#FFC107",
        pointBackgroundColor: "rgba(255, 193, 7, 1)",
        pointBorderColor: "#ffffff",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        text: "Daily Visitors",
        font: {
          size: 18,
          family: "Inter, sans-serif",
        },
        color: "#444",
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return `Date: ${context[0].label}, ${new Date().toLocaleString(
              "en-US",
              { month: "long", year: "numeric" }
            )}`;
          },
          label: (context) => {
            const value = context.parsed.y;
            return `Visitors: ${value}`;
          },
        },
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

const SalesByAgent = () => {
  const data = {
    labels: ["Agent A", "Agent B", "Agent C", "Agent D", "Agent E"],
    datasets: [
      {
        label: "Total Sales",
        data: [500000, 800000, 650000, 900000, 750000],
        backgroundColor: [
          "rgba(43, 190, 203, 0.6)",
          "rgba(255, 52, 172, 0.6)",
          "rgba(253, 230, 243, 0.6)",
          "rgba(144, 202, 249, 0.6)",
          "rgba(123, 239, 178, 0.6)",
        ],
        borderColor: [
          "rgba(43, 190, 203, 1)",
          "rgba(255, 52, 172, 1)",
          "rgba(253, 230, 243, 1)",
          "rgba(144, 202, 249, 1)",
          "rgba(123, 239, 178, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        text: "Sales by Agent",
        font: {
          size: 18,
          family: "Inter, sans-serif",
        },
        color: "#444",
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            const agent = context[0].label;
            return `Agent: ${agent}`;
          },
          label: (context) => {
            const value = context.parsed.y;
            return `Total Sales: Rp ${value.toLocaleString("id-ID")}`;
          },
        },
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

// Add SalesByAgent component to the Dashboard
const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white shadow-lg rounded-lg p-4 min-h-[350px] ">
          <SalesByAgent />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 min-h-[350px]">
          <VisitorsChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-4 min-h-[350px]">
          <AgentsChart />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 min-h-[350px]">
          <Sales />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
