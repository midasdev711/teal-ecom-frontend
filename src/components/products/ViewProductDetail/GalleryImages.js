import React, { useState } from "react";
import styled from "styled-components";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Upload, Modal, Dropdown, Menu, Button, Card } from "antd";

const fileList = [
  {
    uid: "-1",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
  {
    uid: "-2",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
  {
    uid: "-3",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
  {
    uid: "-4",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
  {
    uid: "-5",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
  {
    uid: "-6",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
  {
    uid: "-7",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
  {
    uid: "-8",
    name: "image.png",
    status: "done",
    url:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398",
  },
];

const GalleryImages = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [dataFiles, setDataFiles] = useState(fileList);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setDataFiles(fileList);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <GalleryStyle>
      <TitleStyle>
        <TextTitle>Variants</TextTitle>
        <AlignRight>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="0">Add image from URL</Menu.Item>
                <Menu.Item key="1">Embed Youtube video</Menu.Item>
              </Menu>
            }
          >
            <Button type="link">
              Add media from URL <DownOutlined />
            </Button>
          </Dropdown>
        </AlignRight>
      </TitleStyle>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={dataFiles}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 15 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </GalleryStyle>
  );
};

const GalleryStyle = styled(Card)`
  margin-bottom: 24px;
  .ant-upload-list-picture-card-container,
  .ant-upload {
    width: 128px;
    height: 128px;
    .ant-upload-list-item {
      width: 125px;
      height: 125px;
    }
  }
`;

const TextTitle = styled.span`
  width: calc(100% - 202px);
`;

const AlignRight = styled.div`
  text-align: right;
  width: 202px;
`;

const TitleStyle = styled.h3`
  overflow: hidden;
  font-weight: bold;
  font-size: 18px;
  color: #222;
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

export default GalleryImages;
