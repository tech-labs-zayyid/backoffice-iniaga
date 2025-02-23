import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Space, Typography } from "antd";

import { CloudUploadOutlined } from "@ant-design/icons";
const WidgetUpload = ({ onSuccess, link = "" }) => {
  return (
    <React.Fragment>
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

      {link !== "" && (
        <>
          <p className="text-sm text-neutral-500 mt-5">Link preview image:</p>
          <Typography.Link target="_blank" href={link}>
            {link}
          </Typography.Link>
        </>
      )}
    </React.Fragment>
  );
};

export default WidgetUpload;
