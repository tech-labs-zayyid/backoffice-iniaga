import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal, Select, Space } from "antd";

import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import general from "../../../src/config/general";
import WidgetUpload from "../../../src/components/WidgetUpload";
import ModalDelete from "../../../src/components/ModalDelete";
import CKEditor from "react-ckeditor-component";
import useProductStore from "./store";


const Product = () => {
  const { products, formData, setFormData } = useProductStore();
  const [form] = Form.useForm();

  const close = (): void => {
    form.resetFields();
    setFormData({ payload: null, modal: false, action: "" });
  };


  const isModalForm =
    (formData.modal && formData.action === "add") ||
    formData.action === "detail";

  return (
    <React.Fragment>
      <ModalDelete
        isModalDelete={formData.modal && formData.action === "delete"}
        isLoading={false}
        callback={close}
      />
      {isModalForm && (
        <Modal
          centered
          width={"60vw"}
          maskClosable={false}
          footer={null}
          onCancel={close}
          open={isModalForm}
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
                activeClass="p10"
                content={formData?.payload?.description}
                events={{
                  blur: (e) => {},
                  afterPaste: (e) => {},
                  change: (e) => {
                    const data = e.editor.getData();
                    setFormData({
                      ...formData,
                      payload: { ...formData.payload, description: data },
                    });
                    form.setFieldValue("description", data);
                  },
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
            <Form.Item
              label="Image"
              name="image"
              rules={[general.generalInput]}
            >
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
      )}
      <Card
        title={<h2 className="text-xl font-bold">Management Product</h2>}
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              setFormData({ ...formData, modal: true, action: "add" });
            }}
          >
            Add Product
          </Button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {products?.map((item, index) => (
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
                      action: "delete",
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
