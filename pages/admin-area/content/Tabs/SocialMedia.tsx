import React, { useEffect } from "react";
import { Form, Input, Space, Button, Row, Col } from "antd";
import general from "../../../../src/config/general";
import { SaveOutlined } from "@ant-design/icons";
import { useContentContext } from "../../../../src/context/content";
import { useGeneralContext } from "../../../../src/context/general";
const SocialMedia = () => {
  const { socialMedia, setSocialMedia } = useContentContext();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(socialMedia);
  }, [form, socialMedia]);
  console.log(socialMedia);
  const handleChange = (changedValues: any, allValues: any) => {
    setSocialMedia(allValues);
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
            label="Link Facebook"
            name={"facebook"}
            rules={[general.urlInput as any]}
          >
            <Input
              placeholder="Ex: https://facebook.com/xxx"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Link Instagram"
            name={"instagram"}
            rules={[general.urlInput as any]}
          >
            <Input placeholder="Ex: https://instagram.com/xxx" />
          </Form.Item>
          <Form.Item
            label="Link Twitter"
            name={"twitter"}
            rules={[general.urlInput as any]}
          >
            <Input placeholder="Ex: https://twitter.com/xxx" />
          </Form.Item>
          <Form.Item
            label="Link Youtube"
            name={"youtube"}
            rules={[general.urlInput as any]}
          >
            <Input placeholder="Ex: https://youtube.com/xxx" />
          </Form.Item>
          <Form.Item
            label="Link Tik Tok"
            name={"tiktok"}
            rules={[general.urlInput as any]}
          >
            <Input placeholder="Ex: https://tiktok.com/xxx" />
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
export default SocialMedia;
