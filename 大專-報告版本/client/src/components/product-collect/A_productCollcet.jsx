import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './A_productCollcet.scss'

import ProductCard from '../product/productCard';
// import RatingInput from '../product-rating/ratingInput';


function A_product_Collcet() {
  const account = localStorage.getItem('userInfo').slice(1, -1)
  const [ProductCollect, setProductCollect] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8000/api/collect/${account}`)
      const data = res.data;
      setProductCollect(data)
    }
    fetchData()
  }, [account])

  const productDelete = async (id) => {
    await axios.post('http://localhost:8000/api/productDelete', [id, account])
    window.location.reload()
  }

  return (<>
    <div className='container' id='P-collect-page' >
      {ProductCollect.length > 0 ? (
        <>
          <div className="breadcrumb">
            <div>
              <Link to="/">海爾戶外</Link> &gt;
              <Link to="/">
                {account}
              </Link>{' '}
              &gt;
              <Link to="/">
                收藏
              </Link>
            </div>
            <div>
              <Link to="/product">
                <span className="back-link-icon"> &lt; </span> 返回商品一覽
              </Link>
            </div>
          </div>
          {/* <ProductTop /> */}
          <div className='psg-title'>【 我的收藏 】</div>
          <div className='row'>
            {ProductCollect.map((product) => (
              <div key={product.productId} className="col-md-4 pd-link">
                <button className='D-btn' onClick={() => { productDelete(product.productId) }}>刪除 <i>&darr;</i> </button>
                {/* <RatingInput productId={product.productId} /> */}
                <Link target="_blank" to={`/productItem/${product.productId}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="breadcrumb">
            <div>
              <Link to="/">海爾戶外</Link> &gt;
              <Link to="/">
                {account}
              </Link>{' '}
              &gt;
              <Link to="/">
                收藏
              </Link>
            </div>
            <div>
              <Link to="/product">
                <span className="back-link-icon"> &lt; </span> 返回商品一覽
              </Link>
            </div>
          </div>
          <div className='psg-title'>【 我的收藏 】</div>
          <div className='no-collcet'>
            <h1>....沒有任何收藏....</h1>
            <Link to="/product">去租借頁面逛逛...</Link>
          </div>
        </>
      )}
    </div>
  </>
  );
}

export default A_product_Collcet;