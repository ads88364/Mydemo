import React from 'react';
import OrderDetailCommon from '../../orderlist/orderdetailcom';

const Orderdetail = ({ tradeitemId, tradeitems, handleBack }) => {
  return (
    <OrderDetailCommon
      tradeitemId={tradeitemId}
      tradeitems={tradeitems}
      type="account"
      handleBack={handleBack}
      showCancelBtn={false} // 不顯示 "取消訂單" 按鈕
    />
  );
};

export default Orderdetail;