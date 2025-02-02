import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Upload, Modal, Dropdown, Menu, Button, Card } from "antd";


const ImageUpload = ({ imageData , existImages, index, savePreviewData }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [dataFiles, setDataFiles] = useState([]);
  const [base64Data, setBase64Data] = useState([]);
 // console.log('dataFiles', dataFiles)
  console.log('dataFiles', dataFiles)
  const handleCancel = () => {
    setPreviewVisible(false);
  };
  useEffect(() => {
    setDataFiles(existImages || [])
    // if(existImages.length > 0){
    //   existImages.map((data,index)=>{
    //     cloneDataFile.push({
    //       uid: `${index + 1}`,
    //       name: data,
    //       status: 'done',
    //       url: `${data}`,
    //     })
    //   }) 
    //  setDataFiles(cloneDataFile) 
    // }
  },[index])

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

  const handleChange = async ({ file, fileList }) => {

    setDataFiles(fileList);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  useEffect(() => {
    let cloneBase = []
    if (dataFiles.length) {
      cloneBase = dataFiles.map(fileObj => fileObj.originFileObj);
    }
    console.log('clone base', cloneBase)
    savePreviewData(dataFiles)
    imageData(cloneBase);
    setBase64Data(cloneBase);
  }, [dataFiles])

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
      {/* <PlusOutlined /> */}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <GalleryStyle>
      <Upload
        //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={dataFiles}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {uploadButton}
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

const GalleryStyle = styled.div`
  margin-bottom: 24px;
  .ant-upload-list-picture-card-container,
  .ant-upload {
    width: 128px;
    height: 128px;
    border: none;
    .ant-upload-list-item {
      width: 125px;
      height: 125px;
    }
    .ant-upload-text {
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 17px;
      text-align: center;
      color: #404950;
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

export default ImageUpload;
