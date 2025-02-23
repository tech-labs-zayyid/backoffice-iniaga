import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button, Card, Form, Input, Modal, Row, Space, Typography } from "antd";

import {
  PlusCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import general from "../../../../src/config/general";
import WidgetUpload from "../../../../src/components/WidgetUpload";
// import Link from "antd/es/typography/Link";

const Banner = () => {
  const initialState = {
    title: "",
    description: "",
    image: "",
  };
  const [formData, setFormData] = useState({
    modal: false,
    action: "",
    payload: initialState,
  });
  const [form] = Form.useForm();
  const images = [
    {
      src: "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740218449/jn3vfh2ewt56c4sookze.png",
      title: "Beautiful Sunset",
      description: "A stunning sunset over the ocean.",
    },
    {
      src: "https://res-console.cloudinary.com/dxjazxzn4/thumbnails/v1/image/upload/v1740221979/aGRpc2lxZXl4ZXI5dmxrendiMmw=/drilldown",
      title: "Mountain View",
      description: "A breathtaking view of the mountains.",
    },
    {
      src: "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740218449/jn3vfh2ewt56c4sookze.png",
      title: "City Lights",
      description: "A dazzling cityscape at night.",
    },
  ];
  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };
  return (
    <React.Fragment>
      <Modal
        footer={null}
        onCancel={close}
        open={formData.modal}
        title={`Form ${formData.action === "detail" ? "Detail" : "Add"} Banner`}
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
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
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
            />
          </Form.Item>
          {formData?.payload?.image !== "" && (
            <>
              <p className="text-sm text-neutral-500">Link preview:</p>
              <Typography.Link target="_blank" href={formData?.payload?.image}>
                {formData?.payload?.image}
              </Typography.Link>
            </>
          )}
          <Space align="end" className="w-full justify-end">
            <Button
              type="default"
              htmlType="button"
              onClick={close}
              icon={<CloseOutlined />}
            >
              Cancel
            </Button>
            {formData.action === "detail" && (
              <Button danger htmlType="button" icon={<DeleteOutlined />}>
                Delete
              </Button>
            )}
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
          Add Banner
        </Button>
      </Row>
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            title="Click to view detail"
            onClick={() => {
              form.setFieldsValue({
                title: image.title,
                description: image.description,
                image: image.src,
              });
              setFormData({
                modal: true,
                action: "detail",
                payload: {
                  title: image.title,
                  description: image.description,
                  image: image.src,
                },
              });
            }}
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-56 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-lg font-bold">{image.title}</h3>
              <p className="text-sm mt-1">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Banner;
