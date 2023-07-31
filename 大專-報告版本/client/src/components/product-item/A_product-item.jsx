import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HashLink as ScrollLink } from 'react-router-hash-link';
import { DatePicker, Space } from 'antd';
import productcategorymap from '../../data/item2.json';
import './A_product-item.scss'
import axios from 'axios';

import ProductCarousel from './ProductCarousel';
import ProductSellerCard from '../product-seller/productSellerCard';
import ButtonCard from './buttonCard';
import AlertBox from './AlertBox';
import ProductRating from '../product-rating/productRating';


function A_Product_Item() {
  const [productitem, setProductItem] = useState('');
  const [productRating, setProductRating] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [productSeller, setproductSeller] = useState('');
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  useEffect(() => {
    //產品資訊
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8000/api/productItem/${id}`);
      const data = await response.data;
      setProductItem(data);
    };
    fetchData();

    //相關推薦
    const fetchseller = async () => {
      const res = await axios.get(`http://localhost:8000/api/productseller/${id}`);
      const data = await res.data;
      setproductSeller(data);
    };
    fetchseller();

    //評分
    const fetchRating = async () => {
      const res = await axios.get(`http://localhost:8000/api/productRating/${id}`);
      const data = await res.data;
      setProductRating(data);
    };
    fetchRating();

    setTimeout(() => { setIsLoaded(true); }, 600);
  }, [id]);


  //提示框狀態 加入租物車,收藏
  const handleAction = async (state) => {

    if (localStorage.getItem('userInfo')) {
      const accountName = localStorage.getItem('userInfo');
      const account = accountName.slice(1, -1);
      const rentStart = startDate;
      const rentEnd = endDate
      const productId = id;

      //租物車
      if (state === 1 && totalAmount && productitem[0].rentalStatus === '未出租') {
        try {
          const response = await axios.post('http://localhost:8000/api/insertCart', { account, productId, rentStart, rentEnd });
          response ? setShowAlert(1) : console.log('GG');
        } catch (error) {
          error.response ? setShowAlert(4) : console.error('發生錯誤');
        }
      } else if (state === 1) {
        productitem[0].rentalStatus === '出租中' ? setShowAlert(7) : setShowAlert(3)
      }


      //收藏
      if (state === 2) {
        try {
          const response = await axios.post('http://localhost:8000/api/collect', { account, productId });
          response ? setShowAlert(2) : console.log('GG');
        } catch (error) {
          error.response ? setShowAlert(5) : console.error('發生錯誤');
        }
      }

    } else {
      setShowAlert(6);
    }

    setTimeout(() => { setShowAlert(0) }, 1500);
  };






  // 從json檔去配對大分類
  function getMain(subCategory) {
    let mainCategory = '';

    productcategorymap.forEach((main) => {
      if (main.subOptions.find((sub) => sub.value === subCategory)) {
        mainCategory = main.label;
      }
    });

    return mainCategory;
  }

  function getCategoryLabel(category) {
    let label = '';

    productcategorymap.forEach((main) => {
      if (main.value === category) {
        label = main.label;
      }

      main.subOptions.forEach((sub) => {
        if (sub.value === category) {
          label = sub.label;
        }
      });
    });

    return label;
  }



  //日期處裡
  const [totalAmount, setTotalAmount] = useState(0);

  const { RangePicker } = DatePicker;

  const handleRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0];
      setStartDate(startDate)
      const endDate = dates[1];
      setEndDate(endDate)
      const days = endDate.diff(startDate, 'days'); // 使用 moment.js 的 diff 函式計算天數差距
      const rent = productitem[0].rent;
      const deposit = productitem[0].deposit;
      const total = rent * days + deposit;
      setTotalAmount(total);
    }
  };


  //延遲處裡
  const [renderContent, setRenderContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderContent(true);
    }, 300);

    return () => clearTimeout(timer); // 清除計時器
  }, []);




  return renderContent ? (
    <>
      <>
        <div
          className={`container fade-in-container ${isLoaded ? 'fade-in' : ''}`}
        >
          <div className="breadcrumb">
            <div>
              <Link to="/">海爾戶外</Link> &gt;
              <Link to="/">
                {getMain(productitem[0].productCategoryChild)}
              </Link>{' '}
              &gt;
              <Link to="/">
                {getCategoryLabel(productitem[0].productCategoryChild)}
              </Link>
            </div>
            <div>
              <Link to="/product">
                <span className="back-link-icon"> &lt; </span> 返回一覽
              </Link>
            </div>
          </div>
          <div className="product-item">
            <div className="product-item-main">
              <div className="product-item-left">
                <ProductCarousel
                  key={productitem[0].productId}
                  productitem={productitem}
                />
              </div>
              <div className="product-item-right">
                <div className="item-text">
                  <p>{productitem[0].productName}</p>
                  {productitem[0].AvgRating ? (
                    <span className='spanout'>
                      <span>★</span>
                      <span>{productitem[0].AvgRating}</span>
                      <ScrollLink title='商品評論則數' smooth to="#reatigtarget">({productRating.length})</ScrollLink>
                    </span>) : <span className='spanout1'>未有評價... </span>}
                </div>
                <div className="item-text">
                  <div className={productitem[0].rentalStatus === '未出租' ? 'rentalstate1' : 'rentalstate2'}>
                    {productitem[0].rentalStatus}
                  </div>
                </div>
                <div className="item-text">
                  <span>租金 :</span>
                  <span>{productitem[0].rent}/日</span>
                </div>
                <div className="item-text">
                  <span>押金 :</span>
                  <span>{productitem[0].deposit}</span>
                </div>
                {/* <div className="item-text">
                  <span>運送方式 :</span>
                  <span>{productitem[0].shippingMethod}</span>
                </div> */}
                <Space className="item-text" direction="vertical" size={12}>
                  <span>選擇租借時段 :</span>
                  <RangePicker
                    placeholder={['出租日期', '歸還日期']}
                    onChange={handleRangeChange}
                  />
                </Space>

                <div className="item-text">
                  {totalAmount === 0 ? '' : `$${totalAmount}`}
                </div>

                <div className="item-text">
                  <Link onClick={() => handleAction(1)}>
                    <i className="bi bi-cart3"></i> 加入租物車
                  </Link>
                </div>
                <div className="item-text">
                  <Link onClick={() => handleAction(2)}>
                    <i className="bi bi-heart"></i> 加入收藏
                  </Link>
                </div>
              </div>
            </div>

            {showAlert === 1 && <AlertBox message="&#x1F6D2;加入租物車成功" type="success" />}
            {showAlert === 2 && <AlertBox message="&#x2665;收藏成功" type="success" />}
            {showAlert === 3 && <AlertBox message="請先選擇日期!!!" type="error" />}
            {showAlert === 4 && <AlertBox message="此物品已在租物車中!!!" type="not" />}
            {showAlert === 5 && <AlertBox message="此物品已在收藏中!!!" type="not" />}
            {showAlert === 6 && <AlertBox message="請先登入" type="warning" />}
            {showAlert === 7 && <AlertBox message="此商品正在被租借中..." type="warning" />}

            <ProductSellerCard
              key={productSeller[0].account}
              productSeller={productSeller[0]}
            />
            <div className="product-text">
              <p>商品詳細</p>
              <div className="p-body">
                <table>
                  <tbody>
                    <tr>
                      <td>商品分類</td>
                      <td>
                        海爾戶外 &gt;{' '}
                        {getMain(productitem[0].productCategoryChild)} &gt;{' '}
                        {getCategoryLabel(productitem[0].productCategoryChild)}
                      </td>
                    </tr>
                    <tr>
                      <td>地點</td>
                      <td>{`${productitem[0].cityCounty} ${productitem[0].area}`}</td>
                    </tr>
                    <tr>
                      <td>配件</td>
                      <td>
                        {productitem[0].accessory
                          ? productitem[0].accessory
                          : '沒有配件'}
                      </td>
                    </tr>
                    <tr>
                      <td>商品描述</td>
                      <td>{productitem[0].productDetail}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <p id="reatigtarget">商品評論</p>
              {productRating.length > 0 ? (productRating.map((data) => (
                <ProductRating
                  key={data.Buyer}
                  productRating={data}
                />
              ))) : (<div className='norating'>目前沒有評論...</div>)}
              <hr />


            </div>




            <div></div>
          </div>
          <ButtonCard
            key={productitem[0].productCategoryChild}
            productCategoryChild={productitem[0].productCategoryChild}
            productId={id}
          />
        </div>
      </>
    </>
  ) : null;
}

export default A_Product_Item;
