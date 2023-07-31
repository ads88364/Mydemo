import React, { useState } from 'react';
import './productLeft.scss';
function ProductLeft({ onfiltereSubmit }) {
  const [Lprice, setLprice] = useState(0);
  const [Hprice, setHprice] = useState(0);
  const [retalcheck, setRetalcheck] = useState(false);
  const [retalcheck1, setRetalcheck1] = useState(false);
  // const [seven, setSeven] = useState(false);
  // const [OK, setOK] = useState(false);
  // const [Home, setHome] = useState(false);
  // const [Home1, setHome1] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const filter = {
      Lprice: Lprice,
      Hprice: Hprice,
      rentalStatus: retalcheck ? '出租中' : '',
      rentalStatus1: retalcheck1 ? '未出租' : ''
      // shippingMethod: seven ? '7-11' : '',
      // shippingMethod1: OK ? 'OK超商' : '',
      // shippingMethod2: Home ? '宅配' : '',
      // shippingMethod3: Home1 ? '店到店' : '',
    };

    onfiltereSubmit(filter);
  };

  // const handleClearFilters = (e) => {
  //   e.preventDefault();
  //   setLprice(0);
  //   setHprice(0);
  //   setRetalcheck(false);
  //   setRetalcheck1(false);
  //   // setSeven(false);
  //   // setOK(false);
  //   // setHome(false);
  //   // setHome1(false);
  // };

  return (
    <div id='filter' >
      <div className="filterMenu">
        <form action="" onSubmit={handleFormSubmit}>
          <div className="filter-title">篩選</div>
          <div className="filter-body">
            <div className="filter-group">
              <p>金額：</p>
              <div className="filter-option">
                <div>
                  <input
                    className="money"
                    type="text"
                    placeholder="$最低"
                    onChange={(e) => {
                      setLprice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="filter-option">
                <div>
                  <input
                    className="money"
                    type="text"
                    placeholder="$最高"
                    onChange={(e) => {
                      setHprice(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="filter-group">
              <p>狀態：</p>
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="rental-checkbox"
                  checked={retalcheck}
                  onChange={(e) => {
                    setRetalcheck(e.target.checked);
                  }}
                />
                <label htmlFor="rental-checkbox">出租中</label>
              </div>
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="nottuzu"
                  checked={retalcheck1}
                  onChange={(e) => {
                    setRetalcheck1(e.target.checked);
                  }}
                />
                <label htmlFor="nottuzu">未出租</label>
              </div>
            </div>
            {/* <div className="filter-group">
              <p>運送方式</p>
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="7-11"
                  checked={seven}
                  onChange={(e) => {
                    setSeven(e.target.checked);
                  }}
                />
                <label htmlFor="7-11">7-11</label>
              </div>
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="okmarket"
                  checked={OK}
                  onChange={(e) => {
                    setOK(e.target.checked);
                  }}
                />
                <label htmlFor="okmarket">OK超商</label>
              </div>
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="delivery"
                  checked={Home}
                  onChange={(e) => {
                    setHome(e.target.checked);
                  }}
                />
                <label htmlFor="delivery">宅配/快遞</label>
              </div>
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="delivery"
                  checked={Home1}
                  onChange={(e) => {
                    setHome1(e.target.checked);
                  }}
                />
                <label htmlFor="delivery">店到店</label>
              </div>
            </div> */}
          </div>
          <div className="filter-footer">
            {/* <button onClick={handleClearFilters}>清空所有條件</button> */}
            <button type="submit">確認</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductLeft;
