import { Card, Row, Space, Tabs, Typography } from "antd";
import React from "react";
import Navbar from "./Tabs/Nabvar";
import Banner from "./Tabs/Banner";
import Profile from "./Tabs/Profile";
import Testimoni from "./Tabs/Testimoni";
import Footer from "./Tabs/Footer";
import Icon, {
  MenuOutlined,
  SolutionOutlined,
  StarOutlined,
  NumberOutlined,
  ExpandOutlined,
} from "@ant-design/icons";
const Content = () => {
  const nav = [
    {
      label: "Navbar",
      key: 0,
      icon: <MenuOutlined />,
    },
    {
      label: "Banner",
      key: 1,
      icon: <ExpandOutlined />,
    },
    {
      label: "Profile",
      key: 2,
      icon: <SolutionOutlined />,
    },
    {
      label: "Testimoni",
      key: 3,
      icon: <StarOutlined />,
    },
    {
      label: "Footer",
      key: 4,
      icon: <NumberOutlined />,
    },
  ];
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <React.Fragment>
      <Card
        title={<h2 className="text-xl font-bold">Management Content</h2>}
        extra={
          <Tabs
            activeKey={activeTab as any}
            onTabClick={(e) => {
              setActiveTab(Number(e));
            }}
            items={nav as any}
          />
        }
      >
        {activeTab === 0 && <Navbar />}
        {activeTab === 1 && <Banner />}
        {activeTab === 2 && <Profile />}
        {activeTab === 3 && <Testimoni />}
        {activeTab === 4 && <Footer />}
      </Card>
    </React.Fragment>
  );
};
export default Content;
