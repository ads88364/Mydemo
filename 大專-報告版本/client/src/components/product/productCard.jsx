import React from 'react';
import './productCard.scss';
// import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
  const { product } = props;
  // const history = useNavigate();

  // const handleCardClick = () => {
  //   history(`/productItem/${product.productId}`); // 導航到帶有 productId 參數的 product-item 路由
  // };


  return (
    <>
      <div
        className=" rental-goods-group list-item"
        // onClick={handleCardClick}
        title={product.productName}
      >
        <div className="card">
          <div className="card-img">
            <img
              src={`http://localhost:8000/img/${product.imageSrc}`}
              className="card-img-top"
              alt={product.productName}
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">{product.productName}</h4>{' '}
            <div className="card-text2">
              <span>{product.cityCounty}</span>
              <span>{product.area}</span>
              {product.rentalStatus === '出租中' ? (
                <span className="rentalstate2" />
              ) : (
                <span className="rentalstate1" />
              )}
              <span>{product.rentalStatus}</span>
            </div>
            <p className="card-text">
              {product.AvgRating && (
                <span className='spanout'>
                  <span>★</span>
                  <span>{product.AvgRating}</span>
                </span>)}
              ${product.rent}/日
            </p>{' '}
            {/* {product.AvgRating && (<span><span>★</span>{product.AvgRating}</span>)} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
