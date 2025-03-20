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
  Switch,
  Spin,
} from "antd";

import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  SaveOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import general from "../../../src/config/general";
import WidgetUpload from "../../../src/components/WidgetUpload";
import ModalDelete from "../../../src/components/ModalDelete";
import CKEditor from "react-ckeditor-component";
import { useGeneralContext } from "../../../src/context/general";
import { useProducts } from "../../../src/hooks/products";
import { initialValue } from "../../../src/contants/products";
import { useRouter } from "next/router";
import {
  formatRupiah,
  rmFormatHTML,
  rmFormatRupiah,
} from "../../../utils/general_utils";

const Product = () => {
  const { isMobile } = useGeneralContext();
  const [formData, setFormData] = useState({
    modal: false,
    action: "add",
    payload: initialValue,
  });
  const { products, getProducts, createProducts, putProducts } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);

  const [form] = Form.useForm();
  const router = useRouter();
  const tempFileName = `tempFiles_${router.pathname}`;

  const close = (): void => {
    form.resetFields();
    setFormData({ payload: null, modal: false, action: "" });
    localStorage.removeItem(tempFileName);
  };

  const isModalForm =
    (formData.modal && formData.action === "add") ||
    formData.action === "detail";

  const [loading, setLoading] = useState(false);

  const [currentIndexes, setCurrentIndexes] = useState({});

  const changeImage = (direction, productId, imagesLength) => {
    setCurrentIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[productId] || 0; // Default ke 0 jika belum ada
      let newIndex;

      if (direction === "next") {
        newIndex = currentIndex === imagesLength - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? imagesLength - 1 : currentIndex - 1;
      }

      return { ...prevIndexes, [productId]: newIndex };
    });
  };

  const handleChange = (e) => {
    const formatted = formatRupiah(e.target.value);
    form.setFieldsValue({ price: formatted });
  };

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
          // width={isMobile ? "100vw" : "60vw"}
          maskClosable={false}
          footer={null}
          onCancel={close}
          open={isModalForm}
          title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Product`}
        >
          <Spin spinning={loading}>
            <Form
              onFinish={async (e) => {
                setLoading(true);
                if (formData.action === "add") {
                  const payload = {
                    best_product: e?.best_product || false,
                    city_id: "",
                    description: e?.description || "",
                    images:
                      JSON.parse(localStorage.getItem(tempFileName))?.map(
                        (v) => {
                          return { image_url: v };
                        }
                      ) || [],
                    installment: parseFloat(e?.installment || 0),
                    price: parseFloat(rmFormatRupiah(e?.price) || 0),
                    product_name: e.product_name,
                    product_sub_category: e?.product_sub_category,
                    tdp: parseFloat(e?.tdp || 0),
                  };
                  const res = await createProducts(payload);
                  if (res) {
                    close();
                  }
                  setLoading(false);
                } else {
                  const payload = {
                    best_product: e?.best_product || false,
                    city_id: "",
                    description: e?.description || "",
                    id_description: formData?.payload?.id_description,
                    images:
                      JSON.parse(localStorage.getItem(tempFileName))?.map(
                        (v, i) => {
                          return {
                            image_url: v,
                            is_active: true,
                            product_image_id:
                              formData?.payload?.clone_images?.[i]
                                ?.product_image_id || "",
                          };
                        }
                      ) || [],
                    is_active: e?.is_active || true,
                    installment: parseFloat(e?.installment || 0),
                    price: parseFloat(rmFormatRupiah(e?.price) || 0),
                    product_name: e?.product_name || "",
                    product_sub_category: e?.product_sub_category || "",
                    slug: formData?.payload?.slug,
                    status: formData?.payload?.status,
                    tdp: formData?.payload?.tdp || 0,
                  };
                  const res = await putProducts(
                    formData?.payload?.id_product,
                    payload
                  );
                  if (res) {
                    close();
                  }
                  setLoading(false);
                }
                getProducts();
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
                    label="Name"
                    name="product_name"
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
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid price",
                      },
                    ]}
                  >
                    <Input onChange={handleChange} />
                  </Form.Item>
                </Col>

                <Col md={12} xs={24}>
                  <Form.Item
                    label="Best Product"
                    name="best_product"
                    rules={[general.generalInput]}
                  >
                    <Select
                      options={[
                        { label: "Active", value: true },
                        { label: "Non Active ", value: false },
                      ]}
                    />
                  </Form.Item>
                </Col>

                {/* <Col md={12} xs={24}></Col> */}
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
                  files={formData?.payload?.product_images}
                  maxFiles={1}
                  onSuccess={(response) => {
                    const urlImage = response.info.url;
                    form.setFieldValue("image", urlImage);
                    setFormData({
                      ...formData,
                      payload: {
                        ...formData.payload,
                        product_images: [
                          ...formData.payload.product_images,
                          urlImage,
                        ],
                      },
                    });
                  }}
                />
              </Form.Item>

              <Form.Item label="Status" name={"is_active"}>
                <Switch
                  disabled={formData?.action === "add"}
                  defaultChecked={formData?.payload?.is_active || true}
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
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

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Save
                </Button>
              </Space>
            </Form>
          </Spin>
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
          {products?.data?.map((item: any, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 "
              >
                {/* Slider Container */}
                <div className="relative w-full h-56 overflow-hidden">
                  <div className="w-full overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${
                          (currentIndexes[item.id_product] || 0) * 100
                        }%)`,
                      }}
                    >
                      {item.product_images.map((img, index) => (
                        <img
                          key={img.product_image_id}
                          src={img.image_url}
                          alt={`Product ${item.product_name}`}
                          className="w-full h-56 object-cover flex-shrink-0"
                          style={{ minWidth: "100%" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tombol Navigasi */}
                  {item.product_images.length > 1 && (
                    <>
                      <LeftOutlined
                        onClick={() =>
                          changeImage(
                            "prev",
                            item.id_product,
                            item.product_images.length
                          )
                        }
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-100 text-white p-2 rounded-full hover:bg-opacity-75 transition cursor-pointer"
                      />
                      <RightOutlined
                        onClick={() =>
                          changeImage(
                            "next",
                            item.id_product,
                            item.product_images.length
                          )
                        }
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-100 text-white p-2 rounded-full hover:bg-opacity-75 transition cursor-pointer"
                      />
                    </>
                  )}

                  {/* Kategori Produk */}
                  <span className="absolute top-3 left-3 bg-[#FF5733] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item?.product_sub_category}
                  </span>
                </div>

                {/* Konten */}
                <div className="p-4">
                  <Row justify={"space-between"}>
                    <h3 className="text-lg font-bold text-gray-800">
                      {item?.product_name}
                    </h3>
                    <span className="text-red font-bold">
                      {formatRupiah(item.price.toString())}
                    </span>
                  </Row>
                  <p
                    className="text-sm text-gray-600 mt-2"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      lineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {rmFormatHTML(item.description)}
                  </p>
                </div>

                {/* Tombol */}
                <div className="p-4 border-t flex gap-2">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      Object.assign(item, {
                        image: "image",
                        price: formatRupiah(item.price.toString()),
                      });
                      form.setFieldsValue(item);
                      setFormData({
                        ...formData,
                        modal: true,
                        action: "detail",
                        payload: {
                          ...item,
                          clone_images: item?.product_images || [],
                          product_images: item?.product_images?.map(
                            (item: any) => item?.image_url
                          ),
                        },
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
            );
          })}
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
