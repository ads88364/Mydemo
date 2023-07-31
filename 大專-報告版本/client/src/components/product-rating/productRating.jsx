import React from 'react';
import { Link } from 'react-router-dom';
import './productRating.scss'

const ProductRating = (props) => {
  const { productRating } = props;

  const getRatingStars = (rating) => {
    const star = '★';
    const emptyStar = '☆';
    return star.repeat(rating) + emptyStar.repeat(5 - rating);
  };

  const datePart = productRating.RatingDate.split('T')[0];

  // 最終的日期格式（只包含年月日）



  return (
    <>

      <hr />
      <div className="rating-comment">
        <div className="buyer-info">
          <div className="buyer-image">
            <img src={productRating.profilePictureSrc?(`http://localhost:8000/img/${productRating.profilePictureSrc}`):(`http://localhost:8000/img/noface/cafc10742b9b77da.jpg`)} alt="Buyer" />
          </div>
          <Link target='_blank' to={`/productSeller/${productRating.Buyer}`} className="buyer-id">
            {productRating.Buyer}
          </Link>
        </div>
        <div className="rating">
          {getRatingStars(productRating.Rating)}
        </div>
        <div className="comment">
          <p>{productRating.Comment}</p>
          <p className="rating-date">{datePart}</p>
        </div>
      </div>
    </>
  );
};

export default ProductRating;
