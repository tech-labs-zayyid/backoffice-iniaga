// @ts-ignore
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
  Switch,
  Dropdown,
  Spin,
  Divider,
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
import ModalConfirmation from "../../../src/components/ModalConfirmation";

const Agent = () => {
  const initialState = {
    id: "",
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
  const { agents, getAgen, createAgent, updateStatus, deActivated } =
    useAgent();
  const [selectedAgentKeys, setSelectedAgentKeys] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayload, setIsPayload] = useState<any>({});

  const [form] = Form.useForm();

  useEffect(() => {
    getAgen(pageSize, currentPage);
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
  const handleSelectChange = (selectedKeys) => {
    setSelectedAgentKeys(selectedKeys); // Update selected agent keys
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };
  console.log(isPayload, "ispayload");
  const handleSubmit = async (e, action) => {
    console.log(e, "eeee");
    if (action === "add") {
      setIsPayload({
        email: e.email,
        image_url: e.image,
        name: e.name,
        role: e.role,
        sales_id: e.sales_id,
        username: e.username,
        whatsapp_number: e.whatsapp_number,
      });
    }
    if (action === "delete") {
      setIsPayload({
        ...e,
        id: e.id,
        is_active: false,
      });
    }
    if (action === "edit") {
      setIsPayload({
        ...e,
        id: e.id, // Harus ada ID-nya untuk update
        is_active: true, // ✅ Update agent jadi aktif
      });
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setIsLoading(true);

    try {
      if (formData.action === "add") {
        await createAgent(isPayload);
      }

      window.location.reload(); // **Refresh seluruh halaman**
    } catch (error) {
      console.error("Gagal memproses operasi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStatus = async () => {
    console.log("Masuk ke handleChangeStatus");
    setIsLoading(true);

    try {
      await updateStatus(isPayload); // Update status agen
      setShowConfirmation(false);
      setIsPayload({});
      window.location.reload(); // **Langsung reload halaman**
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    console.log("Masuk ke handleDelete");
    setIsLoading(true);
    const payload = {
      email: isPayload?.email,
      image_url: isPayload?.image,
      name: isPayload?.name,
      role: isPayload?.role,
      sales_id: isPayload?.sales_id,
      username: isPayload?.username,
      whatsapp_number: isPayload?.whatsapp_number,
      is_active: false,
    };
    try {
      await deActivated(payload, isPayload?.id); // Hapus agen
      setShowConfirmation(false);
      setIsPayload({});

      window.location.reload(); // **Langsung reload halaman**
    } catch (error) {
      console.error("Gagal menghapus agen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    console.log(isPayload, "ispayload");
    const payload = {
      email: isPayload?.email,
      image_url: isPayload?.image,
      name: isPayload?.name,
      role: isPayload?.role,
      sales_id: isPayload?.sales_id,
      username: isPayload?.username,
      whatsapp_number: isPayload?.whatsapp_number,
      is_active: true,
    };
    try {
      await deActivated(payload, isPayload?.id); // Hapus agen
      setShowConfirmation(false);
      setIsPayload({});

      window.location.reload(); // **Langsung reload halaman**
    } catch (error) {
      console.error("Gagal menghapus agen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAgentPending = (status) => status === "PENDING";

  const dataSource = data?.docs?.map((agent) => ({
    ...agent,
    key: agent.referal_code, // Ensure each agent has a unique `key` based on their `id`
  }));

  const isModalForm =
    (formData.modal && formData.action === "add") || formData.action === "edit";

  return (
    <React.Fragment>
      <Modal
        zIndex={1001}
        centered
        maskClosable={false}
        open={showConfirmation}
        onCancel={() => {
          setShowConfirmation(false);
          setIsPayload({});
        }}
        title={`${
          formData.action === "add"
            ? "Create"
            : formData.action === "delete"
            ? "Delete"
            : "Update"
        } Data`}
        footer={null}
      >
        <Spin spinning={isLoading}>
          <h1>{`Are you sure you want to ${
            formData.action === "add"
              ? "create"
              : formData.action === "delete"
              ? "delete"
              : "update"
          }
           this data ?`}</h1>
          <Divider />
          <Space align="end" className="w-full justify-end">
            <Button
              icon={<CloseOutlined />}
              type="default"
              onClick={() => {
                setShowConfirmation(false);
                setIsPayload({});
              }}
            >
              Cancel
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                switch (formData.action) {
                  case "delete":
                    handleDelete();
                    break;
                  case "change":
                    handleChangeStatus();
                    break;
                  case "edit":
                    handleUpdate();
                    break;
                  default:
                    handleConfirm();
                }
              }}
            >
              Submit
            </Button>
          </Space>
        </Spin>
      </Modal>
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
              handleSubmit(e, formData.action);
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
          dataSource={dataSource} // Assuming agents is the correct data
          key={"referal_code"}
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
              title: "Link",
              dataIndex: "sales_url",
              key: "link",
              render: (text, record) => (
                <Typography.Text copyable>{text}</Typography.Text>
              ),
            },
            {
              title: "Status",
              dataIndex: "status_agent",
              key: "status",
              render: (text, rec) =>
                text === "APPROVED" ? (
                  <Tag color="green">{text}</Tag>
                ) : (
                  // <Tag color="green">{text}</Tag>
                  <Space wrap>
                    <Select
                      size="large"
                      onChange={
                        (e) => {
                          console.log(e, "value");
                          handleConfirmation();
                          setFormData({
                            ...formData,
                            modal: true,
                            action: "change",
                          });
                          setIsPayload({
                            agent_id: rec.id as string,
                            status: e,
                          });
                        }
                        // handleChangeStatus(rec.id as string, e.value)
                      }
                      options={[
                        {
                          label: "PENDING",
                          value: "PENDING",
                          disabled: true,
                        },
                        {
                          label: "APPROVED",
                          value: "APPROVED",
                        },
                        {
                          label: "REJECTED",
                          value: "REJECTED",
                        },
                      ]}
                      value={text}
                    />
                  </Space>
                ),
            },
            {
              fixed: !isMobile ? "right" : null,
              title: "Actions",
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
                        is_active: record.is_active,
                        id: record.id,
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
                      handleSubmit(record, "delete");
                      setShowConfirmation(true);
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
          rowSelection={{
            selectedRowKeys: selectedAgentKeys, // Sync selected checkboxes
            onChange: handleSelectChange, // Handle selection changes
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
