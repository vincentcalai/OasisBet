import './LoginMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccountDetails, jwtAuthenticate } from '../../services/api/ApiService';
import { LoginCredentialsModel } from '../../constants/MockData';
import SharedVarConstants from '../../constants/SharedVarConstants.js';
import { getSessionStorageOrDefault } from '../util/useSessionStorage.ts';
import { updateLoginDetails } from '../../actions/LoginAction.ts';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginMenu(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState('NA');
    const isUserLoggedIn = useSelector((state: any) => state['login']['isUserLoggedIn']) ;

    useEffect(() => {
        const retrievedAccountDetails: any = getSessionStorageOrDefault(SharedVarConstants.ACCOUNT_DETAILS, {});
        console.log("retrievedAccountDetails in LoginMenu: ", retrievedAccountDetails);
        const { account } = retrievedAccountDetails || {};
        const { balance } = account || {};
        setBalance(balance != null ? balance.toFixed(2).toString() : 'NA');
    }, [isUserLoggedIn]);

    const handleLoginInputChange = (event, type) => {
        if(type === 'username'){
            setUsername(event.target.value.toUpperCase());
        } else if(type === 'password'){
            setPassword(event.target.value);
        }
    };

    async function handleSubmitForm(event){
        event.preventDefault();
        console.log("username: ", username, " password: ", password);
        const loginCredentialModel = new LoginCredentialsModel(username, password);
        try {
            const response = await jwtAuthenticate(loginCredentialModel);
            console.log("JWT authtentication: ", response);
            if(response){
            //login successful
            const token = response.token;
            sessionStorage.setItem(SharedVarConstants.AUTH_USER, username);
            sessionStorage.setItem(SharedVarConstants.AUTHORIZATION, `Bearer ${token}`);
            sessionStorage.setItem(SharedVarConstants.LOGIN_TIME, Date.now().toString());
            retrieveAccountDetails(username);
            dispatch(updateLoginDetails('isUserLoggedIn', true));
            } else {
                //navigate to Account Login page and show Invalid Credential error
                console.log("Invalid Credential!");
                navigate('/account', { state: { code: 1, message: SharedVarConstants.INVALID_LOGIN_ERR_MSG } });
            }
        } catch (error) {
            //navigate to Account Login page and show Invalid Credential error
            console.log("Invalid Credential, ", error);
            navigate('/account', { state: { code: 1, message: SharedVarConstants.INVALID_LOGIN_ERR_MSG } });
        }
    }

    const retrieveAccountDetails = async (username) => {
        try {
          const accountDetails = await fetchAccountDetails(username);
          console.log("accountDetails: ", JSON.stringify(accountDetails));
          sessionStorage.setItem(SharedVarConstants.ACCOUNT_DETAILS, JSON.stringify(accountDetails));
        } catch (error) {
          console.log("Error when retrieving account details!");
        }
    };

    function handleLogout(){
        if(window.confirm("Are you sure to logout?")) {
            console.log("logout ok");
            setUsername('');
            setPassword('');
            clearLocalStorage();
            dispatch(updateLoginDetails('isUserLoggedIn', false));
        }
    }

    function clearLocalStorage() {
        sessionStorage.removeItem(SharedVarConstants.AUTH_USER);
        sessionStorage.removeItem(SharedVarConstants.AUTHORIZATION);
        sessionStorage.removeItem(SharedVarConstants.ACCOUNT_DETAILS);
        sessionStorage.removeItem(SharedVarConstants.LOGIN_TIME);
      }

    function handleClickCreateUser(){
        navigate('/create-user');
    }

    return (
        <>
            {
            isUserLoggedIn && 
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
                            <span className="balance-textbox">Balance: ${balance}</span>
                        </li>
                    </ul>
                </div>
            }

            {
            !isUserLoggedIn && 
                <div className="right-navbar login-container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <form id="login-column" onSubmit={handleSubmitForm}>
                                <div id="login-form" className="login-form-group-block">
                                    <div className="form-group login-form-group">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username-menu"
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
                                            id="password-menu"
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
                                        <button type="button" className="btn-signup" onClick={handleClickCreateUser}>
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