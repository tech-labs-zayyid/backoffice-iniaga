import { Card, Col, Row, Tabs } from "antd";
import React, { useEffect } from "react";
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
import useContent from "./store/store";

const Content = () => {
  const router = useRouter();
  const { query } = router;
  const { activeTab, setActiveTab } = useContent()

  const tabComponent = [
    <Navbar />,
    <Banner />,
    <Profile />,
    <Testimoni />,
    <Footer />,
    <SocialMedia />,
  ];

  const nav = [
    { label: "Navbar", key: "0", icon: <MenuOutlined /> },
    { label: "Banner", key: "1", icon: <ExpandOutlined /> },
    { label: "Profile", key: "2", icon: <SolutionOutlined /> },
    { label: "Testimoni", key: "3", icon: <StarOutlined /> },
    { label: "Footer", key: "4", icon: <NumberOutlined /> },
    { label: "Social Media", key: "5", icon: <LinkOutlined /> },
  ];

  // Sync Zustand dengan URL parameter
  useEffect(() => {
    if (query.tab) {
      setActiveTab(query.tab as string);
    }
  }, [query.tab, setActiveTab]);
  console.log(activeTab)
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    router.push(
      { pathname: router.pathname, query: { ...query, tab: key } },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Row>
      <Col md={24}>
        <Card
          title={<h2 className="text-xl font-bold">Management Content</h2>}
          extra={
            <Tabs
              activeKey={activeTab}
              onTabClick={handleTabChange}
              items={nav as any}
            />
          }
        >
          {tabComponent[Number(activeTab)]}
        </Card>
      </Col>
    </Row>
  );
};

export default Content;
