import React from 'react';
// import { Link } from 'react-router-dom';
import './AlertBox.scss';
const AlertBox = ({ message, type }) => {
  return (
    <div className={`alert-box ${type}`}>
      <p className="message">{message}</p>
      {/* {message === "請先登入" ? <Link to='/login'>去登入</Link> : null} */}
      {/* <button className="close-button" onClick={handleClose}>
        X
      </button> */}
    </div>
  );
};

export default AlertBox;
