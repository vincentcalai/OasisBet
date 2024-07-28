import './Header.css';
import React from 'react';
import logo from '../../assets/images/logo.png';

export default function Header(){
    return (
        <header>
            <div className="title-nav-bar">
                <img src={logo} alt="Logo" />
            </div>
        </header>
    );
}