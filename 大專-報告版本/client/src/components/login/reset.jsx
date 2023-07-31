import React, { useState } from 'react';
import axios from 'axios';
import AlertBox from '../product-item/AlertBox';
import "./reset.scss"

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messenger, setMessenger] = useState('');
  const [success, setSuccess] = useState('');
  const [showAlert, setShowAlert] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessenger('');
    setSuccess('');

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (!token) {
      setMessenger('無效的重置密碼連結。');
      return;
    }

    if (password !== confirmPassword) {
      setMessenger('密碼與確認密碼不匹配。');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/reset-password', {
        token,
        password,
      });

      if (response.status === 200) {
        setShowAlert(1)
        setSuccess(`密碼重置成功！\n請重新登入`);
        setTimeout(() => {window.location = "/login"}, 1000)

      } else {
        setMessenger('密碼重置失敗，請稍後再試。');
      }
    } catch (error) {
      setMessenger('密碼重置失敗，請稍後再試1。');
    }
  };

  return (
    <div id='resetout' >
      {showAlert === 1 && <AlertBox message={success} type="warning" />}
      <p className='resettitle' >重置密碼</p>
      <form onSubmit={handleResetPassword}>
        <div>
          <p className='reset'>新密碼：</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <p className='reset'>確認密碼：</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {messenger && <p className='resetcheak'>{messenger}</p>}
        <button type="submit">重置密碼</button>
      </form>
    </div>
  );
};

export default ResetPassword;
