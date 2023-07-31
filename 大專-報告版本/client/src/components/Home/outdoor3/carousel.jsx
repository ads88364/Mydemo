import React from 'react';
import { Carousel } from 'antd';


const mySlides = {
  width: "80%",
  height: "25vh",
  paddingLeft: "10%"
};
const img = [
  {
    src: 'http://localhost:8000/img/home/returnImage/2/2.jpg',
    alt: 'gg'
  },
  {
    src: 'http://localhost:8000/img/home/returnImage/2/7.jpg',
    alt: 'gg'
  },
  {
    src: 'http://localhost:8000/img/home/returnImage/2/11.jpg',
    alt: 'gg'
  },
  {
    src: 'http://localhost:8000/img/home/returnImage/2/5.jpg',
    alt: 'gg'
  },
  {
    src: 'http://localhost:8000/img/home/returnImage/2/8.jpg',
    alt: 'gg'
  },
  {
    src: 'http://localhost:8000/img/home/returnImage/2/1.jpg',
    alt: 'gg'
  },
  {
    src: 'http://localhost:8000/img/home/returnImage/2/6.jpg',
    alt: 'gg'
  },
  {
    src: 'http://localhost:8000/img/home/returnImage/2/9.jpg',
    alt: 'gg'
  }
]

// style={mySlides}

const ChangeImg = () => (

  <Carousel autoplay>
    {img.map((e) => (
      <div key={e.alt}>
        <img style={mySlides} src={e.src} alt={e.alt} />
      </div>
    ))}
  </Carousel>
);

export default ChangeImg;