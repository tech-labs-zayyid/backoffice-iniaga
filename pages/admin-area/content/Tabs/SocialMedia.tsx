import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Space,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Switch,
  notification,
  Spin,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import general from "../../../../src/config/general";
import { useContentContext } from "../../../../src/context/content";

const { Title } = Typography;
const socialMediaPlatforms = [
  "youtube",
  "facebook",
  "instagram",
  "twitter",
  "tiktok",
] as const;

interface SocialMediaData {
  user_account?: string;
  link_embed?: string;
  is_active?: boolean;
}

interface SocialMediaState {
  [key: string]: SocialMediaData;
}

const SocialMedia: React.FC = () => {
  const { socialMedia, setSocialMedia, submitSocialMedia, handleToggleActive } =
    useContentContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [switchLoading, setSwitchLoading] = useState<Record<string, boolean>>(
    {}
  );

  // Simulasi fetching data pertama kali
  useEffect(() => {
    if (Object.keys(socialMedia).length > 0) {
      form.setFieldsValue(socialMedia);
      setFetching(false);
    }
  }, [socialMedia, form]);

  const handleChange = (
    changedValues: Partial<SocialMediaState>,
    allValues: SocialMediaState
  ) => {
    const updatedKey = Object.keys(changedValues)[0] as keyof SocialMediaState;
    if (!updatedKey) return;

    setSocialMedia(
      (prev: SocialMediaState): SocialMediaState => ({
        ...prev,
        [updatedKey]: {
          ...prev[updatedKey],
          ...changedValues[updatedKey],
        },
      })
    );
  };

  const handleSubmit = async (values: SocialMediaState) => {
    setLoading(true);
    try {
      const sanitizedValues: SocialMediaState = socialMediaPlatforms.reduce(
        (acc, platform) => {
          acc[platform] = {
            ...values[platform],
            is_active: socialMedia?.[platform]?.is_active ?? true,
          };
          return acc;
        },
        {} as SocialMediaState
      );

      await submitSocialMedia(sanitizedValues);
      notification.success({
        message: "Social media links updated successfully!",
      });
    } catch (error) {
      notification.error({ message: "Failed to update social media links!" });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = async (platform: string, checked: boolean) => {
    setSwitchLoading((prev) => ({ ...prev, [platform]: true }));
    try {
      await handleToggleActive(platform, checked);
      notification.success({ message: `Status for ${platform} updated!` });
    } catch (error) {
      notification.error({
        message: `Failed to update status for ${platform}`,
      });
    } finally {
      setSwitchLoading((prev) => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <Row>
      <Col span={24}>
        {fetching ? (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Form
            layout="vertical"
            form={form}
            onValuesChange={handleChange}
            onFinish={handleSubmit}
          >
            {socialMediaPlatforms.map((platform) => (
              <div key={platform}>
                <Title
                  level={4}
                  style={{ marginBottom: 10, textTransform: "capitalize" }}
                >
                  {platform}
                </Title>
                <Form.Item name={[platform, "user_account"]} label="Username">
                  <Input
                    placeholder={`Ex: username_${platform}`}
                    disabled={loading || fetching}
                  />
                </Form.Item>
                <Form.Item
                  name={[platform, "link_embed"]}
                  label="Link"
                  rules={[general.urlInput as any]}
                >
                  <Input
                    placeholder={`Ex: https://${platform}.com/xxx`}
                    disabled={loading || fetching}
                  />
                </Form.Item>
                {socialMedia?.[platform]?.is_active !== undefined && (
                  <Form.Item label="Status">
                    <Switch
                      checked={socialMedia[platform].is_active}
                      onChange={(checked) =>
                        handleSwitchChange(platform, checked)
                      }
                      loading={switchLoading[platform]}
                      disabled={fetching || loading}
                    />
                  </Form.Item>
                )}
                <Divider />
              </div>
            ))}
            <Space className="w-full justify-end">
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                disabled={loading || fetching}
              >
                Save
              </Button>
            </Space>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default SocialMedia;
