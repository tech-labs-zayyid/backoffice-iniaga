import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FloatButton,
  Form,
  Input,
  Modal,
  Space,
  Tooltip,
  Typography,
} from "antd";

import {
  PlusCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import general from "../../../src/config/general";
import { useGalleries } from "../../../src/hooks/galleries";
import WidgetUpload from "../../../src/components/WidgetUpload";
import MansoryCard from "../../../src/components/MansoryCard";
import ModalDelete from "../../../src/components/ModalDelete";
import { useGeneralContext } from "../../../src/context/general";

const Gallery = () => {
  const { isMobile } = useGeneralContext();
  const { gallery, getGalleries, createGalleries, putGalleries } = useGalleries();

  useEffect(() => {
    getGalleries();
  }, []);

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
  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };

  console.log('gallery ', gallery)
  return (
    <React.Fragment>
      <ModalDelete
        isModalDelete={formData.modal && formData.action === "delete"}
        isLoading={false}
        callback={() => {
          setFormData({ ...formData, modal: true, action: "detail" });
        }}
      />
      <Modal
        centered
        footer={null}
        onCancel={close}
        open={formData.modal}
        title={`Form ${
          formData.action === "detail" ? "Detail" : "Add"
        } Gallery`}
      >
        <Form
          onFinish={(e) => {}}
          form={form}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item label="Title" name="title" rules={[general.generalInput]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[general.generalInput]}
          >
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
            {formData.action === "detail" && (
              <Button
                danger
                htmlType="button"
                icon={<DeleteOutlined />}
                onClick={() => {
                  setFormData({ ...formData, action: "delete" });
                }}
              >
                Delete
              </Button>
            )}
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save
            </Button>
          </Space>
        </Form>
      </Modal>
      <Card
        title={<h2 className="text-xl font-bold">Management Gallery</h2>}
        extra={
          !isMobile && (
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() =>
                setFormData({ ...formData, modal: true, action: "add" })
              }
            >
              Add Gallery
            </Button>
          )
        }
      >
        <MansoryCard
          data={general.cloudinaryImage}
          callback={(record) => {
            form.setFieldsValue(record);
            setFormData({
              modal: true,
              action: "detail",
              payload: record,
            });
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

export default Gallery;
