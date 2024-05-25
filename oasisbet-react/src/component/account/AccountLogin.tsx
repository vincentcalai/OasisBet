import React, { useState } from "react";
import './AccountLogin.css';
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function AccountLanding(){
  
  const location = useLocation();
  const createUserMsg = location.state?.message;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in... username: ', username, ' password: ', password);
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
        {createUserMsg && <div className="alert alert-success align-items-center justify-content-center"><b>Success: </b>{createUserMsg}</div>}
          <br />
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
          <button type="submit" className="login-btn" onClick={handleLogin}>Login</button>
          <hr/>
          <div className="form-group">
            <p>Don't have an account yet? <button className="signup-link" onClick={handleClickCreateUser}>Sign Up Here</button></p>
          </div>
        </Card.Body>    
      </Card>
    </div>
  );
}