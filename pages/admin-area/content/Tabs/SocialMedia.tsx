import React, { useEffect } from "react";
import { Form, Input, Space, Button, Row, Col, Typography, Divider, Switch } from "antd";
import general from "../../../../src/config/general";
import { SaveOutlined } from "@ant-design/icons";
import { useContentContext } from "../../../../src/context/content";

const { Title } = Typography;

const SocialMedia = () => {
    const { socialMedia, setSocialMedia, submitSocialMedia, handleToggleActive } = useContentContext();
    const [form] = Form.useForm();

    useEffect(() => {
        if (Object.keys(socialMedia).length > 0) {
            form.setFieldsValue(socialMedia);
        }
    }, [socialMedia]);

    const handleChange = (_changedValues: any, allValues: any) => {
        setSocialMedia((prev: SocialMediaForm) => {
            const updatedData: SocialMediaForm = { ...prev };

            Object.entries(allValues).forEach(([platform, value]) => {
                updatedData[platform] = {
                    ...prev[platform],
                    ...value,
                    is_active: prev[platform]?.is_active ?? true,
                };
            });

            return updatedData;
        });
    };

    const handleSubmit = async (values: any) => {
        await submitSocialMedia(values);
    };

    const socialMediaPlatforms = ["youtube", "facebook", "instagram", "twitter", "tiktok"];

    return (
        <Row>
            <Col md={24}>
                <Form layout="vertical" form={form} onValuesChange={handleChange} onFinish={handleSubmit}>
                    {socialMediaPlatforms.map((platform) => (
                        <div key={platform}>
                            <Title level={4} style={{ marginBottom: 10, textTransform: "capitalize" }}>
                                {platform}
                            </Title>

                            <Form.Item name={[platform, "user_account"]} label="Username">
                                <Input placeholder={`Ex: username_${platform}`} />
                            </Form.Item>

                            <Form.Item name={[platform, "link_embed"]} label="Link" rules={[general.urlInput as any]}>
                                <Input placeholder={`Ex: https://${platform}.com/xxx`} />
                            </Form.Item>

                            {socialMedia[platform]?.is_active !== undefined && (
                                <Form.Item label="Status">
                                    <Switch
                                        checked={socialMedia[platform].is_active}
                                        onChange={(checked) => handleToggleActive(platform, checked)}
                                    />
                                </Form.Item>
                            )}

                            <Divider />
                        </div>
                    ))}

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
