import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Col, Row, Space, Typography } from "antd";

import { CloudUploadOutlined } from "@ant-design/icons";
const WidgetUpload = ({ onSuccess, link = "", maxFiles = 1 }) => {
  const [files, setFiles] = useState([link]);

  useEffect(() => {
    if(maxFiles>1){
    setFiles([...files, link]);

    }else{
      setFiles([link])
    }
  }, [onSuccess]);


  return (
    <React.Fragment>
      <CldUploadWidget
        onSuccess={onSuccess}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
        options={{
          maxFiles,
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
          <Row>
            {files
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
