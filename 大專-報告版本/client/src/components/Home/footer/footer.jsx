import React from 'react';
import "./footer.css"
import { Link } from 'react-router-dom';

import { FaInstagram } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaCampground } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';



function Footer() {
    return (
        <>
            {/* 頁尾footer */}
            <footer className="footer-1">
                <div className="footer-3">
                    <img className="footer-3-logo" src="http://localhost:8000/img/home/Logo%E9%BB%91.png" alt='footer' />
                    <p>Hire是一個致力於促進共享經濟和可持續發展的線上平台。我們相信，戶外冒險和自然探索是每個人都應該擁有的權利</p>
                    <p>2023 Copyright © Hire Outdoor</p>
                </div>
                <div className="footer-4">
                    <p className="C1">Login</p>
                    <Link to="/" className="C2"><FaHome/></Link>
                    <Link to="/" className="C3"><FaCampground/></Link>
                    <Link to="/" className="C4"><FaTools/></Link>
                    <p className="C5">About</p>
                    <Link to="/" className="C6"><FaInstagram/></Link>
                    <Link to="/" className="C7"><FaFacebookSquare/></Link>
                    <Link to="/" className="C8"><FaYoutube/></Link>
                    <p className="C9">Contact</p>
                    <Link to="/" className="C10"><FaEnvelope/></Link>
                    <Link to="/" className="C11"><FaPhone/></Link>
                </div>
            </footer>
        </>
    );
}

export default Footer;