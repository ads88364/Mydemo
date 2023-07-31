import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 導入useNavigate
import Cmgbtn from '../components/MemberCentre/cmmgmt/cmgbtn';
import './centre.scss';

function Cmmgmt() {
  const [displayedComponent, setDisplayedComponent] = useState('Mycm');
  const navigate = useNavigate(); // 取得navigate函式
  const handleButtonClick = (component) => {
    setDisplayedComponent(component);
  };

  // 增加 useEffect，用於檢查使用者登入狀態
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      // 若未登入，可以在這裡做相應的處理，例如顯示"請先登入"的內容
      navigate('/');
    } else {
      // 若已登入，可以在這裡做相應的處理，例如顯示正常的內容
      document.getElementById('logged-in-content').style.display = 'block';
    }
  }, [navigate]);

  return (
    <div>
      {/* 顯示已登入時的內容 */}
      <div id="logged-in-content" style={{ display: 'none' }}>
        <div className="bgset">
          <div className="text">
            <div className="mctitle">| 會員中心 |</div>
            <div>商品管理</div>
          </div>
          <Cmgbtn displayedComponent={displayedComponent} handleButtonClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default Cmmgmt;
