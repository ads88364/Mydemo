import axios from 'axios';
import React, { useState } from 'react';
import "./forget.scss"
import AlertBox from '../product-item/AlertBox';
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(0);
  const history = useNavigate('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email: email
      });
      setShowAlert(1)
      setTimeout(() => {
        setShowAlert(0);
        history('/')
      }, 2000)
      if (response.ok) {
      }
    } catch (error) {
      setShowAlert(2)
      setTimeout(() => { 
        setShowAlert(0);
       }, 1000)
    }
  };

  return (
    <div id='forgetout' >
      {showAlert === 1 && <AlertBox message={`已寄出！\n請檢查信箱以繼續密碼重置流程！\n連結於一個小時失效`} type="warning" />}
      {showAlert === 2 && <AlertBox message="該電子郵件地址未註冊" type="warning" />}
      <p className='emailtitle'>忘記密碼</p>
      <form onSubmit={handleSubmit}>
        <p className='email'>輸入電子信箱</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">送出</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
