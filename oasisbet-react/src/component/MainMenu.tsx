import './MainMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import Button from 'react-bootstrap/Button';
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MainMenu(){

    const location = useLocation();

    const routeName = location.pathname.substring(1);

    console.log('Route parameters:', routeName);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [activeMenuButton, setActiveMenuButton] = useState(routeName);
    const [isLoggedIn, setIsLoggedIn] = useState(false as boolean);
    

    function handleOnChangeMenu(menu){
        setActiveMenuButton(menu);
    }

    function handleSubmitForm(event){
        event.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value
        console.log("form submission email: ", username);
        console.log("form submission password: ", password);
        if(username === "CHOONANN" && password === "password"){
            setIsLoggedIn(true);
        }
    }

    function handleLogout(){
        if(window.confirm("Are you sure to logout?")) {
            console.log("logout ok");
            setIsLoggedIn(false);
        }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="odds" style={{ textDecoration: 'none' }}>
                            <Button className={`nav-link main-menu-link ${activeMenuButton === 'odds' ? 'active' : ''}`}
                            onClick={() => handleOnChangeMenu('odds')}>
                                Odds
                            </Button>
                        </Link>
                    </li>
                    &nbsp;
                    <li className="nav-item">
                        <Link to="result" style={{ textDecoration: 'none' }}>
                            <Button className={`nav-link main-menu-link ${activeMenuButton === 'result' ? 'active' : ''}`}
                            onClick={() => handleOnChangeMenu('result')}>
                                Result
                            </Button>
                        </Link>
                    </li>
                    &nbsp;
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

                {
                isLoggedIn && 
                    <div className="right-navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item user-menu-display">
                                <span style={{borderRight: '1px solid #ccc'}}>LOGGED IN &nbsp;</span>
                                <Button type="button" variant="secondary" className="btn-logout"
                                onClick={handleLogout}>Logout</Button>
                                <FontAwesomeIcon icon={faUser} className="user-icon"/>
                                <span className="login-username-tag">&nbsp; CHOONANN</span>
                            </li>
                            <li className ="nav-item">
                                <span className="balance-textbox">Balance: $99.88</span>
                            </li>
                        </ul>
                    </div>
                }

                {
                !isLoggedIn && 
                    <div className="right-navbar login-container">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <form id="login-column" onSubmit={handleSubmitForm}>
                                    <div id="login-form" className="login-form-group-block">
                                        <div className="form-group login-form-group">
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                ref={usernameRef}
                                                className="input-login"
                                                placeholder="Username"
                                                onChange={(e) => {
                                                    const username = e.target.value.toUpperCase();
                                                    if(usernameRef.current){
                                                        usernameRef.current.value = username;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="form-group login-form-group">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                ref={passwordRef}
                                                className="input-login"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group login-form-group">
                                            <button type="submit" className="btn-login">
                                                Login
                                            </button>
                                        </div>
                                        <div className="form-group login-form-group">
                                            <button type="button" className="btn-signup">
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                }
            </nav>

            
        </header>
    );
}