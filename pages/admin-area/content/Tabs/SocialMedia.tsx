import React, { useEffect } from "react";
import { Form, Input, Space, Button } from "antd";
import general from "../../../../src/config/general";
import { SaveOutlined } from "@ant-design/icons";
import useContent from "../store/store";
const SocialMedia = () => {
  const [form] = Form.useForm();
  const { formDataSocialMedia, setFormDataSocialMedia } = useContent();
  useEffect(() => {
    form.setFieldsValue(formDataSocialMedia);
  }, []);



  return (
    <React.Fragment>
      <Form layout="vertical" form={form} onFinish={(e) => {}}>
        <Form.Item
          label="Link Facebook"
          name={"facebook"}
          rules={[general.urlInput as any]}
        >
          <Input
            placeholder="https://facebook.com/xxx"
            onChange={(e) => setFormDataSocialMedia("facebook", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Link Instagram"
          name={"instagram"}
          rules={[general.urlInput as any]}
        >
          <Input
            placeholder="https://instagram.com/xxx"
            onChange={(e) =>
              setFormDataSocialMedia("instagram", e.target.value)
            }
          />
        </Form.Item>
        <Form.Item
          label="Link Twitter"
          name={"twitter"}
          rules={[general.urlInput as any]}
        >
          <Input
            placeholder="https://twitter.com/xxx"
            onChange={(e) => setFormDataSocialMedia("twitter", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Link Youtube"
          name={"youtube"}
          rules={[general.urlInput as any]}
        >
          <Input
            placeholder="https://youtube.com/xxx"
            onChange={(e) => setFormDataSocialMedia("youtube", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Link Tik Tok"
          name={"tiktok"}
          rules={[general.urlInput as any]}
        >
          <Input
            placeholder="https://tiktok.com/xxx"
            onChange={(e) => setFormDataSocialMedia("tiktok", e.target.value)}
          />
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
