import React, { useState } from "react";
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
// import Link from "antd/es/typography/Link";

const Agent = () => {
  const initialState = {
    name: "",
    join_date: "",
    status: "",
    link: "",
    image: "",
  };
  const [formData, setFormData] = useState({
    modal: false,
    action: "add",
    payload: initialState,
  });
  const [form] = Form.useForm();
  const datas = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s",
      join_date: "1 Agustus 2023 ",
      name: "Tatang Sutisna",
      referral_code: "tatang1234",
      status: "Non Active",
      link: "https://iniaga.vercel.app/tata1234",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s",

      join_date: "1 Agustus 2023 ",
      name: "Tatang Sutisna",
      referral_code: "tatang1234",
      status: "Active",
      link: "https://iniaga.vercel.app/tata1234",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s",

      join_date: "1 Agustus 2023 ",
      name: "Tatang Sutisna",
      referral_code: "tatang1234",
      status: "Active",
      link: "https://iniaga.vercel.app/tata1234",
    },
  ];
  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };

  const { isMobile } = useGeneralContext();
  return (
    <React.Fragment>
      <ModalDelete
        isModalDelete={formData.modal && formData.action === "delete"}
        isLoading={false}
        callback={close}
      />
      <Modal
        maskClosable={false}
        footer={null}
        onCancel={close}
        open={
          (formData.modal && formData.action === "add") ||
          formData.action === "edit"
        }
        title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Agent`}
      >
        <Form
          onFinish={(e) => {}}
          form={form}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item label="Name" name="name" rules={[general.generalInput]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[general.generalInput]}
          >
            <Select
              options={[
                { label: "Active", value: "active" },
                { label: "Non Active", value: "non active" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[general.generalInput]}>
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
          dataSource={datas}
          scroll={{ x: "max-content" }}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (text, record) => {
                return (
                  <Space>
                    <Avatar src={record.image} /> {text}
                  </Space>
                );
              },
            },
            {
              title: "Referral Code",
              dataIndex: "referral_code",
              key: "referral_code",
            },
            {
              title: "Join Date",
              dataIndex: "join_date",
              key: "join_date",
            },
            {
              title: "Link",
              dataIndex: "link",
              key: "link",
              render: (text, record) => {
                return <Typography.Text copyable>{text}</Typography.Text>;
              },
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (text, record) => {
                return text === "Active" ? (
                  <Tag color="green">{text}</Tag>
                ) : (
                  <Tag color="red">{text}</Tag>
                );
              },
            },

            {
              fixed: !isMobile ? "right" : null,
              title: "#",
              dataIndex: "image",
              key: "image",
              render: (text, record) => {
                return (
                  <Space>
                    <Button
                      onClick={() => {
                        form.setFieldsValue({
                          name: record.name,
                          status: record.status,
                          image: record.image,
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
                );
              },
            },
          ]}
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
