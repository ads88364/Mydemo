import React from 'react';
import style from "./navbarOut_IN.module.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';


function NavbarIN() {
    const account = localStorage.getItem('userInfo').slice(1, -1)
    const loginout = () => {
        localStorage.clear()
        setTimeout(() => {
            window.location.href='/';
        }, 100)
    }
    return (

        <>
            <ul className={style["header-icon"]}>
                <li><Link to={`/productCollect/${account}`} className={style.iconMove}><FontAwesomeIcon icon={faHeart} className="icon" /></Link></li>
                <li><Link to="/cart" className={style.iconMove}><FontAwesomeIcon icon={faCartShopping} className="icon" /></Link></li>
                <li>
                    <Link to="/" className={style.iconMove}><FontAwesomeIcon icon={faCircleUser} className="icon" /></Link>
                    <ul className={`${style["drop-menu"]} ${style["limenu-2"]}`}>
                        <li><Link to="/order">訂單追蹤</Link></li>
                        <li><Link to="/cmmgmt">商品管理</Link></li>
                        <li><Link to="/Member">個人資料</Link></li>
                        <li><Link onClick={loginout} to="/">登出</Link></li>
                    </ul>
                </li>
            </ul>
        </>

    )
}

export default NavbarIN;