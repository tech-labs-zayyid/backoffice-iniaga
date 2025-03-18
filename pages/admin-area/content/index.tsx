import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Banner from "./Tabs/Banner";
import Profile from "./Tabs/Profile";
import Testimoni from "./Tabs/Testimoni";
import SocialMedia from "./Tabs/SocialMedia";
import Seo from "./Tabs/Seo";
import {
  SolutionOutlined,
  StarOutlined,
  ExpandOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { ContentProvider } from "../../../src/context/content";

const Content = () => {
  const router = useRouter();
  const { query } = router;
  const tabComponent = [
    <Banner />,
    <Profile />,
    <Testimoni />,
    <SocialMedia />,
    <Seo />,
  ];
  const nav = [
    {
      label: "Banner",
      key: 0,
      icon: <ExpandOutlined />,
    },
    {
      label: "Profile",
      key: 1,
      icon: <SolutionOutlined />,
    },
    {
      label: "Testimoni",
      key: 2,
      icon: <StarOutlined />,
    },
    {
      label: "Social Media",
      key: 3,
      icon: <LinkOutlined />,
    },
    {
      label: "SEO",
      key: 4,
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
    <ContentProvider>
      <div
        style={{
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "10px",
        }}
      >
        {/* <div id="editor" style={{ height: "200px" }}></div> */}

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
    </ContentProvider>
  );
};

export default Content;
