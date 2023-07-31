import React, { useRef, useEffect } from 'react';
import "./outdoor2.css"
import { Link } from 'react-router-dom';

function Outdoor2() {
    const od2AmiRL = useRef(null);
    const od2AmiRight = useRef(null);
    const od2AmiLeft = useRef(null);


    useEffect(() => {

        od2AmiLeft.current.addEventListener('mouseenter', (e) => {
            od2AmiRL.current.classList.add('hover-right')
            // console.log("AAA")
        })
        od2AmiLeft.current.addEventListener('mouseleave', (e) => {
            od2AmiRL.current.classList.remove('hover-right')
            // console.log("AAA By")
        });

        od2AmiRight.current.addEventListener('mouseenter', (e) => {
            od2AmiRL.current.classList.add('hover-left')
            // console.log("BBB")
        })
        od2AmiRight.current.addEventListener('mouseleave', (e) => {
            od2AmiRL.current.classList.remove('hover-left')
            // console.log("BBB By")
        });

    });



    return (
        <>
            {/* 主頁畫面2 出租/租借 */}
            <div className="outdoor2 blur" id='outdoor2pag' ref={od2AmiRL}>

                <div className="outdoor2box1"></div>

                <div className="split left" ref={od2AmiRight}>
                    <h1>出租商品</h1>
                    {localStorage.getItem("userInfo")?( <Link to="/up" className="btn-100">explore</Link>):( <Link to="/login" className="btn-100">explore</Link>)}
                   
                    {/* <p>與他人分享你的愛好,同時賺取額外收入</p> */}
                </div>

                <div className="split right" ref={od2AmiLeft}>
                    <h1>租借商品</h1>
                    <Link to="/product" className="btn-100">explore</Link>
                
                    {/* <p>與他人分享你的愛好,同時賺取額外收入</p> */}
                </div>
            </div>
        </>
    )
};

export default Outdoor2;