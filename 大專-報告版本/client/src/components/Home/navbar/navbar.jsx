import React, { useRef, useEffect } from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
// 引入 Font Awesome icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 引入個別 icon
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
    const headerBGC = useRef(null)
    
    useEffect(() => {
        window.addEventListener( 'scroll',(e) => {
            if (window.scrollY>0) {
                headerBGC.current.classList.add('changeBGColor')
            }else{
                headerBGC.current.classList.remove('changeBGColor') 
            }

        })
    })


    return (
        <>
            {/* 標題列 */}
            <header className="header" ref={headerBGC}>
                {/* LOGO */}
                <div className="header-logo">
                    {/* LOGO超連結 */}
                    <Link className="headerLogoImg" to="/">
                        {/* 白 */}
                        <img src="http://localhost:8000/img/home/Logo%E7%99%BD.png" alt='黑' />    
                        {/* 黑 */}
                        <img src="http://localhost:8000/img/home/Logo%E9%BB%91.png" alt='白' />    
                    </Link>
                </div>
                {/* 右邊按鈕/icon */}
                <div className="header-button-icon">
                    {/* 按鈕 */}
                    <ul className="header-button">
                        <li><Link button className="btn-98"  to="/">租借列表</Link></li>
                        <li><Link button className="btn-98"  to="/">快速上架</Link></li>
                        <li><Link button className="btn-98"  to="/">關於我們</Link></li>
                    </ul>
                    {/* icon */}
                    <ul className="header-icon">
                        <li><Link to="/" className="iconMove" ><FontAwesomeIcon icon={faHeart} className="icon"/></Link></li>
                        <li><Link to="/" className="iconMove" ><FontAwesomeIcon icon={faCartShopping} className="icon"/></Link></li>
                        <li>
                            <Link to="/" className="iconMove" ><FontAwesomeIcon icon={faCircleUser} className="icon"/></Link>
                            <ul className="drop-menu limenu-2">
                                <li><Link to="/" className="iconList">會員登入</Link></li>
                                <li><Link to="/" className="iconList">會員註冊</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>

        </>
    )
}

export default Navbar;