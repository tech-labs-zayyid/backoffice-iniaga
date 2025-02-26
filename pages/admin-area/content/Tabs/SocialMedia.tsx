import React, { useEffect, useState } from "react";
import { Form, Input, Space, Button } from "antd";
import general from "../../../../src/config/general";
import { SaveOutlined } from "@ant-design/icons";
import { useContentContext } from "../context";
const SocialMedia = () => {
  const { socialMedia, setSocialMedia } = useContentContext();

  const [form] = Form.useForm();
  // const initialState = {
  //   facebook: "",
  //   instagram: "",
  //   twitter: "",
  //   youtube: "",
  //   tiktok: "",
  // };
  // const [formDataSocialMedia, setFormDataSocialMedia] = useState(initialState);
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
  return (
    <React.Fragment>
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleChange}
        onFinish={handleSubmit}
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
