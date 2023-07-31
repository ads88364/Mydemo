import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { Link } from 'react-router-dom';
import './bouble.scss'
const Bouble = () => (
  <div id='bouble'>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        left: 40,

      }}
      icon={<CustomerServiceOutlined />}

    >
      {localStorage.getItem("userInfo") ? <Link to="/Backstage">
        <FloatButton /></Link> : <Link to="/login"><FloatButton /></Link>}

      {localStorage.getItem("userInfo") ? <Link to="/Returnqu">
        <FloatButton icon={<CommentOutlined />} /></Link> : <Link to="/login"><FloatButton icon={<CommentOutlined />} /></Link>}
    </FloatButton.Group>
  </div>
);

export default Bouble;
