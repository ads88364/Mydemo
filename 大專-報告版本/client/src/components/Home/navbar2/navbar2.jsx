import React, { useState, useEffect } from 'react';
import style from "./navbar2.module.css"
import { Link } from 'react-router-dom';
import NavbarOut from '../navbarOut_IN/navbarOut';
import NavbarIN from '../navbarOut_IN/navbarIN';


function Navbar2() {
    const [username, setusername] = useState('');

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');

        setusername(storedUserInfo);
    }, []);


    return (
        <>
            <header className={style.header}>
                {/* LOGO */}
                <div className={style["header-logo"]}>
                    {/* LOGO超連結? */}
                    <Link to="/">
                        {/* LOGO 用圖片還是文字? */}
                        <img className={style.logoImg} src="http://localhost:8000/img/home/Logo黑.png" alt='黑' />
                    </Link>
                </div>
                {/* 右邊按鈕/icon */}
                <div className={style["header-button-icon"]}>
                    {/* 按鈕 */}
                    <ul className={style["header-button"]}>
                    <li><Link className={style["btn-98"]} to="/product">租借列表</Link></li>
                        {localStorage.getItem("userInfo")?(<li><Link className={style["btn-98"]} to="/up">快速上架</Link></li>):(<li><Link className={style["btn-98"]} to="/login">快速上架</Link></li>)}
                        <li><Link className={style["btn-98"]} to="/aboutus">關於我們</Link></li>
                    </ul>
                    {/* icon */}
                    {username ? <NavbarIN /> : <NavbarOut />}
                    {/* <NavbarOut/> */}
                    {/* <NavbarIN/> */}

                </div>
            </header>

        </>
    );
}

export default Navbar2;