import React, { useEffect } from "react";
import { Form, Input, Space, Button, Row, Col, Typography, Divider, Switch } from "antd";
import general from "../../../../src/config/general";
import { SaveOutlined } from "@ant-design/icons";
import { useContentContext } from "../../../../src/context/content";

const { Title } = Typography;
const socialMediaPlatforms = ["youtube", "facebook", "instagram", "twitter", "tiktok"];

const SocialMedia = () => {
    const { socialMedia, setSocialMedia, submitSocialMedia, handleToggleActive } = useContentContext();
    const [form] = Form.useForm();

    useEffect(() => {
        if (Object.keys(socialMedia).length > 0) {
            form.setFieldsValue(socialMedia);
        }
    }, [socialMedia, form]);

    const handleChange = (changedValues: any, allValues: any) => {
        const updatedKey = Object.keys(changedValues)[0];
        setSocialMedia((prev) => ({
            ...prev,
            [updatedKey]: {
                ...prev[updatedKey],
                ...changedValues[updatedKey],
                is_active: prev[updatedKey]?.is_active,
            },
        }));
    };

    const handleSubmit = async (values: any) => {
        const sanitizedValues = socialMediaPlatforms.reduce((acc, platform) => {
            acc[platform] = {
                ...values[platform],
                is_active: socialMedia[platform]?.is_active,
            };
            return acc;
        }, {} as Record<string, any>);

        await submitSocialMedia(sanitizedValues);
    };

    return (
        <Row>
            <Col span={24}>
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
                    <Space className="w-full justify-end">
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Save</Button>
                    </Space>
                </Form>
            </Col>
        </Row>
    );
};

export default SocialMedia;