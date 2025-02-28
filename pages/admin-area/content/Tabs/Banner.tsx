import React, { useState } from "react";
import {
  Button,
  Card,
  FloatButton,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import ModalDelete from "../../../../src/components/ModalDelete";

import {
  PlusCircleOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import general from "../../../../src/config/general";
import WidgetUpload from "../../../../src/components/WidgetUpload";
import MansoryCard from "../../../../src/components/MansoryCard";
import { useGeneralContext } from "../../../../src/context/general";

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

  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };
  const {isMobile}=useGeneralContext()
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
        title={`Form ${formData.action === "detail" ? "Detail" : "Add"} Banner`}
      >
        <Form
          onFinish={(e) => {}}
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
      {!isMobile && (
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
      )}

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

export default Banner;
