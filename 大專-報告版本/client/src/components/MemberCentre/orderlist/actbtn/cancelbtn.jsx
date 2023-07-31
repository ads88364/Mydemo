import React, { useState } from 'react';
import axios from 'axios';


function Cancelbtn({ tradeitemId, onCancel }) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // 提示 訂單已取消
  const [isOrderCanceled, setIsOrderCancelled] = useState(false);
  // 刷新頁面
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleCancelConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleCancelConfirm = async () => {
    console.log("Selected Trade Item ID:", tradeitemId);
    try {
      await axios.post('http://localhost:8000/api/cancelOrder', { tradeitemId });
      // 提示 訂單已取消
      setIsOrderCancelled(true);
    } catch (error) {
      console.log(error);
    }
    setShouldRefresh(true);
    setIsConfirmationOpen(false);
  };

  return (
    <>
      {isConfirmationOpen && (
        <div className="conf-mol">
          <div className="conf-cont">
            <p>是否確定取消該筆訂單？</p>
            <div className="conf-btn">
              <button id='chkbtn' onClick={handleCancelConfirmation}>取消</button>
              <button id='chkbtn' onClick={handleCancelConfirm}>確定</button>
            </div>
          </div>
        </div>
      )}

      {isOrderCanceled && (
        <div className="conf-mol">
          <div className="conf-cont">
            <p>訂單已取消</p>
            <div className="conf-btn">
              {/* 按下確定之後刷新頁面，回我的訂單 */}
              {shouldRefresh && (
                <button id='chkbtn' onClick={() => window.location.reload()}>確定</button>
              )}
            </div>
          </div>
        </div>
      )}

      <button id='actbtn' onClick={() => setIsConfirmationOpen(true)}>取消訂單</button>
    </>
  );
}

export default Cancelbtn;