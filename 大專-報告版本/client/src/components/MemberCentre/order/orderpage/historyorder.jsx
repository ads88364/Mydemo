import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import OrderDetail from './Orderdetail';
import Ordertable from '../../orderlist/ordertable';

const Historyorder = () => {
  const [tradeItems, setTradeItems] = useState([]);
  const [selectedTradeItemId, setSelectedTradeItemId] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const useract = localStorage.getItem('userInfo');
  const user = useract ? useract.slice(1, -1) : '';

  const fetchTradeItems = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/myorder/${user}`);
      setTradeItems(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [user]); // 將 'user' 列入 useCallback 的依賴陣列中

  useEffect(() => {
    fetchTradeItems(); // 在 useEffect 中調用 fetchTradeItems
  }, [fetchTradeItems]); // 將 'fetchTradeItems' 列入 useEffect 的依賴陣列中

  const handleDetail = (tradeItemId) => {
    setSelectedTradeItemId(tradeItemId);
    setShowOrderDetail(true);
  };

  const handleBack = () => {
    setSelectedTradeItemId(null);
    setShowOrderDetail(false);
  };

  const filterState = (state) => state > 2; // 過濾狀態為大於2的訂單
  const orderStatusMapping = {
    0: '等待回應中',
    1: '等待租借中',
    2: '租借中',
    3: '已完成',
    4: '已取消',
  };
  return (
    <div className="order-component">
      {showOrderDetail ? (
        <OrderDetail tradeitemId={selectedTradeItemId} tradeitems={tradeItems} handleBack={handleBack} />
      ) : (
        <Ordertable
          tradeItems={tradeItems}
          filterState={filterState}
          handleDetail={handleDetail}
          orderStatusMapping={orderStatusMapping} // 將 orderStatusMapping 傳遞給 Ordertable 元件
        />
      )}
    </div>
  );
};

export default Historyorder;