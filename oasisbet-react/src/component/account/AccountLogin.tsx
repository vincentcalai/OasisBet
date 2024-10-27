import React, { useEffect, useState } from "react";
import './AccountLogin.css';
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import { fetchAccountDetails } from '../../services/api/ApiService.ts';
import { LoginCredentialsModel } from "../../constants/MockData.ts";
import { jwtAuthenticate } from '../../services/api/ApiService.ts';
import { closeAlert, openAlert, updateAccountDetails, updateLoginDetails } from "../actions/ReducerAction.ts";
import { useDispatch } from "react-redux";
import AlertError from "../util/AlertError.tsx";

export default function AccountLogin(){
  
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [responseCode, setResponseCode] = useState(location.state?.code);
  const [responseMsg, setResponseMsg] = useState(location.state?.message);

  useEffect(() => {
    if(location && location.state?.code !== 2) {
      dispatch(closeAlert());
    }
    setResponseCode(location.state?.code);
    setResponseMsg(location.state?.message);
  }, [location, dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginCredentialModel = new LoginCredentialsModel(username, password);
    try {
        const response = await jwtAuthenticate(loginCredentialModel, dispatch);
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
          console.log("Invalid Credential!");
          setResponseCode(1);
          setResponseMsg(SharedVarConstants.INVALID_LOGIN_ERR_MSG);
        }
    } catch (error) {
        console.log("Invalid Credential, ", error);
        if(error && error.response && error.response.status === 401){
          setResponseCode(1);
          setResponseMsg(SharedVarConstants.INVALID_LOGIN_ERR_MSG);
        } else {
          dispatch(openAlert(error.message))
        }
    }
  };

  function handleClickCreateUser() {
    navigate('/create-user');
  }

  const retrieveAccountDetails = async (username) => {
    try {
      const response = await fetchAccountDetails(username);
      console.log("AccountLogin component, accountDetails : ", response.account, " personalInfo: ", response.personalInfo);
      dispatch(updateAccountDetails('accountDetails', response.account))
      dispatch(updateAccountDetails('personalInfo', response.personalInfo))
      dispatch(updateLoginDetails('isUserLoggedIn', true));
    } catch (error) {
      console.log("Error when retrieving account details!");
    }
  };

  return (
    <>
      <br />
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <AlertError></AlertError>
      </div>
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <Card className="card">
          <Card.Header className="card-header">
            <h2>Login</h2>
          </Card.Header>
          
          <Card.Body className="card-body d-flex flex-column align-items-center justify-content-center">
          {responseCode === 0 && responseMsg && <div className="alert alert-success align-items-center justify-content-center"><b>Success: </b>{responseMsg}</div>}
          {responseCode !== 0 && responseMsg && 
            <div className="alert alert-danger align-items-center justify-content-center" style={{maxWidth: '70%'}}>
            { 
              responseCode !== 99 && <b>Fail: </b>
            } 
            {responseMsg}
            </div>
          }
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
    </>
  );
}