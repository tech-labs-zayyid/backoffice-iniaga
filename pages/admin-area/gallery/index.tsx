import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FloatButton,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Tooltip,
} from "antd";
import {
  PlusCircleOutlined,
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
  const { gallery, getGalleries, detailGalleries, createGalleries, putGalleries } = useGalleries();

  useEffect(() => {
    getGalleries();
  }, []);

  const initialState = {
    title: "",
    description: "",
    image: "",
    id: "",
    is_active: true,
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

  const handleCreateGallery = async (event: any) => {
    console.log("event create: ", event);
    const kobra = { image_url: [event?.image] };

    try {
      const response = await createGalleries(kobra);
      if (response.data?.code === 200) {
        getGalleries();
        close();
      }
    } catch {
      close();
    }
  };

  const handleUpdateGallery = async (event: any) => {
    console.log("event update: ", event);
    const kobra = {
      image_url: event?.image,
      is_active: formData.payload.is_active, // Kirim status is_active yang terbaru
    };

    try {
      await putGalleries(formData.payload.id, kobra);
      close();
    } catch {
      console.log("Error");
      close();
    }
  };

  const handleDetail = async (id: string) => {
    try {
      const response = await detailGalleries(id);
      const kobraJantan = { ...response, image: response?.image_url };
      form.setFieldsValue(kobraJantan);
      setFormData({
        modal: true,
        action: "detail",
        payload: kobraJantan,
      });
    } catch {
      console.log("error");
    }
  };

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
        title={`Form ${formData.action === "detail" ? "Detail" : "Add"} Gallery`}
      >
        <Form
          onFinish={(e) => {
            formData.action === "detail" ? handleUpdateGallery(e) : handleCreateGallery(e);
          }}
          form={form}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item label="Image" name="image" rules={[general.generalInput]}>
            <WidgetUpload
              onSuccess={(response) => {
                form.setFieldValue("image", response.info.url);
                setFormData((prev) => ({
                  ...prev,
                  payload: { ...prev.payload, image: response.info.url },
                }));
              }}
              link={formData?.payload?.image}
            />
          </Form.Item>

          {formData.action === "detail" && (
            <Form.Item label="Active Status">
              <Switch
                checked={formData.payload.is_active}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    payload: { ...prev.payload, is_active: checked },
                  }))
                }
              />
            </Form.Item>
          )}

          <Space align="end" className="w-full justify-end">
            <Button type="default" htmlType="button" onClick={close} icon={<CloseOutlined />}>
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
          data={gallery.length > 0 ? gallery.map((item) => ({ id: item?.id_gallery, image: item?.image_url })) : []}
          callback={(record) => handleDetail(record.id)}
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
