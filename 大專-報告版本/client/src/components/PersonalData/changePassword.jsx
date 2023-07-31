import React, { useState } from 'react';
import './changePassword.scss';
import axios from 'axios';
import AlertBox from '../product-item/AlertBox';


const ChangePassword = ({ onClose, account }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showAlert, setShowAlert] = useState(0);
  const [message, setMessage] = useState('');


  const handleConfirmClick = () => {

    if (newPassword !== confirmNewPassword) {
      setShowAlert(2);
      setMessage('新密碼與再次輸入的新密碼不符');
      setTimeout(() => {
        setShowAlert(0);
      }, 1000);
      return;
    }
    // 先判斷舊密碼與資料庫是否符合
    axios
      .post('http://localhost:8000/api/change-password', {
        oldPassword,
        newPassword,
        confirmNewPassword,
        account
      })
      .then((response) => {
        console.log(response.data);
        setShowAlert(1)
        setTimeout(() => {
          setShowAlert(0);
          onClose();
        }, 1000)

      })
      .catch((error) => {
        setShowAlert(2)
        const err = error.response.data.message
        setMessage(err)
        setTimeout(() => {
          setShowAlert(0);
        }, 1000)


      });
  };

  return (
    <div id='passwordout'>
      {showAlert === 1 && <AlertBox message="密碼已修改" type="error" />}
      {showAlert === 2 && <AlertBox message={message} type="warning" />}
      <div className='ptitle'>修改密碼</div>
      <div className='passwordIn'>
        <label htmlFor='oldPassword'>舊密碼</label>
        <input
          type='password'
          id='oldPassword'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor='newPassword'>新密碼</label>
        <input
          type='password'
          id='newPassword'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor='confirmNewPassword'>再次輸入新密碼</label>
        <input
          type='password'
          id='confirmNewPassword'
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <div className='passwordbtn'>
        <button onClick={onClose}>取消</button>
        <button onClick={handleConfirmClick}>確認</button>
      </div>
    </div>
  );
};

export default ChangePassword;
