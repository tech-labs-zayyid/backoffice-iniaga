import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Row,
  Col,
  Avatar,
} from "antd";

import {
  UserOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import ModalDelete from "../../../../src/components/ModalDelete";
import general from "../../../../src/config/general";
import WidgetUpload from "../../../../src/components/WidgetUpload";

const Testimonu = () => {
  const initialState = {
    name: "",
    title: "",
    description: "",
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
      image:"https://iniaga.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpeople01.85d6f24e.png&w=48&q=75",
      name: "Boby Honda",
      title: "Sales Honda Pasteur",
      description:
        "Dengan fitur yang mudah digunakan, saya bisa fokus pada yang paling penting: membangun hubungan dengan pelanggan dan agen, serta mencapai target penjualan",
    },
    {
      image:"https://iniaga.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fanhar.881ec77d.jpg&w=48&q=75",
      name: "Anhar",
      title: "Sales Tunas Toyota",
      description:
        "Aplikasi ini membantu saya mengelola rekrutmen agen dengan lebih efisien dan meningkatkan jangkauan pemasaran",
    },
  ];
  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };
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
        title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Testimoni`}
      >
        <Form
          onFinish={(e) => {
            console.log(e);
          }}
          form={form}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item label="Name" name="name" rules={[general.generalInput]}>
            <Input />
          </Form.Item>
          <Form.Item label="Title" name="title" rules={[general.generalInput]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[general.generalInput]}>
            <Input.TextArea />
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
      <Row justify={"end"}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() =>
            setFormData({ ...formData, modal: true, action: "add" })
          }
        >
          Add Testimoni
        </Button>
      </Row>
      <br />
      <Table
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
                  <Avatar src={record.image}>
                    <UserOutlined />
                  </Avatar>
                  {text}
                </Space>
              );
            },
          },
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            fixed: "right",
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
                        title: record.title,
                        description: record.description,
                        image: record.image
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
    </React.Fragment>
  );
};

export default Testimonu;
