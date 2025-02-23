import React from "react";
import { Form, Input, Space, Button } from "antd";
import general from "../../../../src/config/general";
import { SaveOutlined } from "@ant-design/icons";
const SocialMedia = () => {
  const [form] = Form.useForm();
  return (
    <React.Fragment>
      <Form
        layout="vertical"
        form={form}
        onFinish={(e) => {
          console.log(e);
        }}
      >
        <Form.Item
          label="Link Facebook"
          name={"facebook"}
          rules={[general.urlInput as any]}
        >
          <Input placeholder="https://facebook.com/xxx" />
        </Form.Item>
        <Form.Item
          label="Link Instagram"
          name={"instagram"}
          rules={[general.urlInput as any]}
        >
          <Input placeholder="https://instagram.com/xxx" />
        </Form.Item>
        <Form.Item
          label="Link Twitter"
          name={"twitter"}
          rules={[general.urlInput as any]}
        >
          <Input placeholder="https://twitter.com/xxx" />
        </Form.Item>
        <Form.Item
          label="Link Youtube"
          name={"youtube"}
          rules={[general.urlInput as any]}
        >
          <Input placeholder="https://youtube.com/xxx" />
        </Form.Item>
        <Form.Item
          label="Link Tik Tok"
          name={"tiktok"}
          rules={[general.urlInput as any]}
        >
          <Input placeholder="https://tiktok.com/xxx" />
        </Form.Item>
        <Space align="end" className="w-full justify-end">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Save
          </Button>
        </Space>
      </Form>
    </React.Fragment>
  );
};
export default SocialMedia;
