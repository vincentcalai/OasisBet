import React, { useState } from "react";
import './AccountLogin.css';
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SharedVarConstants from "../../constants/SharedVarConstants";
import { fetchAccountDetails } from '../../services/api/ApiService.js';
import { LoginCredentialsModel } from "../../constants/MockData.js";
import { jwtAuthenticate } from '../../services/api/ApiService.js';

export default function AccountLogin({onLogin}){
  
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [responseCode, setResponseCode] = useState(location.state?.code);
  const [responseMsg, setResponseMsg] = useState(location.state?.message);

  const handleLogin = async (e) => {
    e.preventDefault();
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
          onLogin(true);
        } else {
          console.log("Invalid Credential!");
          setResponseCode(1);
          setResponseMsg(SharedVarConstants.INVALID_LOGIN_ERR_MSG);
        }
    } catch (error) {
        console.log("Invalid Credential, ", error);
        setResponseCode(1);
        setResponseMsg(SharedVarConstants.INVALID_LOGIN_ERR_MSG);
    }
  };

  function handleClickCreateUser() {
    navigate('/create-user');
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

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      
      <Card className="card">
        <Card.Header className="card-header">
          <h2>Login</h2>
        </Card.Header>
        
        <Card.Body className="card-body d-flex flex-column align-items-center justify-content-center">
        {responseCode === 0 && responseMsg && <div className="alert alert-success align-items-center justify-content-center"><b>Success: </b>{responseMsg}</div>}
        {responseCode !== 0 && responseMsg && <div className="alert alert-danger align-items-center justify-content-center"><b>Fail: </b>{responseMsg}</div>}
          <br />
          <form action="">
            <div className="form-group ">
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value.toUpperCase())} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <br />
            <div className="form-group button-container">
              <button type="submit" className="login-btn" onClick={handleLogin}>Login</button>
            </div>
            <hr/>
            <div className="form-group">
              <p>Don't have an account yet? <button className="signup-link" onClick={handleClickCreateUser}>Sign Up Here</button></p>
            </div>
          </form>
        </Card.Body>    
      </Card>
    </div>
  );
}