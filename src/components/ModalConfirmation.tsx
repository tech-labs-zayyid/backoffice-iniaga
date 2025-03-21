import React, { useEffect, useState } from "react";

import {
  Button,
  Row,
  Col,
  Table,
  Tag,
  Form,
  Input,
  Select,
  Image,
  Space,
  Tooltip,
  Typography,
  Modal,
  Divider,
  DatePicker,
  Spin,
} from "antd";
import moment from "moment";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";

const ModalConfirmation = ({ isModalConfirmation, isLoading, callback }) => {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  let timer;

  return (
    isModalConfirmation && (
      <Modal
        centered
        maskClosable={false}
        open={isModalConfirmation}
        onCancel={() => callback(false)}
        title="Delete Data"
        footer={null}
      >
        <Spin spinning={isLoading}>
          <h1>Are you sure you want to update this data ?</h1>
          <Divider />
          <Space align="end" className="w-full justify-end">
            <Button
              icon={<CloseOutlined />}
              type="default"
              onClick={() => callback(false)}
            >
              Cancel
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => callback(true)}
            >
              Submit
            </Button>
          </Space>
        </Spin>
      </Modal>
    )
  );
};
export default ModalConfirmation;
