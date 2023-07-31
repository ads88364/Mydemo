import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Cascader, Upload, message, Modal } from 'antd';
import dataitem from "../../data/item2.json";
import axios from "axios";
import area from "../../data/CityCountyDataAAA.json";
// import Prconly2 from '../upimg'
import { useNavigate } from 'react-router-dom'; // 導入useNavigate
import "./up.scss";
const Up = ({ setdata }) => {
  const [fileList, setFileList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [shouldUpload, setShouldUpload] = useState(false);
  const [showModal, setShowModal] = useState(false); // 新增用於控制提示框顯示的狀態
  const navigate = useNavigate(); // 取得navigate函式

  // 在這裡增加useEffect來檢查使用者登入狀態
  useEffect(() => {
    const isLoggedin = localStorage.getItem('userInfo'); // 假設使用localStorage來儲存登入狀態

    if (!isLoggedin) {
      // 若未登入，導向至登入頁面
      navigate('/login'); // 假設登入頁面路由是/login
    }
  }, [navigate]);
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image[0].originFileObj);
      const response = await axios.post(`http://localhost:8000/api/public/img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        // File was uploaded successfully, get the image URL
        const imageUrl = response.data.imageUrl;

        // 進行解構賦值操作，將 values 物件的某些屬性拆分成單獨的變數
        // 物件中的 region 和 category 屬性拆分出來，並將其餘的屬性放在 otherValues 物件中
        const { region, category, ...otherValues } = values;
        // 再次使用解構賦值將 region 陣列的兩個元素分別賦值給 cityCounty 和 area 這兩個變數
        const [cityCounty, area] = region;
        // 將所選擇的商品分類拆分為大類和小類
        const [productCategoryId, productCategoryChild] = category;
        // 找網頁的登入帳號
        const user = localStorage.getItem('userInfo').slice(1, -1);
        // 整理資料，將所有需要傳遞給後端的資料整合成一個物件
        const formData = {
          ...otherValues,
          user,
          cityCounty,
          area,
          productCategoryId,
          productCategoryChild,
          image: imageUrl
        };
        const response2 = await axios.post(`http://localhost:8000/api/fastup/${user}`, formData);
        console.log(response2.data); // 假設後端返回一些數據
        console.log(user);
        setShowModal(true);
      } else {
        message.error("圖片上傳失敗");
      }
      // 在表單提交時，將標誌設置為false，觸發父元件中的圖片上傳邏輯
      setShouldUpload(false);
      setdata(fileList); // 將文件列表更新到父元件中
    } catch (error) {
      console.error(error);
    }
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onChange = (value) => {
    console.log(value);
  };
  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const beforeUpload = () => {
    setShouldUpload(true);
    return false;
  };

    // 點擊提示框確定按鈕時觸發的函數
    const handleModalOk = () => {
      setShowModal(false); // 隱藏提示框
      navigate('/cmmgmt'); // 導航到 Mycm 頁面
    };

  return (
    <div id='fastout'>
    <h1 class="psg-title">【 快速上架 】</h1>
    <Form
      name="productForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      className="product-form container"
    >
      <Form.Item
        label="商品名稱"
        name="productName"
        rules={[{ required: true, message: '輸入商品名稱' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="租金(/天)"
        name="rent"
        rules={[{ required: true, message: '輸入租金' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="押金"
        name="deposit"
        rules={[{ required: true, message: '輸入押金' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="照片"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        rules={[{ required: true, message: '請上傳照片' }]}
      >
        <Upload
          showUploadList={false}
          accept=".jpg,.jpeg,.png"
          beforeUpload={beforeUpload}
          onChange={handleFileChange}
        >
          {fileList.length > 0 ? (
            <img src={URL.createObjectURL(fileList[0].originFileObj)} alt="preview" style={{ maxHeight: '200px' }} />
          ) : (
            <Button>上傳</Button>
          )}
        </Upload>
      </Form.Item>
      <Form.Item
        label="商品分類"
        name="category"
        rules={[{ required: true, message: '請選擇商品分類' }]}
        className="category-form-item"
      >
        <Cascader
          options={dataitem}
          onChange={onChange}
          placeholder="請選擇商品分類"
          fieldNames={{ children: "subOptions", value: "value", label: "label" }}
        />
      </Form.Item>
      <Form.Item
        label="配件(非必填)"
        name="accessory"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="地區"
        name="region"
        rules={[{ required: true, message: '請選擇地區' }]}
      >
        <Cascader
          options={area}
          onChange={onChange}
          placeholder="請選擇地區"
          fieldNames={{ children: "AreaList", label: "Name", value: "Name" }}
          inputStyle={{ fontSize: '80px'}}
        />
      </Form.Item>
      <Form.Item
        label="商品描述"
        name="productDetail"
        rules={[{ required: true, message: '請輸入商品描述' }]}
      >
        <Input.TextArea
          maxLength={300}
          placeholder="請輸入商品描述，限300字內"
        />
      </Form.Item>
      <div className="uploadimg" wrapperCol={{ offset: 6, span: 14 }}>
        <Button type="primary" htmlType="submit">
          上架
        </Button>
      </div>
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleModalOk}
        okText="確定"
        cancelText="取消"
      >
        上架成功!
      </Modal>
    </Form>
    </div>
  );
};
export default Up;