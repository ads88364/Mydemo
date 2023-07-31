import React, { useEffect, useState } from 'react';
import RatingStar from './ratingstar';
import axios from 'axios'
import './ratingInput.scss';

import AlertBox from '../product-item/AlertBox';

function RatingInput(props) {
  const { productId } = props
  const [ratingswitch, setRatingswitch] = useState([])//按鈕開關
  const [alertstate, setalerstate] = useState(0)//彈出框
  const [openclose, setopenclose] = useState(0)//輸入框開關
  const [rating, setRating] = useState(0);
  const [rantingtext, setrantingtext] = useState('')//輸入的內容
  const buyer = localStorage.getItem('userInfo').slice(1, -1)

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const openrating = (state) => {
    if (state === 0) {
      setRating(0)
    }
    setopenclose(state)
  }


  // console.log(ratingswitch)

  useEffect(() => {
    const fetchData = async () => {
      const selectRating = { productId: productId, buyer: buyer };
      const res = await axios.post('http://localhost:8000/api/rating/select', { selectRating });
      setRatingswitch(res.data);
    };

    fetchData();
  }, [buyer, productId])

  const insertrating = async () => {
    const ratingdata = {
      productId: productId,
      rating: rating,
      Comment: rantingtext,
      buyer: buyer
    }
    if (ratingdata.rating > 0 && ratingdata.Comment) {
      await axios.post('http://localhost:8000/api/rating', { ratingdata })
      setalerstate(1)
      setopenclose(0)
      setRatingswitch([{ productId: productId, buyer: buyer }]);
      setTimeout(() => { setalerstate(0) }, 1500)
    } else {
      setalerstate(2)
      setTimeout(() => { setalerstate(0) }, 1500)
    }
  }

  return (
    <>
      <div className="rating-btn">
        {ratingswitch.length > 0 ? (<p>已給評</p>) : (<button onClick={() => { openrating(1) }}>請給評</button>)}
      </div>
      {openclose === 1 ? (
        <div className='ratinginput'>
          <div className='RI-title'>
            <span>給此商品的評論</span>
            <button onClick={() => { openrating(0) }}>X</button>
          </div>
          <div>
            <RatingStar onRatingChange={handleRatingChange} />
          </div>

          <div className='RI-text'>
            <textarea
              maxLength={30}
              type="text"
              placeholder='請輸入給商品的評價(限30字內)'
              onChange={(e) => (setrantingtext(e.target.value))}
            />
          </div>

          <div className='RI-bottom'>
            <button onClick={() => { openrating(0) }}>取消</button>
            <button onClick={insertrating}>送出</button>
          </div>
        </div>
      ) : null}
      {alertstate === 1 && <AlertBox message="給評成功" type="success" />}
      {alertstate === 2 && <AlertBox message="請輸入評論並且評分" type="error" />}
    </>
  );
}

export default RatingInput;