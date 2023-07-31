import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import AlertBox from '../product-item/AlertBox';
import './Prconly.scss'
const Prconly = ({ account, onClose }) => {

  const [fileList, setFileList] = useState([]);
  const [showAlert, setShowAlert] = useState(0);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleConfirm = async () => {
    onClose(fileList);

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('photo', file.originFileObj);
    });

    try {

      formData.append('account', account);

      const response = await fetch('http://localhost:8000/upload-photo', {
        method: 'POST',
        body: formData,

      });
      const data = await response.json();
      
      window.location.reload()
      setShowAlert(1);
     
      setTimeout(() => {
      }, 1000);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };
  return (
    <div id='prconlyout'>
      {showAlert === 1 && <AlertBox message="照片已修改" type="warning" />}
      <div className='prconlyTitle'>上傳照片</div>
      <ImgCrop rotationSlider >
        <Upload
          action="http://localhost:8000/upload-photo"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          size={150}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <div className='prconlBtn'>
        <button onClick={onClose}>取消</button>
        <button onClick={handleConfirm}>確認</button>
      </div>
    </div>
  );
};
export default Prconly;