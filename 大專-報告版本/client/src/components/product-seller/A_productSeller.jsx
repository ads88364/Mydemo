import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './A_productSeller.scss'

import ProductSellerCard from './productSellerCard';
import ProductCard from '../product/productCard';

function A_PRODUCT_SELLER() {
  const { account } = useParams();
  const [ProductSeller, setProductSeller] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8000/api/Pseller/${account}`)
      const data = res.data;
      setProductSeller(data)
    }
    fetchData()
  }, [account])


  return (<>
    <div className='container' id='P-seller-page' >
      {ProductSeller.length > 0 ? (
        <>
          <div className="breadcrumb">
            <div>
              <Link to="/">海爾戶外</Link> &gt;
              <Link to="/">
                {account}
              </Link>{' '}
              &gt;
              <Link to="/">
                全部商品
              </Link>
            </div>
            <div>
              <Link to="/product">
                <span className="back-link-icon"> &lt; </span> 返回商品一覽
              </Link>
            </div>
          </div>
          {/* <ProductTop /> */}
          <div className='psg-title'>【 出租人資訊 】</div>
          <ProductSellerCard key={ProductSeller[0].account} productSeller={ProductSeller[0]} />
          {ProductSeller[0].productId !== null ? (
            <div className='row'>
              {ProductSeller.map((product) => (
                <Link key={product.productId} target="_blank" className="col-md-4 pd-link" to={`/productItem/${product.productId}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          ) : (<div className='notpd'>未有出租商品</div>)

          }

        </>
      ) : null}
    </div>
  </>
  );
}

export default A_PRODUCT_SELLER;