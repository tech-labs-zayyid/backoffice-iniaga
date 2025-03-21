import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FloatButton,
  Form,
  Modal,
  Space,
  Switch,
  notification
} from "antd";
import { PlusCircleOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

import general from "../../../src/config/general";
import { useGalleries } from "../../../src/hooks/galleries";
import WidgetUpload from "../../../src/components/WidgetUpload";
import MansoryCard from "../../../src/components/MansoryCard";
import ModalDelete from "../../../src/components/ModalDelete";
import { useGeneralContext } from "../../../src/context/general";

interface GalleryItem {
  id_gallery: string;
  image_url: string;
  is_active: boolean;
  title?: string;
  description?: string;
}

interface FormDataState {
  modal: boolean;
  action: "add" | "detail" | "delete" | "";
  payload: Partial<GalleryItem> & { image?: string };
}

const Gallery = () => {
  const { isMobile } = useGeneralContext();
  const { gallery, getGalleries, detailGalleries, createGalleries, putGalleries } = useGalleries();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataState>({
    modal: false,
    action: "",
    payload: {
      title: "",
      description: "",
      image: "",
      id_gallery: "",
      is_active: true
    }
  });

  useEffect(() => {
    getGalleries();
  }, []);

  const close = () => {
    form.resetFields();
    setFormData({
      modal: false,
      action: "",
      payload: {
        title: "",
        description: "",
        image: "",
        id_gallery: "",
        is_active: true
      }
    });
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const payload = { image_url: values.image, is_active: formData.payload.is_active };

    try {
      if (formData.action === "detail") {
        await putGalleries(formData.payload.id_gallery, payload);
        notification.success({ message: "Gallery updated successfully!" });
      } else {
        await createGalleries({ image_url: [values.image] });
        notification.success({ message: "Gallery created successfully!" });
      }
      getGalleries();
      close();
    } catch (error) {
      notification.error({ message: "Operation failed!", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = async (id: string) => {
    try {
      const response = await detailGalleries(id);
      form.setFieldsValue({ image: response.image_url });
      setFormData({ modal: true, action: "detail", payload: { ...response, image: response.image_url } });
    } catch {
      notification.error({ message: "Failed to fetch gallery details!" });
    }
  };

  return (
    <>
      <ModalDelete isModalDelete={formData.modal && formData.action === "delete"} isLoading={false} callback={() => setFormData({ ...formData, modal: true, action: "detail" })} />
      
      <Modal centered footer={null} onCancel={close} open={formData.modal} title={`Form ${formData.action === "detail" ? "Detail" : "Add"} Gallery`}>
        <Form form={form} layout="vertical" name="galleryForm" autoComplete="off" onFinish={handleSubmit}>
          <Form.Item label="Image" name="image" rules={[general.generalInput]}>
            <WidgetUpload
              onSuccess={(response) => {
                form.setFieldValue("image", response.info.url);
                setFormData((prev) => ({ ...prev, payload: { ...prev.payload, image: response.info.url } }));
              }}
              link={formData?.payload?.image}
            />
          </Form.Item>

          {formData.action === "detail" && (
            <Form.Item label="Active Status">
              <Switch
                checked={formData.payload.is_active}
                onChange={(checked) => setFormData((prev) => ({ ...prev, payload: { ...prev.payload, is_active: checked } }))}
              />
            </Form.Item>
          )}

          <Space align="end" className="w-full justify-end">
            <Button type="default" htmlType="button" onClick={close} icon={<CloseOutlined />} disabled={loading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading} disabled={loading}>
              Save
            </Button>
          </Space>
        </Form>
      </Modal>

      <Card
        title={<h2 className="text-xl font-bold">Management Gallery</h2>}
        extra={
          !isMobile && (
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setFormData({ modal: true, action: "add", payload: { title: "", description: "", image: "", id_gallery: "", is_active: true } })}>
              Add Gallery
            </Button>
          )
        }
      >
        <MansoryCard data={gallery.map((item) => ({ id: item.id_gallery, image: item.image_url, title: '', description: '' }))} callback={(record) => handleDetail(record.id)} />
      </Card>

      {isMobile && <FloatButton icon={<PlusCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} onClick={() => setFormData({ modal: true, action: "add", payload: { title: "", description: "", image: "", id_gallery: "", is_active: true } })} />}
    </>
  );
};

export default Gallery;
