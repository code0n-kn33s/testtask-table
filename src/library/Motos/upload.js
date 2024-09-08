import React, { useState, useEffect } from 'react';
import { LoadingOutlined, VerticalAlignBottomOutlined, CloseOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const UploadElement = (props) => {
  const { setImageTab, isImageTab, imageUrl, setImageUrl } = props

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
    </button>
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageTab(URL.createObjectURL(file));
      setImageUrl({ selectedFile: file });
    }
  };

  const resetImg = () => {
    setImageTab(false)
    setImageUrl(null)
  }


  return (
    <div >
      <input
        type="file"
        id="file-input-2"
        name="id-card"
        onChange={handleFileChange}
      />

      <div className="file-preloader-nav">
        <label htmlFor="file-input-2" className="btn btn--secondary">
          <VerticalAlignBottomOutlined style={{ fontSize: "30px" }} />
        </label>
        <span onClick={resetImg} className="btn btn--secondary"><CloseOutlined /></span>
      </div>

      {(isImageTab ) ? (
        <img
          src={isImageTab.slice(0,4) === 'blob' ?
            isImageTab
            :
            process.env.REACT_APP_API_URL + props.modalContent?.image
          }
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </div>
  );
};