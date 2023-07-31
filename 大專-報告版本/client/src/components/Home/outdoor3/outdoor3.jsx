import React from 'react';
import "./outdoor3.css";
import ChangeImg from './carousel';
import { Link } from 'react-router-dom';

function Outdoor3() {
    
    return (
        <>
        
            {/* 主頁畫面3 當季熱門活動 */}
            <div className="outdoor3">
                <div className="outdoor3box4">
                    <div className="outdoor3box1">
                        <p>當季熱門活動</p>
                    </div>
                    <div className="outdoor3box2">
                        
                        <div className="hotActivity A1">
                            <img src="http://localhost:8000/img/home/hotActivity/climbing%E7%9B%B4%E7%9A%84.jpg" alt="圖1" />
                            <div className="hotActivityWord">
                                <Link to="/" className="B1">MORE</Link>
                            </div>
                        </div>
                        <div className="hotActivity A2">
                            <img src="http://localhost:8000/img/home/hotActivity/bicycle.jpg" alt="圖2" />
                            <div className="hotActivityWord">
                                <Link to="/" className="B1">MORE</Link>
                            </div>
                        </div>
                        <div className="hotActivity A3">
                            <img src="http://localhost:8000/img/home/hotActivity/surf2.jpg" alt="圖3" />
                            <div className="hotActivityWord">
                                <Link to="/" className="B1">MORE</Link>
                            </div>
                        </div>
                        <div className="hotActivity A4">
                            <img src="http://localhost:8000/img/home/hotActivity/fishing3.jpg" alt='圖4' />
                            <div className="hotActivityWord">
                                <Link to="/" className="B1">MORE</Link>
                            </div>
                        </div>
                        <div className="hotActivity A5">
                            <img src="http://localhost:8000/img/home/hotActivity/photography%E7%9B%B4%E5%BE%97.jpg" alt="圖5" />
                            <div className="hotActivityWord">
                                <Link to="/" className="B1">MORE</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="outdoor3box3">
                    <div className="outdoor3box3-a">
                        <p>熱門出租</p>
                        <Link to="/" className="btn-99">潛水服</Link>
                        <Link to="/" className="btn-99">衝浪板</Link>
                        <Link to="/" className="btn-99">滑雪板</Link>
                    </div>
                    {/* Slideshow container */}

                    <div className="slideshow-container">
                    <ChangeImg/>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Outdoor3;