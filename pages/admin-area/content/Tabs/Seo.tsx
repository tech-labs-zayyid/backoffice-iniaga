import React, { useEffect } from "react";
import { Form, Input, Space, Button, Row, Col } from "antd";
import general from "../../../../src/config/general";
import { SaveOutlined } from "@ant-design/icons";
import { useContentContext } from "../../../../src/context/content";
import { useGeneralContext } from "../../../../src/context/general";
const Seo = () => {
  const { seo, setSeo } = useContentContext();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(seo);
  }, [form, seo]);
  const handleChange = (changedValues: any, allValues: any) => {
    setSeo(allValues);
  };
  const handleSubmit = (values: any) => {
    console.log("Form Data Submitted:", values);
  };
  const { isMobile } = useGeneralContext();
  return (
    <Row>
      <Col md={24}>
        <Form
          layout={isMobile ? null : "vertical"}
          form={form}
          onValuesChange={handleChange}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="SEO"
            name={"facebook"}
            rules={[general.generalInput]}
          >
            <Input
              placeholder="Ex: mobil murah bandung, mobil bekas murah, sewa mobil"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Space align="end" className="w-full justify-end">
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save
            </Button>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};
export default Seo;
