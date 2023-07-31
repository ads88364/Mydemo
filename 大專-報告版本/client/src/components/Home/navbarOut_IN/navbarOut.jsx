import React from 'react';
import style from "./navbarOut_IN.module.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';


function NavbarOut() {
    return (
        
        <>
            {/* icon */}

            <ul className={style["header-icon"]}>
                <li><Link to="/login" className={style.iconMove}><FontAwesomeIcon icon={faHeart} className="icon" /></Link></li>
                <li><Link to="/login" className={style.iconMove}><FontAwesomeIcon icon={faCartShopping} className="icon" /></Link></li>
                <li>
                    <Link to="/" className={style.iconMove}><FontAwesomeIcon icon={faCircleUser} className="icon" /></Link>
                    <ul className={`${style["drop-menu"]} ${style["limenu-2"]}`}>
                        <li><Link to="/login">會員登入</Link></li>
                        <li><Link to="/RegistrationForm">會員註冊</Link></li>
                    </ul>
                </li>
            </ul>
        </>

    )
}

export default NavbarOut;