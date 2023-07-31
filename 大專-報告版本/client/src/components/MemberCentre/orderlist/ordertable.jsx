// OrderTable.jsx
import React from 'react';
// import { getOrderStatus, limitProductName, calculateDays } from './orderutils';
import { calculateDays } from './orderutils';
// import { limitProductName, calculateDays } from './orderutils';
// import Orderstate from './orderstate';

const Ordertable = ({ tradeItems, filterState, handleDetail, orderStatusMapping }) => {
  const uniqueTradeItems = tradeItems.filter(
    (tradeItem, index, self) => self.findIndex((t) => t.tradeitemId === tradeItem.tradeitemId) === index
  );

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>訂單編號</th>
          {/* <th>商品</th> */}
          <th>預約日期</th>
          <th>歸還日期</th>
          <th>天數</th>
          <th>總金額</th>
          <th>訂單狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {uniqueTradeItems.map((tradeItem) => {
          if (filterState(tradeItem.state)) {
            // const orderStatus = getOrderStatus(tradeItem.state);
            const rentTotal = tradeItems
              .filter((item) => item.tradeitemId === tradeItem.tradeitemId)
              .reduce((total, item) => total + item.rent, 0);
            const depositTotal = tradeItems
              .filter((item) => item.tradeitemId === tradeItem.tradeitemId)
              .reduce((total, item) => total + item.deposit, 0);
            return (
              <tr
                id="trtd"
                key={tradeItem.tradeitemId}
                title={`內有 ${tradeItems.filter((item) => item.tradeitemId === tradeItem.tradeitemId).length} 項商品`}
              >
                <td>{tradeItem.tradeitemId}</td>
                {/* <td>{limitProductName(tradeItem.productName)}</td> */}
                <td>{new Date(tradeItem.rentStart).toLocaleDateString()}</td>
                <td>{new Date(tradeItem.rentEnd).toLocaleDateString()}</td>
                <td>{calculateDays(tradeItem.rentStart, tradeItem.rentEnd)}</td>
                <td>{calculateDays(tradeItem.rentStart, tradeItem.rentEnd) * rentTotal + depositTotal}</td>
                {/* <td><Orderstate state={tradeItem.state} /></td> */}
                <td>{orderStatusMapping[tradeItem.state]}</td>
                <td>
                  <button id='morebtn' onClick={() => handleDetail(tradeItem.tradeitemId)}>詳細</button>
                </td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
};

export default Ordertable;