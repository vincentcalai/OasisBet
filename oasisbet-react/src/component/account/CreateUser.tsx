import React, { useState } from 'react';
import './CreateUser.css';
import { Card } from "react-bootstrap";

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cfmPassword, setCfmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
    cfmPasswordError: '',
    emailError: '',
    contactNoError: ''
  });

  const handleValidation = () => {

    if (!username) {
        errors.usernameError = 'This field is required';
    } else if (!/^[a-zA-Z]+$/.test(username)) {
        errors.usernameError = 'Please enter only alphabet characters';
    } else if (username.length > 20) {
        errors.usernameError = 'Maximum length is 20 characters';
    } else if (username.length < 5) {
        errors.usernameError = 'Minimum length is 5 characters';
    }

    if (!password) {
        errors.passwordError = 'This field is required';
    } else if (password.length > 20) {
        errors.passwordError = 'Maximum length is 20 characters';
    } else if (password.length < 5) {
        errors.passwordError = 'Minimum length is 5 characters';
    }

    if (!cfmPassword) {
        errors.cfmPasswordError = 'This field is required';
    } else if (cfmPassword !== password) {
        errors.cfmPasswordError = 'Passwords do not match';
    }

    if (!email) {
        errors.emailError = 'This field is required';
    } else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.emailError = 'Please enter a valid email address';
    } else if (email.length > 100) {
        errors.emailError = 'Maximum length is 100 characters';
    }

    if (!contactNo) {
        errors.contactNoError = 'This field is required';
    } else if (!/^\d+$/.test(contactNo)) {
        errors.contactNoError = 'Please enter only numeric characters';
    } else if (contactNo.length > 30) {
        errors.contactNoError = 'Maximum length is 30 characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const confirmClicked = () => {
    if (handleValidation()) {
      console.log('Form is valid');
      // Handle form submission
    } else {
      console.log('Form is invalid');
    }
  };

  return (
    <div className="container">
      <br />
      {/* {errorMsg && <div className="alert alert-danger col-md-6 offset-md-3"><b>Fail: </b>{errorMsg}</div>} */}
      <Card className="card col-md-6 offset-md-3">
        <Card.Header className="card-header">
          <h2>Create New Account</h2>
        </Card.Header>
        <Card.Body className="card-body d-flex flex-column align-items-center justify-content-center">
          <div className="container">
            <form>
              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="USERNAME_LABEL_1" htmlFor="username_0_Label" className={`control-label ${errors.usernameError ? 'highlightLabel' : ''}`}>
                  <span id="USERNAME">User Name</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input 
                  id="username_0" 
                  type="text" 
                  className="form-control allCaps" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toUpperCase())} 
                  name="username" 
                />
                <label id="username_error_0" className={`error-text ${errors.usernameError ? 'highlightLabel' : ''}`} htmlFor="name_0">
                  {errors.usernameError}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="PASSWORD_LABEL_1" htmlFor="password_0_Label" className={`control-label ${errors.usernameError ? 'highlightLabel' : ''}`}>
                  <span id="PASSWORD">Password</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input 
                  id="password_0" 
                  type="password" 
                  className="form-control allCaps" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  name="password" 
                />
                <label id="password_error_0" className={`error-text ${errors.passwordError ? 'highlightLabel' : ''}`} htmlFor="password_0">
                  {errors.passwordError}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="CFMPASSWORD_LABEL_1" htmlFor="cfmPassword_0_Label" className={`control-label ${errors.cfmPasswordError ? 'highlightLabel' : ''}`}>
                  <span id="CFMPASSWORD">Confirm Password</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input 
                  id="cfmPassword_0" 
                  type="password" 
                  className="form-control allCaps" 
                  value={cfmPassword}
                  onChange={(e) => setCfmPassword(e.target.value)} 
                  name="cfmPassword" 
                />
                <label id="cfmPassword_error_0" className={`error-text ${errors.cfmPasswordError ? 'highlightLabel' : ''}`} htmlFor="cfmPassword_0">
                  {errors.cfmPasswordError}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="EMAIL_LABEL_1" htmlFor="email_0_Label" className={`control-label ${errors.emailError ? 'highlightLabel' : ''}`}>
                  <span id="EMAIL">Email</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input 
                  id="email_0" 
                  type="text" 
                  className="form-control allCaps" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  name="email" 
                />
                <label id="email_error_0" className={`error-text ${errors.emailError ? 'highlightLabel' : ''}`} htmlFor="email_0">
                  {errors.emailError}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="CONTACTNO_LABEL_1" htmlFor="contactNo_0_Label" className={`control-label ${errors.contactNoError ? 'highlightLabel' : ''}`}>
                  <span id="CONTACTNO">Contact No</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input 
                  id="contactNo_0" 
                  type="text" 
                  className="form-control allCaps" 
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)} 
                  name="contactNo" 
                />
                <label id="contactNo_error_0" className={`error-text ${errors.contactNoError ? 'highlightLabel' : ''}`} htmlFor="contactNo_0">
                  {errors.contactNoError}
                </label>
              </div>

              <div className="text-right">
                <button className="btn btn-success btn-register" type="button" onClick={confirmClicked}>
                  <span id="cfm">Register</span>
                </button>
              </div>
            </form>
          </div>
        </Card.Body> 
      </Card>
      <br />
    </div>
  );
};

export default CreateUser;
