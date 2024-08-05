import './LoginMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccountDetails, jwtAuthenticate } from '../../services/api/ApiService.ts';
import { LoginCredentialsModel } from '../../constants/MockData.ts';
import SharedVarConstants from '../../constants/SharedVarConstants.ts';
import { getSessionStorageOrDefault } from '../util/useSessionStorage.ts';
import { updateLoginDetails } from '../actions/LoginAction.ts';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../actions/ModalAction.ts';
import SharedVarMethods from '../../constants/SharedVarMethods.ts';

export default function LoginMenu(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [balance, setBalance] = useState('NA');
    const [loginTimer, setLoginTimer] = useState('00:00:00');
    const isUserLoggedIn = useSelector((state: any) => state['login']['isUserLoggedIn']) ;
    const updatedBalance = useSelector((state: any) => state['login']['balance']) ;

    useEffect(() => {
        const retrievedAccountDetails: any = getSessionStorageOrDefault(SharedVarConstants.ACCOUNT_DETAILS, {});
        console.log("retrievedAccountDetails in LoginMenu: ", retrievedAccountDetails);
        const { balance } = retrievedAccountDetails || {};
        setBalance(balance != null ? balance.toFixed(2).toString() : 'NA');

        const authUser = sessionStorage.getItem(SharedVarConstants.AUTH_USER);
        
        setLoginUsername(authUser ? authUser : '');
        let intervalId;
        if(isUserLoggedIn){
            const userLoginTime = sessionStorage.getItem(SharedVarConstants.LOGIN_TIME) ? Number(sessionStorage.getItem(SharedVarConstants.LOGIN_TIME)) : Date.now();
            intervalId = setInterval(() => {
                setLoginTimer(getLoggedInDuration(userLoginTime));
                checkSessionExpiry();
            }, 1000);
        } else {
            setUsername('');
            setPassword('');
            setLoginTimer('00:00:00');
        }
        return () => clearInterval(intervalId); // clear interval when unmounting this component 
        // eslint-disable-next-line
    }, [isUserLoggedIn]);

    useEffect(() => {
        console.log("updatedBalance: ", updatedBalance)
        if (updatedBalance !== undefined) {
            setBalance(updatedBalance !== null ? updatedBalance.toFixed(2).toString() : 'NA');
        }
    }, [updatedBalance]);

    const checkSessionExpiry = () => {
        const lastAuthTime = sessionStorage.getItem(SharedVarConstants.LAST_AUTH_TIME) ? Number(sessionStorage.getItem(SharedVarConstants.LAST_AUTH_TIME)) : Date.now();
        const durationInSeconds = Math.floor((Date.now() - lastAuthTime) / 1000);

        //prompt login extension modal once
        if(durationInSeconds === SharedVarConstants.LOGIN_EXTEND_PROMPT_TIME) { 
            dispatch(openModal('loginSessionExtendModal'));
        }

        if(durationInSeconds > SharedVarConstants.AUTO_LOGOUT_TIME) { 
            dispatch(closeModal('loginSessionExtendModal'));
            SharedVarMethods.clearSessionStorage();
            dispatch(updateLoginDetails('isUserLoggedIn', false));
            navigate('/account', { state: { code: 99, message: SharedVarConstants.AUTO_LOGOUT_MSG } });
        }
    }

    const handleLoginInputChange = (event, type) => {
        if(type === 'username'){
            setUsername(event.target.value.toUpperCase());
        } else if(type === 'password'){
            setPassword(event.target.value);
        }
    };

    const getLoggedInDuration = (loginTime: number) => {
        const durationInSeconds = Math.floor((Date.now() - loginTime) / 1000);
        return formatDuration(durationInSeconds);
    };
    
    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    async function handleSubmitForm(event){
        event.preventDefault();
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
            sessionStorage.setItem(SharedVarConstants.LAST_AUTH_TIME, Date.now().toString());
            retrieveAccountDetails(username);
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
          console.log("accountDetails in LoginMenu: ", JSON.stringify(accountDetails.account));
          console.log("personalInfo in LoginMenu: ", JSON.stringify(accountDetails.personalInfo));
          sessionStorage.setItem(SharedVarConstants.ACCOUNT_DETAILS, JSON.stringify(accountDetails.account));
          sessionStorage.setItem(SharedVarConstants.PERSONAL_DETAILS, JSON.stringify(accountDetails.personalInfo));
          dispatch(updateLoginDetails('isUserLoggedIn', true));
        } catch (error) {
          console.log("Error when retrieving account details!");
        }
    };

    function handleLogout(){
        dispatch(openModal('logoutModal'));
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
                            <span style={{borderRight: '1px solid #ccc'}}>LOGGED IN &nbsp; 
                                {loginTimer}</span>
                            <Button type="button" variant="secondary" className="btn-logout"
                            onClick={handleLogout}>Logout</Button>
                            <FontAwesomeIcon icon={faUser} className="user-icon"/>
                            <span className="login-username-tag">&nbsp; {loginUsername}</span>
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