import './Header.css';
import React from 'react';

export default function Header(){
    const logo =  require("../../assets/images/logo.png");

    return (
        <header>
            <div className="title-nav-bar">
                <img src={logo} alt="Logo" />
            </div>
        </header>
    );
}