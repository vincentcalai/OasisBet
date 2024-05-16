import './LoginMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

export default function LoginMenu(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false as boolean);

    const handleLoginInputChange = (event, type) => {
        console.log("value: ", event.target.value);
        if(type === 'username'){
            setUsername(event.target.value.toUpperCase());
        } else if(type === 'password'){
            setPassword(event.target.value);
        }
    };

    function handleSubmitForm(event){
        event.preventDefault();
        if(username && password && username === "CHOONANN" && password === "password"){
            setIsLoggedIn(true);
        }
    }

    function handleLogout(){
        if(window.confirm("Are you sure to logout?")) {
            console.log("logout ok");
            setIsLoggedIn(false);
            setUsername('');
            setPassword('');
        }
    }

    return (
        <>
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
                                            className="input-login"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => {
                                                handleLoginInputChange(e, 'username');
                                            }}
                                        />
                                    </div>
                                    <div className="form-group login-form-group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="input-login"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                handleLoginInputChange(e, 'password');
                                            }}
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
        </>
    );
}