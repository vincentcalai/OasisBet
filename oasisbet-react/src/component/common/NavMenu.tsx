import './NavMenu.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavMenu(){

    const location = useLocation();

    const routeName = location.pathname.substring(1);

    console.log('Route parameters:', routeName);

    const [activeMenuButton, setActiveMenuButton] = useState(routeName);
    
    function handleOnChangeMenu(menu){
        setActiveMenuButton(menu);
    }

    return (
        <div className="header-bar collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="odds" style={{ textDecoration: 'none' }}>
                        <Button className={`nav-link main-menu-link ${activeMenuButton === 'odds' ? 'active' : ''}`}
                        onClick={() => handleOnChangeMenu('odds')}>
                            Odds
                        </Button>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="result" style={{ textDecoration: 'none' }}>
                        <Button className={`nav-link main-menu-link ${activeMenuButton === 'result' ? 'active' : ''}`}
                        onClick={() => handleOnChangeMenu('result')}>
                            Result
                        </Button>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="account" style={{ textDecoration: 'none' }}>
                        <Button className={`nav-link main-menu-link ${activeMenuButton === 'account' ? 'active' : ''}`}
                        onClick={() => handleOnChangeMenu('account')}>
                            Account
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}