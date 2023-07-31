import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ALLproduct.scss';


import ProductTop from './productTop';
import ProductLeft from './productLeft';
import ProductCard from './productCard';
import ProductSort from './productSort';
// import Navbar2 from '../components/Home/navbar2/navbar2';
// import Footer from '../components/Home/footer/footer';

function AllProduct() {
  const [products, setProducts] = useState([]); //API
  const [sortMethod, setSortMethod] = useState(null); //排序
  const [sortDirection, setSortDirection] = useState('up'); //預設排序

  //取資料庫資料
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8000/api/products');
      const data = response.data;
      setProducts(data);
    };
    fetchProducts();
  }, []);



  //排序方法
  const handleSort = (method) => {
    if (method === sortMethod) {
      setSortDirection((sortDirection) =>
        sortDirection === 'up' ? 'down' : 'up'
      );
    } else {
      setSortMethod(method);
      setSortDirection('up');
    }
  };

  useEffect(() => {
    const sortingFunction = (a, b) => (sortDirection === 'up' ? a - b : b - a);

    const sortProducts = () => {
      if (sortMethod === 'rent') {
        setProducts((prevProducts) => [
          ...prevProducts.sort((a, b) => sortingFunction(a.rent, b.rent)),
        ]);
      } else if (sortMethod === 'latest') {
        setProducts((prevProducts) => [
          ...prevProducts.sort((a, b) => new Date(b.createTime) - new Date(a.createTime)),
        ]);
      } else if (sortMethod === 'rating') {
        setProducts((prevProducts) => [...prevProducts.sort((a, b) => b.AvgRating - a.AvgRating)
        ]);
      }
    };

    sortProducts();
  }, [sortMethod, sortDirection]);



  //搜尋
  const [searchParams, setSearchParams] = useState({}); // 搜尋狀態
  const [filtere, setfiltere] = useState({}); //篩選
  const [filteredProducts, setFilteredProducts] = useState([]); // 過濾產品
  const handleSearchSubmit = (params) => {
    setSearchParams(params);
  };
  const handlefiltere = (filteres) => {
    setfiltere(filteres);
  };

  useEffect(() => {
    const filterProducts = () => {
      let filteredProducts = [...products];

      //金額過濾
      if (filtere.Lprice && filtere.Hprice) {
        filteredProducts = filteredProducts.filter((product) => {
          return (
            product.rent >= filtere.Lprice && product.rent <= filtere.Hprice
          );
        });
      }

      //出租狀態過濾
      if (filtere.rentalStatus || filtere.rentalStatus1) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.rentalStatus === filtere.rentalStatus ||
            product.rentalStatus === filtere.rentalStatus1
        );
      }

      //關鍵字過濾
      if (searchParams.productName) {
        filteredProducts = filteredProducts.filter((product) =>
          product.productName.includes(searchParams.productName)
        );
      }

      //類別區域過濾
      const types = [
        'cityCounty',
        'area',
        'productCategoryID',
        'productCategoryChild',
      ];
      types.forEach((type) => {
        if (searchParams[type]) {
          filteredProducts = filteredProducts.filter(
            (product) => product[type] === searchParams[type]
          );
        }
      });

      setFilteredProducts(filteredProducts);
    };

    filterProducts();
  }, [searchParams, products, filtere]);



  //分頁
  const [currentPage, setCurrentPage] = useState(1); // 當前頁數

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 根據當前頁數來計算需要顯示的產品卡片
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      {/* <Navbar2/> */}
      <ProductTop onSearchSubmit={handleSearchSubmit} />
      <div className="container">
        <div className="product">
          <div className="rental">
            <ProductLeft onfiltereSubmit={handlefiltere} />
            <ProductSort onSort={handleSort} />
            <div className="rental-body">
              <div className="row rental-goods" id="list-wrapper">
                {displayedProducts.map((product) => (
                  <Link key={product.productId} target="_blank" className="col-md-4 pd-link" to={`/productItem/${product.productId}`}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
              <Pagination
                defaultCurrent={currentPage}
                total={filteredProducts.length}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default AllProduct;
