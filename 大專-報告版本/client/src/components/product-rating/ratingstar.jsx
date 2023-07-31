import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa'
import './ratingstar.scss'

function RatingStar({ onRatingChange }) {
  const [rating,setRating] = useState(null);
  const [hover,sethover] = useState(null)

  return ( 
    <>
      <div className='ratingStar'>
        {[...Array(5)].map((star,index) =>{
          const currentRating = index+1;
          return(
            <label key={currentRating}>
              <input 
                type="radio"
                name='rating'
                value={currentRating}
                onClick={() => {
                  setRating(currentRating)
                  onRatingChange(currentRating)
                }} 
              />
            <FaStar 
              className='star'
              size={50}
              color={currentRating <= (hover || rating)? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => sethover(currentRating)}
              onMouseLeave={() => sethover(null)}
            />
            </label>
          )

        })}
      </div>
    </> 
  );
}

export default RatingStar;