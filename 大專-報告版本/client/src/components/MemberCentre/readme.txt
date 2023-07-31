React是一頁式，最後大家的會合在一起，套入各種CSS，所以不可以用標籤命名

================================ 分離SCSS前-order.jsx ================================

import React from 'react';
import miscImage from '../assets/img/misc/wave.jpg';
import Myorder from '../components/MemberCentre/order/myorder';

function Order() {
  const divStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${miscImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '10vh', // 距離網頁頂部的距離
  };

  const textStyle = {
    textAlign: 'center',
    color: '#021434',
    fontSize: '2rem',
    margin: '20px',
  };

  const titleStyle = {
    color: '#0B7597',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '20px',
  };

  return (
    <div style={divStyle}>
      <div>
        <div style={textStyle}>
          <div style={titleStyle}>| 會員中心 |</div>
          <div>訂單追蹤</div>
        </div>
      </div>
      <Myorder />
    </div>
  );
}

export default Order;


================================ 分離SCSS後-order.jsx ================================

import React from 'react';
import miscImage from '../assets/img/misc/wave.jpg';
import Myorder from '../components/MemberCentre/order/myorder';
import './centre.scss'; // 匯入 Order.scss 檔案

function Order() {
  return (
    <div className="bgset">
      <div>
        <div className="text">
          <div className="title">| 會員中心 |</div>
          <div>訂單追蹤</div>
        </div>
      </div>
      <Myorder />
    </div>
  );
}

export default Order;


================================ 我的商品頁，按鈕拆成組件前 ================================

import React, { useState } from 'react';
// import miscImage from '../assets/img/misc/wave.jpg';
import Mycm from '../components/MemberCentre/cmmgmt/mycm';
import Rentalreq from '../components/MemberCentre/cmmgmt/rentalreq';
import Renthistory from '../components/MemberCentre/cmmgmt/renthistory';
import Rentout from '../components/MemberCentre/cmmgmt/rentout';
import './centre.scss'; // 匯入 Order.scss 檔案

function Order() {
  const [displayedComponent, setDisplayedComponent] = useState('Mycm');

  const handleButtonClick = (component) => {
    setDisplayedComponent(component);
  };

  return (
    <div className="bgset">
      <div>
        <div className="text">
          <div className="title">| 會員中心 |</div>
          <div>訂單追蹤</div>
        </div>
        <div className="btnset">
        <button
          onClick={() => handleButtonClick('Mycm')}
          className={displayedComponent === 'Mycm' ? 'active' : ''}
        >
          我的商品
        </button>
        <button
          onClick={() => handleButtonClick('Rentalreq')}
          className={displayedComponent === 'Rentalreq' ? 'active' : ''}
        >
          租借請求
        </button>
        <button
          onClick={() => handleButtonClick('Renthistory')}
          className={displayedComponent === 'Renthistory' ? 'active' : ''}
        >
          出租中
        </button>
        <button
          onClick={() => handleButtonClick('Rentout')}
          className={displayedComponent === 'Rentout' ? 'active' : ''}
        >
          歷史紀錄
        </button>
        </div>
        {displayedComponent === 'Mycm' && <Mycm />}
        {displayedComponent === 'Rentalreq' && <Rentalreq />}
        {displayedComponent === 'Renthistory' && <Renthistory />}
        {displayedComponent === 'Rentout' && <Rentout />}
      
      </div>
    </div>
  );
}

export default Order;





================================ 設定取消按鈕前的myorder ================================

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Myorder() {
  const [tradeitems, setTradeitems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/myorder');
        const tradeitems = response.data.map((tradeitem) => ({
          ...tradeitem,
          rentStart: formatDate(tradeitem.rentStart),
          rentEnd: formatDate(tradeitem.rentEnd),
        }));
        console.log(tradeitems);
        setTradeitems(tradeitems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // 增加fetchData函式的內部定義

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 移除fetchData依賴數組

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const handleCancel = async (tradeitemId) => {
    try {
      await axios.post('http://localhost:8000/api/cancelOrder', { tradeitemId });
      // 在此處執行取消訂單的相關邏輯
      // 例如更新訂單狀態或重新加載資料等
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="order-component">
      <table className="order-table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>商品</th>
            <th>預約日期</th>
            <th>歸還日期</th>
            <th>租金</th>
            <th>押金</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tradeitems.map((tradeitem) => {
            if (tradeitem.state < 3) {
              let action = null;
              if (tradeitem.state === 0) {
                action = (
                  <button id='actbtn' onClick={() => handleCancel(tradeitem.tradeitemId)}>取消</button>
                );
              }
              
              return (
                <tr id="trtd" key={tradeitem.tradeitemId}>
                  <td>{tradeitem.tradeitemId}</td>
                  <td>{tradeitem.productName}</td>
                  <td>{tradeitem.rentStart}</td>
                  <td>{tradeitem.rentEnd}</td>
                  <td>{tradeitem.rent}</td>
                  <td>{tradeitem.deposit}</td>
                  <td>
                    {tradeitem.state === 0
                      ? '等待回應中'
                      : tradeitem.state === 1
                        ? '等待租借中'
                        : tradeitem.state === 2
                          ? '租借中'
                          : tradeitem.state}
                  </td>
                  <td>{action}</td>
                </tr>
              );
            }
            return null; // 不符合條件的資料返回null
          })}
        </tbody>

      </table>
    </div>
  );
}

export default Myorder;




================================ 更新資料庫之前的後端(成功取資料&改資料) ================================

app.get('/api/myorder', function(req, res) {
  const query = 'SELECT tradeitemId, productId, rentStart, rentEnd, state FROM tradeitem';
  coon.query(query, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const productIds = results.map((result) => result.productId);
        const query = 'SELECT productId, productName, rent, deposit FROM product WHERE productId IN (?)';
        coon.query(query, [productIds], function(error, productResults) {
          if (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            const tradeitems = results.map((result) => {
              const product = productResults.find((product) => product.productId === result.productId);
              return {
                tradeitemId: result.tradeitemId,
                productName: product ? product.productName : 'Product not found',
                rent: product ? product.rent : 'Product not found',
                deposit: product ? product.deposit : 'Product not found',
                state: result.state,
                rentStart: result.rentStart,
                rentEnd: result.rentEnd
              };
            });
            res.json(tradeitems);
          }
        });
      } else {
        res.json([]);
      }
    }
  });
});
app.post('/api/cancelOrder', function(req, res) {
  const { tradeitemId } = req.body;
  // 檢查 tradeitemId 的值
  console.log("Received tradeitemId:", tradeitemId);

  const updateQuery = 'UPDATE tradeitem SET state = 4 WHERE tradeitemId = ?';
  coon.query(updateQuery, [tradeitemId], function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Order canceled successfully' });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    }
  });
});





================================ 更新資料庫!!!!! ================================


================================ 一般版本 ================================

沒什麼特別的，但可以正常顯示資料庫內容

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Myorder = () => {
  const [tradeitems, setTradeitems] = useState([]);

  useEffect(() => {
    const fetchTradeitems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/myorder/3x7Y90');
        setTradeitems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTradeitems();
  }, []);

  console.log(tradeitems);

  const getOrderStatus = (state) => {
    if (state === 0) {
      return '等待回應中';
    } else if (state === 1) {
      return '等待租借中';
    } else if (state === 2) {
      return '租借中';
    } else {
      return state;
    }
  };

  return (
    <div className="order-component">
      <table className="order-table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>商品</th>
            <th>預約日期</th>
            <th>歸還日期</th>
            <th>租金</th>
            <th>押金</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tradeitems.map((tradeitem) => {
            if (tradeitem.state < 3) {
              const productName = tradeitem.productName.length > 10
                ? tradeitem.productName.slice(0, 10) + '...'
                : tradeitem.productName;

              const orderStatus = getOrderStatus(tradeitem.state);

              return (
                <tr title={tradeitem.productName} id="trtd" key={tradeitem.tradeitemId}>
                  <td>{tradeitem.tradeitemId}</td>
                  <td>{productName}</td>
                  <td>{new Date(tradeitem.rentStart).toLocaleDateString()}</td>
                  <td>{new Date(tradeitem.rentEnd).toLocaleDateString()}</td>
                  <td>{tradeitem.rent}</td>
                  <td>{tradeitem.deposit}</td>
                  <td>{orderStatus}</td>
                  <td></td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Myorder;





================================ 訂單編號不重複的版本 ================================

只在第一次出現某個特定訂單編號時顯示訂單編號，而在後續訂單編號的記錄中不再顯示訂單編號


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Myorder = () => {
  const [tradeitems, setTradeitems] = useState([]);

  useEffect(() => {
    const fetchTradeitems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/myorder/3x7Y90');
        setTradeitems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTradeitems();
  }, []);

  console.log(tradeitems);

  const processedTradeitems = [];
  const displayedTradeitemIds = [];

  const getOrderStatus = (state) => {
    if (state === 0) {
      return '等待回應中';
    } else if (state === 1) {
      return '等待租借中';
    } else if (state === 2) {
      return '租借中';
    } else {
      return state;
    }
  };

  tradeitems.forEach((tradeitem) => {
    if (tradeitem.state < 3) {
      const productName = tradeitem.productName.length > 10
        ? tradeitem.productName.slice(0, 10) + '...'
        : tradeitem.productName;

      const orderStatus = getOrderStatus(tradeitem.state);

      if (!displayedTradeitemIds.includes(tradeitem.tradeitemId)) {
        processedTradeitems.push({
          ...tradeitem,
          productName,
          orderStatus
        });

        displayedTradeitemIds.push(tradeitem.tradeitemId);
      } else {
        processedTradeitems.push({
          ...tradeitem,
          productName,
          orderStatus,
          tradeitemId: null
        });
      }
    }
  });

  return (
    <div className="order-component">
      <table className="order-table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>商品</th>
            <th>預約日期</th>
            <th>歸還日期</th>
            <th>租金</th>
            <th>押金</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {processedTradeitems.map((tradeitem) => {
            if (tradeitem.state < 3) {
              return (
                <tr title={tradeitem.productName} id="trtd" key={tradeitem.tradeitemId}>
                  <td>{tradeitem.tradeitemId}</td>
                  <td>{tradeitem.productName}</td>
                  <td>{new Date(tradeitem.rentStart).toLocaleDateString()}</td>
                  <td>{new Date(tradeitem.rentEnd).toLocaleDateString()}</td>
                  <td>{tradeitem.rent}</td>
                  <td>{tradeitem.deposit}</td>
                  <td>{tradeitem.orderStatus}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Myorder;

說明
使用了兩個輔助變量：processedTradeitems和displayedTradeitemIds。 
processedTradeitems是一個數組，用於存儲處理後的訂單數據，而displayedTradeitemIds是一個數組，用於跟踪已經顯示過的訂單編號。

在循環處理tradeitems時，檢查當前訂單編號是否已經在displayedTradeitemIds中存在。
如果是第一次出現該訂單編號，則將其添加到processedTradeitems數組中，並將訂單編號添加到displayedTradeitemIds中。
對於後續相同訂單編號的記錄，將其訂單編號設置為null，以避免重複顯示