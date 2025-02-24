import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { CKEditor } from "ckeditor4-react";

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
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740324535/ioxuf0ayjb9izrtsa6l1.jpg",
      name: "Beautiful Sunset",
      category: "Transportation",
      description: "A stunning sunset over the ocean.",
    },
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740324507/qugbfsf7b5nzrjyucjor.jpg",
      name: "Mountain View",
      category: "Transportation",
      description: "A breathtaking view of the mountains.",
    },
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740324459/zm40pjf9pkkcoerjyiex.jpg",
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

  useEffect(() => {
    // Gunakan setTimeout untuk memastikan data terbaru diambil setelah state selesai diperbarui
    const timeout = setTimeout(() => {
      setEditorData(formData.payload.description || "");
    }, 100); // Delay 100ms untuk memastikan nilai benar

    return () => clearTimeout(timeout); // Bersihkan timeout untuk mencegah memory leak
  }, [formData.payload.description]);

  const ckeditor = useMemo(() => {
    console.log("render ckeditor", editorData);

    return (
      <CKEditor
        initData={editorData}
        data={editorData} // Pastikan CKEditor selalu mengikuti state editorData
        onChange={(event) => {
          const data = event.editor.getData();
          setEditorData(data);
          setFormData({
            ...formData,
            payload: { ...formData.payload, description: data },
          });
          form.setFieldValue("description", data);
        }}
      />
    );
  }, [editorData]);
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
          formData.action === "detail"
        }
        title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Product`}
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
            label="Description"
            name="description"
            rules={[general.generalInput]}
          >
            <CKEditor
              initData={editorData}
              onChange={(event) => {
                const data = event.editor.getData();
                setEditorData(data);
                setFormData({
                  ...formData,
                  payload: { ...formData.payload, description: data },
                });
                form.setFieldValue("description", data);
              }}
            />
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
              maxFiles={3}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {datas.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {/* Gambar */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#FF5733] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Konten */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>

              {/* Tombol */}
              <div className="p-4 border-t flex gap-2">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    form.setFieldsValue(item);
                    setEditorData(item.description);
                    setFormData({
                      ...formData,
                      modal: true,
                      action: "detail",
                      payload: item,
                    });
                  }}
                  className="w-full"
                >
                  View Details
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  className="w-full"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      modal: true,
                      action: "detail",
                      payload: item,
                    });
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Product;
