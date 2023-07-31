import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './buttonCard.scss';
import axios from 'axios';
import ProductCard from '../product/productCard';

export default function ButtonCard(props) {
  const [products, setProducts] = useState([]);
  const { productCategoryChild, productId } = props

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`http://localhost:8000/api/productsCategory?param1=${productCategoryChild}&param2=${productId}`);
      const data = response.data;
      setProducts(data);
    };
    fetchProducts();
  }, [productCategoryChild, productId]);

  return (
    <>
      <div id='BCard'>
        <div className='B-title'>相關推薦</div>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper3"
        >
          <SwiperSlide>
            {products.map((product) => (
              <Link className='col-md-3' target="_blank" to={`/productItem/${product.productId}`} key={product.productId}>
                <ProductCard product={product} />
              </Link>
            ))}
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
