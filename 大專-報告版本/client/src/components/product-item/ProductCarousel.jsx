import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './ProductCarousel.scss';

export default function ProductCarousel(props) {
  const thumbsSwiper = useRef(null);
  const { productitem } = props;

  return (
    <>
    <div id="PCarousel">
      <Swiper
        style={{
          '--swiper-navigation-color': '#0b749797',
          '--swiper-pagination-color': '#0b749797',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: thumbsSwiper.current }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {productitem.map((img) => (
          <SwiperSlide key={img.imageSrc}>
            <img src={`http://localhost:8000/img/${img.imageSrc}`} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => (thumbsSwiper.current = swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        id="p-cau"
      >
        {productitem.map((img) => (
          <SwiperSlide key={img.imageSrc}>
            <img src={`http://localhost:8000/img/${img.imageSrc}`} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
}
