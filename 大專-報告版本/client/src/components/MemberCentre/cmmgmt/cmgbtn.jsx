// ButtonSection.js
import React from 'react';
import Mycm from './cmgpage/mycm';
import Rentalreq from './cmgpage/rentalreq';
import Rentout from './cmgpage/rentout';
import Renthistory from './cmgpage/renthistory';

const Cmgbtn = ({ displayedComponent, handleButtonClick }) => {
  return (
    <div>
      <div className="btnset">
        <button id='mainbtn' onClick={() => handleButtonClick('Mycm')} className={displayedComponent === 'Mycm' ? 'active' : ''}>
          我的商品
        </button>
        <button id='mainbtn' onClick={() => handleButtonClick('Rentalreq')} className={displayedComponent === 'Rentalreq' ? 'active' : ''}>
          租借請求
        </button>
        <button id='mainbtn' onClick={() => handleButtonClick('Rentout')} className={displayedComponent === 'Rentout' ? 'active' : ''}>
          出租中
        </button>
        <button id='mainbtn' onClick={() => handleButtonClick('Renthistory')} className={displayedComponent === 'Renthistory' ? 'active' : ''}>
          歷史紀錄
        </button>
      </div>
      {displayedComponent === 'Mycm' && <Mycm />}
      {displayedComponent === 'Rentalreq' && <Rentalreq />}
      {displayedComponent === 'Rentout' && <Rentout />}
      {displayedComponent === 'Renthistory' && <Renthistory />}
    </div>
  );
};

export default Cmgbtn;