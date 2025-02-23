import { Card,Col, Row, Space, Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
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
  LinkOutlined,
} from "@ant-design/icons";
import SocialMedia from "./Tabs/SocialMedia";
import { useRouter } from "next/router";

const Content = () => {
  const router = useRouter();
  const { query } = router;
  const tabComponent = [<Navbar />, <Banner />, <Profile />, <Testimoni />, <Footer />, <SocialMedia />];
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
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Card
            title={<h2 className="text-xl font-bold">Management Content</h2>}
            extra={
              <Row>
                <Col md={24}>
                  <Tabs
                    activeKey={Number(activeTab) as any}
                    onTabClick={handleTabChange}
                    items={nav as any}
                  />
                </Col>
              </Row>
            }
          >
            {tabComponent[Number(activeTab)]}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Content;
