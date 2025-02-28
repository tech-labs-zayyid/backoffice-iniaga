import { Button, Col, Form,  Input, Row, Space } from "antd";
import React, { useEffect } from "react";
import general from "../../../../src/config/general";
import WidgetUpload from "../../../../src/components/WidgetUpload";
import { SaveOutlined } from "@ant-design/icons";
import CKEditor from "react-ckeditor-component";
import { useContentContext } from "../../../../src/context/content";

const Profile = () => {
  const [form] = Form.useForm();
  const { profile, setProfile } = useContentContext();
  useEffect(() => {
    form.setFieldsValue(profile);
  }, [form, profile]);
  const handleChange = (changedValues: any, allValues: any) => {
    setProfile(allValues);
  };
  const handleEditorChange = (e: any) => {
    const data = e.editor.getData();
    setProfile({
      ...profile,
      description: data,
    });
    form.setFieldValue("description", data);
  };
  const handleImageUpload = (response: any) => {
    form.setFieldValue("image", response.info.url);
    setProfile({
      ...profile,
      image: response.info.url,
    });
  };

  

  

  return (
    <React.Fragment>
      <Form layout="vertical" form={form} onValuesChange={handleChange}>
        <Row gutter={[10, 10]}>
          <Col md={8} xs={24} sm={24}>
            <Form.Item
              label="title"
              name="title"
              rules={[general.generalInput]}
            >
              <Input.TextArea rows={profile.image !== "" ? 4 : 8} />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[general.generalInput]}
            >
              <WidgetUpload
                onSuccess={handleImageUpload}
                link={profile?.image}
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
                isScriptLoaded={false}
                activeClass="p10"
                content={profile?.description}
                events={{
                  
                  blur: (e) => {},
                  afterPaste: (e) => {},
                  change: handleEditorChange,
                }}
              />
            </Form.Item>
          </Col>
          <Col md={24} xs={24}>
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
