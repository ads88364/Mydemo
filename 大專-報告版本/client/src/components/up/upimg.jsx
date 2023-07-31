import { Upload } from 'antd';
import zhCN from 'antd/locale/zh_TW'
import React, { useState } from 'react';
const Prconly2 = ({setdata}) => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setdata(newFileList)
  };

  // 預覽部分
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

  return (
    <Upload
      action="http://localhost:8000/test"
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
      locale={zhCN}
    >
      {fileList.length < 5 && '+ Upload'}
    </Upload>
  );
};

export default Prconly2;