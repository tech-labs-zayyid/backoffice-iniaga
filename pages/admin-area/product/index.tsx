import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  FloatButton,
  Input,
  Modal,
  Select,
  Space,
  Row,
  Col,
  Checkbox,
} from "antd";

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
import { useGeneralContext } from "../../../src/context/general";
import { useProducts } from "../../../src/hooks/products";
import { initialValue } from "../../../src/contants/products";

const Product = () => {
  const { isMobile } = useGeneralContext();
  const [formData, setFormData] = useState({
    modal: false,
    action: "add",
    payload: initialValue,
  });
  const { products, getProducts, createProducts } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);

  const [form] = Form.useForm();

  const close = (): void => {
    form.resetFields();
    setFormData({ payload: null, modal: false, action: "" });
  };

  const isModalForm =
    (formData.modal && formData.action === "add") ||
    formData.action === "detail";

  console.log(formData);
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
          width={isMobile ? "100vw" : "60vw"}
          maskClosable={false}
          footer={null}
          onCancel={close}
          open={isModalForm}
          title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Product`}
        >
          <Form
            onFinish={async (e) => {
              await createProducts({
                best_product: true,
                city_id: "12345",
                description: "This is a great product.",
                images: [{ image_url: "https://example.com/image.jpg" }],
                installment: 12,
                price: 1000000,
                product_name: "Example Product",
                product_sub_category: "Electronics",
                tdp: 500000,
              });
            }}
            form={form}
            layout="vertical"
            name="basic"
            autoComplete="off"
          >
            <Row gutter={[10, 10]}>
              <Col md={12} xs={24}>
                <Form.Item
                  style={{ width: "100%" }}
                  label={
                    <Col
                      md={24}
                      style={{ border: "1px solid black", width: "100%" }}
                    >
                      <Row justify={"space-between"}>
                        <p>Name</p>
                        <Checkbox> Best Product ? </Checkbox>
                      </Row>
                    </Col>
                  }
                  name="product_name"
                  rules={[general.generalInput]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[general.generalInput]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Category"
                  name="product_sub_category"
                  rules={[general.generalInput]}
                >
                  <Select
                    options={[
                      { label: "Transportation", value: "transportation" },
                      { label: "Electronics", value: "electronics" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}></Col>
            </Row>

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
              label="Image"
              name="image"
              rules={[general.generalInput]}
            >
              <WidgetUpload
                maxFiles={3}
                onSuccess={(response) => {
                  const urlImage = response.info.url;
                  form.setFieldValue("image", urlImage);
                  setFormData({
                    ...formData,
                    payload: {
                      ...formData.payload,
                      product_images: [
                        ...formData?.payload?.product_images,
                        urlImage,
                      ],
                    },
                  });
                }}
                files={formData?.payload?.product_images}
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
          !isMobile && (
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                setFormData({ ...formData, modal: true, action: "add" });
              }}
            >
              Add Product
            </Button>
          )
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products?.data?.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {/* Gambar */}
              <div className="relative">
                <img
                  src={item?.product_images?.[0]?.image_url}
                  alt={item?.product_name}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#FF5733] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item?.product_sub_category}
                </span>
              </div>

              {/* Konten */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {item?.product_name}
                </h3>
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

export default Product;
