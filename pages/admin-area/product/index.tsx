import React, { useEffect, useRef, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
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
import "antd/dist/reset.css"; // Pastikan Antd CSS di-import

const Product = () => {
  const initialState = {
    name: "",
    description: "",
    image: "",
    category: "",
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
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740218449/jn3vfh2ewt56c4sookze.png",
      name: "Beautiful Sunset",
      category: "Transportation",
      description: "A stunning sunset over the ocean.",
    },
    {
      image:
        "https://res-console.cloudinary.com/dxjazxzn4/thumbnails/v1/image/upload/v1740221979/aGRpc2lxZXl4ZXI5dmxrendiMmw=/drilldown",
      name: "Mountain View",
      category: "Transportation",
      description: "A breathtaking view of the mountains.",
    },
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740218449/jn3vfh2ewt56c4sookze.png",
      name: "City Lights",
      category: "Transportation",
      description: "A dazzling cityscape at night.",
    },
  ];
  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };
  const [editorData, setEditorData] = useState("");
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    if (window.CKEDITOR) {
      const editor = window.CKEDITOR.replace("description");
      editor?.on("change", () => {
        setEditorValue(editor.getData());
        form.setFieldValue("description", editor.getData());
      });
      editor?.on("instanceReady", () => {
        editor.setData("<p>Ini adalah teks default.</p>");
      });
    }
  }, [formData.modal && formData.action !== "delete"]);

  return (
    <React.Fragment>
      <ModalDelete
        isModalDelete={formData.modal && formData.action === "delete"}
        isLoading={false}
        callback={close}
      />
      <Modal
        centered
        width={"60vw"}
        maskClosable={false}
        footer={null}
        onCancel={close}
        open={
          (formData.modal && formData.action === "add") ||
          formData.action === "edit"
        }
        title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Product`}
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
          <Form.Item
            label="Description"
            name="description"
            rules={[general.generalInput]}
          >
            <textarea id="description"></textarea>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[general.generalInput]}
          >
            <Select
              options={[{ label: "Transportation", value: "transportation" }]}
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

          <Space align="end" className="w-full justify-end mt-5">
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
        title={<h2 className="text-xl font-bold">Management Product</h2>}
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() =>
              setFormData({ ...formData, modal: true, action: "add" })
            }
          >
            Add Product
          </Button>
        }
      >
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
                    <Tooltip title="Click to view detail">
                      <Avatar
                        src={record.image}
                        className="cursor-pointer"
                        onClick={() => window.open(record.image, "_blank")}
                      />
                    </Tooltip>
                    <Typography.Text>{text}</Typography.Text>
                  </Space>
                );
              },
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
            {
              title: "Category",
              dataIndex: "category",
              key: "category",
            },

            {
              title: "Image",
              dataIndex: "image",
              key: "image",
              render: (text, record) => {
                return (
                  <Tooltip title="Click to view detail">
                    <Typography.Link target="_blank" href={text}>
                      {text}
                    </Typography.Link>
                  </Tooltip>
                );
              },
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
                          description: record.description,
                          category: record.category,
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
    </React.Fragment>
  );
};

export default Product;
