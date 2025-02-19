import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  GlobalOutlined,
  ProductOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Breadcrumb,
  Divider,
  Space,
  message,
  Spin,
  Avatar,
  Dropdown,
} from "antd";
import config from "../../src/config/config";
import { useRouter } from "next/router";
const { Header, Sider, Content } = Layout;
import Head from "next/head";
import UAParser from "ua-parser-js";
import { deleteCookie, hasCookie } from "cookies-next";
import { LOCALSTORAGE } from "../../src/contants/localstorage";
import type { MenuProps } from "antd";

const AdminLayout = ({children}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState([]);
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type;
    setIsMobile(deviceType === "mobile");
    setCollapsed(deviceType === "mobile");
  }, []);

  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const menuSidebar = [
    {
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "dashboard",
    },
    {
      icon: <ProductOutlined />,
      label: "Product",
      link: "product",
    },
    {
      icon: <FileImageOutlined />,
      label: "Gallery",
      link: "gallery",
    },
    {
      icon: <UserOutlined />,
      label: "Agent",
      link: "Agent",
    },
    {
      icon: <GlobalOutlined />,
      label: "Content",
      link: "content",
    },
  ];

  useEffect(() => {
    if (!hasCookie("token")) {
      router.push("/login");
    }
    let newActiveMenu = menuSidebar.findIndex(
      (v) => v.link === router.pathname.split("/")[2]
    );

    setActiveMenu([`${newActiveMenu}`]);
  }, [router.pathname]);

  const objectMenuActive = menuSidebar.find(
    (v, key) => key === Number(activeMenu[0])
  );
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <UserOutlined /> admin@zayyid.com
        </Space>
      ),
    },
    {
      key: "2",
      label: (
        <Space>
          <LogoutOutlined /> Logout
        </Space>
      ),
      onClick: () => {
        deleteCookie("token");
        setTimeout(() => {
          router.push("/login").then(() => {
            localStorage.removeItem(LOCALSTORAGE.USERDATA);
          });
        }, 300);
      },
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!collapsed && (
        <Sider
          theme="dark"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            backgroundColor: "#10111F",
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
          }}
        >
          <Row align={"middle"} justify={"center"}>
            {isMobile ? (
              <img
                src={config.logo}
                className="mr-3 mt-3"
                style={{ height: collapsed ? "30px" : "50px" }}
                alt="Iniaga Logo"
              />
            ) : (
              <Col>
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-3 mx-auto">
                  <a href="/" className="flex items-center">
                    <img
                      src={config.logo}
                      className="h-12 mr-3 mt-3"
                      alt="Iniaga Logo"
                    />
                  </a>
                </div>
              </Col>
            )}
          </Row>

          <br />
          <Menu
            style={{
              backgroundColor: "#10111F",
            }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={activeMenu}
            selectedKeys={activeMenu}
          >
            {menuSidebar.map((v, index) => {
              const isActived = index === Number(activeMenu[0]);
              return (
                <Menu.Item
                  style={{
                    color: isActived ? "#FFFDFF" : "inherit",
                    backgroundColor: isActived ? "#201D2A" : "transparent",
                    borderRadius: 0,
                  }}
                  key={index}
                  onClick={() => {
                    router.push(`/admin-area/${v.link}`);
                  }}
                >
                  {v.icon}
                  <span>{v.label}</span>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            zIndex: 99,
            overflow: "auto",
            position: "sticky",
            top: 0,
            left: 0,
            padding: 0,
            backgroundColor: "white",
          }}
        >
          <Row justify="space-between" style={{ padding: 0, marginRight: 15 }}>
            <Col lg={12}>
              <Space>
                <Button
                  type="text"
                  onClick={() => {
                    setCollapsed(!collapsed);
                  }}
                  style={{
                    backgroundColor: "#E8F0f0",
                    color: "black",
                  }}
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                >
                  {/* {collapsed ? "Buka" : "Tutup"} Menu */}
                </Button>
                <Divider type="vertical" />
                <Breadcrumb
                  items={[
                    {
                      title: (
                        <Space>
                          <HomeOutlined />
                          Admin Area
                        </Space>
                      ),
                    },
                    {
                      title: (
                        <Space>
                          {objectMenuActive?.icon}
                          {objectMenuActive?.label}
                        </Space>
                      ),
                    },
                  ]}
                />
              </Space>
            </Col>
            <Space align="end">
              <Dropdown menu={{ items }}>
                <Avatar
                  size={"large"}
                  src={config.profile}
                >
                  A
                </Avatar>
              </Dropdown>
            </Space>
          </Row>
        </Header>
        <Content
          style={{
            padding: "10px 20px 0px 20px",
            backgroundColor: "#EEE",
            overflow: "initial",
          }}
        >
          <Spin spinning={loading}>{children}</Spin>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
