import React, { useState } from "react";
import {
  Button,
  FloatButton,
  Form,
  Input,
  Modal,
  Row,
  Space,
  List,
  Card,
  Image as AntdImage,
  notification,
  Switch,
} from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import general from "../../../../src/config/general";
import WidgetUpload from "../../../../src/components/WidgetUpload";
import { useContentContext } from "../../../../src/context/content";
import { useGeneralContext } from "../../../../src/context/general";

const Banner = () => {
  const { banner, createBanner, detailBanner, putBanner } = useContentContext();
  const { isMobile } = useGeneralContext();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    modal: false,
    action: "",
    banners: [{ id: '', description: "", image: "", is_active: true }],
  });

  const [loading, setLoading] = useState(false);

  const close = () => {
    form.resetFields();
    setFormData({ modal: false, action: "", banners: [{ id: '', description: "", image: "", is_active: true }] });
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    const payload = {
      data_banner: values.banners.map((banner: any) => {
        let data: any = {
          description: banner.description || "",
          image_url: banner.image || "",
        };
        
        if (formData.action === "detail") {
          data.is_active = banner.is_active;
        }
        
        return data;
      }),
    };

    try {
      if (formData.action === "detail") {
        await putBanner(formData.banners[0]?.id, payload.data_banner[0]);
      } else {
        await createBanner(payload);
      }
      notification.success({
        message: "Success",
        description: "Banners successfully saved!",
      });
      close();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to save banners. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = async (id: string) => {
    setLoading(true);
    try {
      const response: any = await detailBanner(id);
  
      form.setFieldsValue({
        banners: [{
          id: response.id_banner,
          description: response.description,
          image: response.image_url,
          is_active: response.is_active || false,
        }]
      });
  
      setFormData({
        modal: true,
        action: "detail",
        banners: [{
          id: response.id_banner,
          description: response.description,
          image: response.image_url,
          is_active: response.is_active, 
        }]
      });
    } catch {
      notification.error({ message: "Failed to fetch banner details!" });
    } finally {
      setLoading(false);
    }
  };  

  const addBanner = () => {
    setFormData((prev: any) => ({
      ...prev,
      banners: [...prev.banners, { id: Date.now(), description: "", image: "", is_active: true }],
    }));
  };

  const removeBanner = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      banners: prev.banners.filter((banner) => banner.id !== id),
    }));
  };

  return (
    <>
      <Modal
        centered
        footer={null}
        onCancel={close}
        open={formData.modal}
        title={formData.action === "detail" ? "Detail & Edit Banner" : "Add Banners"}
      >
        <Form onFinish={handleSave} form={form} layout="vertical" autoComplete="off">
          <List
            dataSource={formData.banners}
            renderItem={(banner, index) => (
              <List.Item key={banner.id}>
                <Space direction="vertical" className="w-full">
                  <Form.Item
                    label={formData.action === "detail" ? 'Description' : `Description ${index + 1}`}
                    name={formData.action === "detail" ? ["banners", 0, "description"] : ["banners", index, "description"]}
                  >
                    <Input.TextArea disabled={loading} />
                  </Form.Item>

                  <Form.Item label={`Image ${index + 1}`} name={["banners", index, "image"]} rules={[general.generalInput]}>
                    <WidgetUpload
                      onSuccess={(response) => {
                        form.setFieldValue(["banners", index, "image"], response.info.url);
                        setFormData((prev) => {
                          const updatedBanners = [...prev.banners];
                          updatedBanners[index].image = response.info.url;
                          return { ...prev, banners: updatedBanners };
                        });
                      }}
                    />
                  </Form.Item>

                  {banner.image && <AntdImage src={banner.image} alt={`Preview ${index + 1}`} width={100} />}

                  {formData.action === "detail" && (
                    <Form.Item label="Active" name={["banners", index, "is_active"]} valuePropName="checked">
                      <Switch disabled={loading} />
                    </Form.Item>
                  )}

                  {formData.banners.length > 1 && formData.action !== "detail" && (
                    <Button danger icon={<DeleteOutlined />} onClick={() => removeBanner(banner.id)} disabled={loading}>
                      Remove
                    </Button>
                  )}
                </Space>
              </List.Item>
            )}
          />

          {formData.action !== "detail" && (
            <Button type="dashed" onClick={addBanner} block icon={<PlusCircleOutlined />} disabled={loading}>
              Add Another Banner
            </Button>
          )}

          <Space align="end" className="w-full justify-end mt-5">
            <Button type="default" onClick={close} icon={<CloseOutlined />} disabled={loading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" icon={loading ? <LoadingOutlined /> : <SaveOutlined />} loading={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Space>
        </Form>
      </Modal>

      <Card
        title={<h2 className="text-xl font-bold">Management Banner</h2>}
        extra={!isMobile && (
          <Row justify={"end"}>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setFormData({ ...formData, modal: true, action: "add" })}>
              Add Banner
            </Button>
          </Row>
        )}
      >
        <List
          dataSource={banner}
          renderItem={(item: undefined | any) => (
            <List.Item key={item.id_banner}>
              <Card hoverable onClick={() => handleDetail(item.id_banner)}>
                <AntdImage src={item.image_url} alt="Banner" width={150} preview={false} />
                <p>{item?.description}</p>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default Banner;
