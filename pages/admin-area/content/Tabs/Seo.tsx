import React, { useEffect, useState } from "react";
import { Form, Input, Space, Button, Row, Col, notification } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { getCookie } from "cookies-next";
import { decodeToken } from "../../../../utils/general_utils";
import general from "../../../../src/config/general";
import { useContentContext } from "../../../../src/context/content";
import { useGeneralContext } from "../../../../src/context/general";

const Seo = () => {
  const { seo_description, setSeoDescription, updateSeoDescription } = useContentContext();
  const { isMobile } = useGeneralContext();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue(seo_description);
  }, [form, seo_description]);

  const handleChange = (changedValues: any, allValues: any) => {
    setSeoDescription(allValues);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const token = getCookie("token");
      const payload = { ...values, public_access: "", product_id: decodeToken(token)?.product_id };

      const response = await updateSeoDescription(payload);
      console.log('response: ', response)
      notification.success({
        message: "Success",
        description: "SEO description updated successfully!"
      });

    } catch (error) {
      return false
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col md={24}>
        <Form
          layout={isMobile ? undefined : "vertical"}
          form={form}
          onValuesChange={handleChange}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="SEO"
            name="seo_description"
            rules={[general.generalInput]}
          >
            <Input
              placeholder="Ex: mobil murah bandung, mobil bekas murah, sewa mobil"
              style={{ width: "100%" }}
              disabled={loading}
            />
          </Form.Item>

          <Space align="end" className="w-full justify-end">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};

export default Seo;
