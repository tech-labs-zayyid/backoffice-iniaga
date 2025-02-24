import { Button, Col, Form, Image, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import general from "../../../../src/config/general";
import WidgetUpload from "../../../../src/components/WidgetUpload";
import { CKEditor } from "ckeditor4-react";
import { SaveOutlined } from "@ant-design/icons";
import useContent from "../store/store";

const Profile = () => {
  const { formDataProfile, setFormDataProfile } = useContent();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formDataProfile);
  }, []);

  return (
    <React.Fragment>
      <Form layout="vertical" form={form}>
        <Row gutter={[10, 10]}>
          <Col md={8}>
            <Form.Item
              label="title"
              name="title"
              rules={[general.generalInput]}
            >
              <Input.TextArea
                cols={12}
                rows={formDataProfile.image!==''?4:8}
                value={formDataProfile.title}
                onChange={(e) => setFormDataProfile("title", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[general.generalInput]}
            >
              <WidgetUpload
                onSuccess={(response) => {
                  form.setFieldValue("image", response.info.url);
                  setFormDataProfile("image", response.info.url);
                }}
                link={formDataProfile?.image}
              />
            </Form.Item>
          </Col>
          <Col md={16}>
            <Form.Item
              label="Description"
              name="description"
              rules={[general.generalInput]}
            >
              <CKEditor
                initData={formDataProfile.description} // Set default value
                onChange={(event) => {
                  const data = event.editor.getData();
                  setFormDataProfile("description", data);
                  form.setFieldValue("description", data);
                }}
              />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Space align="end" className="w-full justify-end">
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
export default Profile;
