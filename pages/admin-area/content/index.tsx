import { Card, Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./Tabs/Nabvar";
import Banner from "./Tabs/Banner";
import Profile from "./Tabs/Profile";
import Testimoni from "./Tabs/Testimoni";
import Footer from "./Tabs/Footer";
import SocialMedia from "./Tabs/SocialMedia";
import {
  MenuOutlined,
  SolutionOutlined,
  StarOutlined,
  NumberOutlined,
  ExpandOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const Content = () => {
  const router = useRouter();
  const { query } = router;
  const tabComponent = [
    <Navbar />,
    <Banner />,
    <Profile />,
    <Testimoni />,
    <Footer />,
    <SocialMedia />,
  ];
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
    {
      label: "Social Media",
      key: 5,
      icon: <LinkOutlined />,
    },
  ];
  const [activeTab, setActiveTab] = useState(query.tab || "");
  useEffect(() => {
    if (query.tab) {
      setActiveTab(query.tab as string);
    }
  }, [query.tab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    router.push(
      {
        pathname: router.pathname,
        query: { ...query, tab: key }, // Tambahkan query string tab
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px 20px",
        borderRadius: "10px",
      }}
    >
      <Row>
        <Col md={24}>
          <Row justify={"space-between"} align={"middle"}>
            <Col xs={24} md={9}>
              <h2 className="text-xl font-bold">Management Content</h2>
            </Col>
            <Col xs={24} md={15}>
              <Tabs
                activeKey={Number(activeTab) as any}
                onTabClick={handleTabChange}
                items={nav as any}
              />
            </Col>
          </Row>
        </Col>
        <Col md={24}>{tabComponent[Number(activeTab)]}</Col>
      </Row>
    </div>
  );
};

export default Content;
