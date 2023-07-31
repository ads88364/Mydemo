import React from 'react';
import { Link } from 'react-router-dom';
import './productSellerCard.scss';

import { ChatButtom } from '../cart/socket/socket';

function ProductSellerCard(props) {
  const { productSeller } = props
  return (
    <>
      <div className="product-body">
        <div className="pd-flex">
          <div className="pd-body-l">
            <img
              src={productSeller.profilePictureSrc ? (`http://localhost:8000/img/${productSeller.profilePictureSrc}`) : (`http://localhost:8000/img/noface/cafc10742b9b77da.jpg`)}
              alt=""
            />
          </div>
          <div className="pd-body-m">
            <div className='pd-body-m-title'>
              <p>{productSeller.nickname}</p>
              <p>{productSeller.account}</p>
            </div>
            <div >
              <p>{productSeller.email}</p>
              {/* <button>
                聊聊<i className="bi bi-chat-fill"> </i>
              </button> */}
              <div className="pd-body-btn">

                <Link target='_blank' to={`/productSeller/${productSeller.account}`}>
                  出租商品一覽
                  <i className="bi bi-house-fill" />
                </Link>
                <ChatButtom chatInfo={productSeller.account} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSellerCard;
