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

const ModalDelete = ({ isModalDelete, isLoading, callback }) => {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  let timer;

  return (
    isModalDelete && (
      <Modal
        maskClosable={false}
        open={isModalDelete}
        onCancel={() => callback(false)}
        title="Hapus Data"
        footer={null}
      >
        <Spin spinning={isLoading}>
          <h1>Anda yakin akan menghapus data ini ?</h1>
          <Divider />
          <Row justify={"end"}>
            <Button className="putih-button" onClick={() => callback(false)}>
              Kembali
            </Button>
            <Button className="hijau-button" onClick={() => callback(true)}>
              Hapus
            </Button>
          </Row>
        </Spin>
      </Modal>
    )
  );
};
export default ModalDelete;
