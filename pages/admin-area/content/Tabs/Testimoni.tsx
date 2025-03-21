import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Row,
  Avatar,
  FloatButton,
  Spin,
  Switch,
} from "antd";

import {
  UserOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import ModalDelete from "../../../../src/components/ModalDelete";
import general from "../../../../src/config/general";
import WidgetUpload from "../../../../src/components/WidgetUpload";
import { useGeneralContext } from "../../../../src/context/general";
import { useContentContext } from "../../../../src/context/content";

const Testimoni = () => {
  const initialState = {
    name: "",
    description: "",
    photo_url: "",
  };
  const [formData, setFormData] = useState({
    modal: false,
    action: "add",
    payload: initialState,
  });
  const [form] = Form.useForm();
  const datas = [
    {
      image:
        "https://iniaga.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpeople01.85d6f24e.png&w=48&q=75",
      name: "Boby Honda",
      title: "Sales Honda Pasteur",
      description:
        "Dengan fitur yang mudah digunakan, saya bisa fokus pada yang paling penting: membangun hubungan dengan pelanggan dan agen, serta mencapai target penjualan",
    },
    {
      image:
        "https://iniaga.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fanhar.881ec77d.jpg&w=48&q=75",
      name: "Anhar",
      title: "Sales Tunas Toyota",
      description:
        "Aplikasi ini membantu saya mengelola rekrutmen agen dengan lebih efisien dan meningkatkan jangkauan pemasaran",
    },
  ];
  const close = () => {
    form.resetFields();
    setFormData({ payload: initialState, modal: false, action: "" });
  };
  const { isMobile } = useGeneralContext();
  const { testimoni, storeTestimoni, fetchTestimoni, loading } =
    useContentContext();

  const [id, setId] = useState("");
  return (
    <React.Fragment>
      <ModalDelete
        isLoading={loading}
        isModalDelete={formData.modal && formData.action === "delete"}
        isLoading={false}
        callback={close}
      />
      <Modal
        maskClosable={false}
        footer={null}
        onCancel={close}
        open={
          (formData.modal && formData.action === "add") ||
          formData.action === "edit"
        }
        title={`Form ${formData.action === "edit" ? "Edit" : "Add"} Testimoni`}
      >
        <Spin spinning={loading}>
          <Form
            onFinish={async (e) => {
              const res = await storeTestimoni({
                fullname: e.name,
                description: e.description,
                photo_url: e.photo_url,
              });
              fetchTestimoni();
              close();
              console.log(res);
            }}
            form={form}
            layout="vertical"
            name="basic"
            autoComplete="off"
          >
            <Form.Item label="Name" name="name" rules={[general.generalInput]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[general.generalInput]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Photo"
              name="photo_url"
              rules={[general.generalInput]}
            >
              <WidgetUpload
                onSuccess={(response) => {
                  form.setFieldValue("photo_url", response.info.url);
                  setFormData({
                    ...formData,
                    payload: {
                      ...formData.payload,
                      photo_url: response.info.url,
                    },
                  });
                }}
                link={formData?.payload?.photo_url}
              />
            </Form.Item>
            <Space align="end" className="w-full justify-end">
              <Button
                type="default"
                htmlType="button"
                onClick={close}
                icon={<CloseOutlined />}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save
              </Button>
            </Space>
          </Form>
        </Spin>
      </Modal>
      {!isMobile && (
        <React.Fragment>
          <Row justify={"end"}>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() =>
                setFormData({ ...formData, modal: true, action: "add" })
              }
            >
              Add Testimoni
            </Button>
          </Row>
          <br />
        </React.Fragment>
      )}
      <Table
        // loading={loading}
        dataSource={testimoni}
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: "Name",
            dataIndex: "fullname",
            key: "fullname",
            render: (text, record) => {
              return (
                <Space>
                  <Avatar src={record.photo_url}>
                    <UserOutlined />
                  </Avatar>
                  {text}
                </Space>
              );
            },
          },

          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (text, record) => {
              return (
                <Switch
                  loading={record.id === id && loading}
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  defaultChecked={text}
                  onChange={async (checked) => {
                    setId(record.id);
                    await storeTestimoni({
                      fullname: record.fullname,
                      description: record.description,
                      photo_url: record.photo_url,
                      is_active: checked,
                      id: record.id,
                    });
                    fetchTestimoni();
                  }}
                />
              );
            },
          },
          {
            fixed: isMobile ? null : "right",
            title: "#",
            dataIndex: "image",
            key: "image",
            render: (text, record) => {
              return (
                <Space>
                  <Button
                    onClick={() => {
                      form.setFieldsValue({
                        name: record.name,
                        title: record.title,
                        description: record.description,
                        image: record.image,
                      });
                      setFormData({
                        ...formData,
                        modal: true,
                        action: "edit",
                        payload: record,
                      });
                    }}
                    type="primary"
                    icon={<EditOutlined />}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        modal: true,
                        action: "delete",
                        payload: record,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              );
            },
          },
        ]}
      />
      {isMobile && (
        <FloatButton
          icon={<PlusCircleOutlined />}
          type="primary"
          style={{ insetInlineEnd: 24 }}
          onClick={() =>
            setFormData({ ...formData, modal: true, action: "add" })
          }
        />
      )}
    </React.Fragment>
  );
};

export default Testimoni;
