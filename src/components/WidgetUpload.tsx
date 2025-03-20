import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { CldUploadWidget } from "next-cloudinary";
import { Col, Row, Space, Typography } from "antd";

import { CloudUploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
const WidgetUpload = ({ onSuccess, link = "", files = [], maxFiles = 1 }) => {
  const [tempFiles, setTempFiles] = useState([]);

  useEffect(() => {
    setTempFiles(Array.from(new Set([...tempFiles, ...files])));
  }, [onSuccess]);

  const router = useRouter();
  useEffect(() => {
    localStorage.setItem(
      `tempFiles_${router.pathname}`,
      JSON.stringify(tempFiles)
    );
  }, [tempFiles]);

  return (
    <React.Fragment>
      <CldUploadWidget
        onSuccess={(res) => {
          onSuccess(res);
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
        options={{
          maxFiles,
          multiple: true,
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
          <p className="text-sm text-neutral-500 my-5">Link preview image:</p>
          <Row>
            <Col md={24} className="flex flex-col items-center align-middle gap-8">
              <img
                src={link}
                className="rounded-xl"
                alt="uploaded image"
                width={200}
                height={200}
              />
              <Typography.Link target="_blank" href={link}>
                {link}
              </Typography.Link>
            </Col>
          </Row>
        </>
      )}
      {tempFiles.length > 0 && (
        <>
          <p className="text-sm text-neutral-500 mt-5">Link preview image:</p>
          <Row>
            {tempFiles
              .filter((v) => v !== "")
              .map((v, index) => {
                return (
                  <Col md={24}>
                    <Typography.Link key={index} target="_blank" href={v}>
                      {v}
                    </Typography.Link>
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default WidgetUpload;
