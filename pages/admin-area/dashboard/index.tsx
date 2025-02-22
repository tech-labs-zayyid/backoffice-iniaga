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
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly New Agents Joined",
        font: {
          family: "Inter, serif",
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
        label: "Sales",
        data: [12000, 19000, 3000, 5000, 22000, 13000],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
        font: {
          family: "Inter, serif",
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
        <Card>
          <Sales />
        </Card>
      </Col>
      <Col md={12}>
        <Card>
          <AgentsChart />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
