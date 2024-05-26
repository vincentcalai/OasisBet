import React, { useState } from "react";
import './AccountLogin.css';
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function AccountLogin({onLogin}){
  
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [responseCode, setResponseCode] = useState(location.state?.code);
  const [responseMsg, setResponseMsg] = useState(location.state?.message);

  const handleLogin = (e) => {
    e.preventDefault();
    if(username === 'CHOONANN' && password === 'password'){
      onLogin(true);
    } else {
      console.log("Invalid Credential!");
      setResponseCode(1);
      setResponseMsg("Please enter a valid credential. Login failed.");
    }
  };

  function handleClickCreateUser() {
    navigate('/create-user');
  }

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