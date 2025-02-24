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
import { Card, Col, Row } from "antd";

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
        backgroundColor: "#201D2A", // Warna pastel soft blue
        borderColor: "#201D2A", // Warna utama
        pointBackgroundColor: "rgba(255, 52, 172, 1)", // Warna titik
        pointBorderColor: "#ffffff", // Border titik putih
        borderWidth: 3,
        tension: 0.3, // Membuat garis lebih smooth
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "Inter, sans-serif", // Gunakan font Inter
          },
          color: "#666666", // Warna legend soft
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
          color: "#888", // Warna label axis X
          font: {
            family: "Inter, sans-serif",
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Grid soft
        },
      },
      y: {
        ticks: {
          color: "#888", // Warna label axis Y
          font: {
            family: "Inter, sans-serif",
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Grid soft
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
const Sales = () => {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "New Agents Joined",
          data: [5, 10, 8, 15, 20, 18],
          backgroundColor: [
            "rgba(43, 190, 203, 0.6)", // Biru soft
            "rgba(255, 52, 172, 0.6)", // Pink soft
            "rgba(253, 230, 243, 0.6)", // Peach pastel
            "rgba(144, 202, 249, 0.6)", // Light Blue
            "rgba(123, 239, 178, 0.6)", // Soft Green
            "rgba(250, 177, 160, 0.6)", // Light Orange
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
          borderRadius: 8, // Membuat sudut lebih halus
        },
      ],
    };

    const options = {
      responsive: true,
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



  return <Bar data={data} options={options} />;
};

const Dashboard = () => {
  return (
    <Row gutter={[10, 10]}>
      <Col md={12}>
        <Card >
          <Sales />
        </Card>
      </Col>
      <Col md={12}>
        <Card >
          <AgentsChart />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
