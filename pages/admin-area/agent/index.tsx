import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import {
  Avatar,
  Button,
  Card,
  FloatButton,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  Pagination,
} from "antd";

import {
  PlusCircleOutlined,
  CloudUploadOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import general from "../../../src/config/general";
import WidgetUpload from "../../../src/components/WidgetUpload";
import ModalDelete from "../../../src/components/ModalDelete";
import { useGeneralContext } from "../../../src/context/general";
import { useAgent } from "../../../src/hooks/agen";

const Agent = () => {
  const initialState = {
    email: "",
    image_url: "",
    name: "",
    role: "agent",
    sales_id: "",
    username: "",
    whatsapp_number: "",
  };

  const [formData, setFormData] = useState({
    modal: false,
    action: "add",
    payload: initialState,
  });
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Number of items per page

  const [idUser, setIdUser] = useState("");
  const { agents, getAgen, createAgent } = useAgent();

  const [form] = Form.useForm();

  useEffect(() => {
    getAgen(pageSize, currentPage); // Fetch agents with dynamic pageSize and currentPage
  }, [currentPage, pageSize]);

  // Fetch user data from localStorage to get the ID
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData && userData.id) {
        setIdUser(userData.id);
      } else {
        console.log("ID not found in localStorage");
      }
    }
  }, []);

  // Table data
  const data = agents; // Assuming `agents` is the list of agent data

  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };

  const { isMobile } = useGeneralContext();
  const isModalForm =
    (formData.modal && formData.action === "add") || formData.action === "edit";
  console.log(form, "ini formdata");
  return (
    <React.Fragment>
      <ModalDelete
        isModalDelete={formData.modal && formData.action === "delete"}
        isLoading={false}
        callback={close}
      />
      {isModalForm && (
        <Modal
          maskClosable={false}
          footer={null}
          onCancel={close}
          open={
            formData.modal &&
            (formData.action === "add" || formData.action === "edit")
          }
          title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Agent`}
        >
          <Form
            form={form}
            layout="vertical"
            name="basic"
            autoComplete="off"
            onFinish={async (e) => {
              if (formData.action === "add") {
                const payload = {
                  email: e.email,
                  image_url: e.image,
                  name: e.name,
                  role: e.role,
                  sales_id: e.sales_id,
                  username: e.username,
                  whatsapp_number: e.whatsapp_number,
                };
                console.log(payload, "payload");
                await createAgent(payload);
                // Call create agent logic here
                close();
              } else {
                const payload = {
                  email: formData.payload.email,
                  image_url: formData.payload.image_url,
                  name: formData.payload.name,
                  role: formData.payload.role,
                  sales_id: formData.payload.sales_id,
                  username: formData.payload.username,
                  whatsapp_number: formData.payload.whatsapp_number,
                };
                // Call update agent logic here
              }
            }}
          >
            <Form.Item
              label="Sales ID"
              name="sales_id"
              rules={[general.generalInput]}
              initialValue={idUser}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[general.generalInput]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[general.generalInput]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[general.generalInput]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Whatsapp Number"
              name="whatsapp_number"
              rules={[general.generalInput]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[general.generalInput]}
              initialValue={formData.payload.role}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[general.generalInput]}
            >
              <WidgetUpload
                onSuccess={(response) => {
                  form.setFieldValue("image", response.info.url);
                  setFormData({
                    ...formData,
                    payload: { ...formData.payload, image: response.info.url },
                  });
                }}
                link={formData?.payload?.image}
              />
            </Form.Item>

            <Space align="end" className="w-full justify-end">
              <Button
                type="default"
                htmlType="button"
                onClick={close}
                icon={<CloseOutlined />}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save
              </Button>
            </Space>
          </Form>
        </Modal>
      )}

      <Card
        title={<h2 className="text-xl font-bold">Management Agent</h2>}
        extra={
          !isMobile && (
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() =>
                setFormData({ ...formData, modal: true, action: "add" })
              }
            >
              Add Agent
            </Button>
          )
        }
      >
        <Table
          bordered={false}
          dataSource={data?.docs} // Assuming agents is the correct data
          scroll={{ x: "max-content" }}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (text, record) => (
                <Space>
                  <Avatar src={record.image_url} /> {text}
                </Space>
              ),
            },
            {
              title: "Referral Code",
              dataIndex: "referal_code",
              key: "referral_code",
            },
            {
              title: "Join Date",
              dataIndex: "join_date",
              key: "join_date",
              render: (text, record) => (
                <Typography.Text>{record.start_date.Time}</Typography.Text>
              ),
            },
            {
              title: "Link",
              dataIndex: "link",
              key: "link",
              render: (text, record) => (
                <Typography.Text copyable>{text}</Typography.Text>
              ),
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (text) =>
                text === "Active" ? (
                  <Tag color="green">{text}</Tag>
                ) : (
                  <Tag color="red">{text}</Tag>
                ),
            },
            {
              fixed: !isMobile ? "right" : null,
              title: "#",
              dataIndex: "image",
              key: "image",
              render: (text, record) => (
                <Space>
                  <Button
                    onClick={() => {
                      form.setFieldsValue({
                        name: record.name,
                        username: record.username,
                        email: record.email,
                        status: record.status,
                        image: record.image_url,
                        whatsapp_number: record.whatsapp_number,
                      });
                      setFormData({
                        ...formData,
                        modal: true,
                        action: "edit",
                        payload: record,
                      });
                    }}
                    type="primary"
                    icon={<EditOutlined />}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        modal: true,
                        action: "delete",
                        payload: record,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              ),
            },
          ]}
          pagination={{
            current: data?.pagination?.current_page,
            pageSize: data?.pagination?.limit_per_page,
            total: data?.pagination?.total_rows || 0, // Assuming totalDocs is the total number of agents
            onChange: (page, pageSize) => {
              setCurrentPage(page); // Update current page
              setPageSize(pageSize); // Update page size
            },
            showSizeChanger: true, // Allow user to change the page size
            showQuickJumper: true, // Allow user to jump to a specific page
          }}
        />
      </Card>

      {isMobile && (
        <FloatButton
          icon={<PlusCircleOutlined />}
          type="primary"
          style={{ insetInlineEnd: 24 }}
          onClick={() =>
            setFormData({ ...formData, modal: true, action: "add" })
          }
        />
      )}
    </React.Fragment>
  );
};

export default Agent;
