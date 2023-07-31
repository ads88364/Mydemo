import React, { useEffect, useRef } from 'react';
import "./outdoor.css"
import "./outdoor.scss"
// import { Link } from 'react-router-dom';
import { HashLink as ScrollLink } from 'react-router-hash-link';

function Outdoor() {
    const odAmiCycle = useRef(null);
    const odAmiArrow = useRef(null);

    useEffect(() => {
        odAmiCycle.current.addEventListener('mouseenter', (e) => {
            // 圓形動畫
            odAmiCycle.current.classList.add('menu2-animation')
            odAmiCycle.current.classList.remove('menu3-animation')
            // 箭頭痛畫
            odAmiArrow.current.classList.add('menu4-animation')
            odAmiArrow.current.classList.remove('menu5-animation')
        })
        odAmiCycle.current.addEventListener('mouseleave', (e) => {
            // 圓形動畫
            odAmiCycle.current.classList.remove('menu2-animation')
            odAmiCycle.current.classList.add('menu3-animation')
            // 箭頭動畫
            odAmiArrow.current.classList.remove('menu4-animation')
            odAmiArrow.current.classList.add('menu5-animation')
        })
    })


    return (
        <>
            {/* 主頁畫面 */}
            <div className="outdoor">
                <img src="http://localhost:8000/img/home/homepage/111.jpg" alt='海爾戶外' />
                <img src="http://localhost:8000/img/home/homepage/222.png" alt='海爾戶外' />
                <div className="outdoor-word">
                    <svg width="1000px" height="" viewBox="0 0 900 500">
                        <text
                            fill="none"
                            stroke="#fff"
                            x="0"
                            y="140"
                            stroke-width="8"
                            font-size="120"
                            font-family="'Raleway', sans-serif"
                            font-weight="800">
                            <tspan x="0" dy="0" font-size="120">Hire Outdoor</tspan>
                            <tspan x="20" dy="1.3em" font-size="50">海爾戶外</tspan>
                        </text>
                        {/* <path class="underline" data-name="Path 1"
                            d="M107,318.31...省略"
                            transform="translate(60 -188.421)"
                            fill="none" stroke="#00BFFF" stroke-width="3" /> */}
                    </svg>
                </div>

                <ScrollLink to="#outdoor2pag" className="outdoor-btn">
                    <img src="http://localhost:8000/img/home/hirecircle.png" className="hireClass" id="hireId" alt='戶外2' />
                    <div className="btn-div2class" id="btn-div2" ref={odAmiCycle}></div>
                    <p className="btn-pClass" id="btn-p" ref={odAmiArrow}>↓</p>
                </ScrollLink>

                {/* <div className='rqu'>
                    {localStorage.getItem("userInfo") ? (<Link to="/Returnqu">問題回報</Link>) : (<Link to="/login">問題回報</Link>)}
                    <br />
                    {localStorage.getItem("userInfo") ? (<Link to="/Backstage">後台</Link>) : (<Link to="/login">後台</Link>)}
                </div> */}
                
            </div>
        </>
    );
}

export default Outdoor;