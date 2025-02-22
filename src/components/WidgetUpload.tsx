import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button, Card, Form, Input, Modal, Space, Typography } from "antd";

import { PlusCircleOutlined, CloudUploadOutlined } from "@ant-design/icons";
// import Link from "antd/es/typography/Link";
const WidgetUpload = ({ onSuccess }) => {
  return (
    <CldUploadWidget
      onSuccess={onSuccess}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
					relative
					cursor-pointer
					hover:opacity-70
					transition
					border-dashed 
					border-2
					rounded-lg 
					p-2 
					border-neutral-300
					flex
					flex-col
					justify-center
					items-center
					gap-4
					"
          >
            {/* <CloudUploadOutlined className="text-2xl" /> */}
            <div className="text-sm">
              <Space>
                <CloudUploadOutlined className="text-2xl" />
                Click to upload
              </Space>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default WidgetUpload;
