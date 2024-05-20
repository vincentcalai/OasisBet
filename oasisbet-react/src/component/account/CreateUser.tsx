import React, { useState } from 'react';
import './CreateUser.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from '../../constants/SharedVarConstants';
import ConfirmDialog from '../common/dialog/ConfirmDialog.tsx';
import { createUser } from '../../services/api/ApiService.js';
import { UserModel } from '../../model/UserModel.tsx';
import { CreateUserModel } from '../../model/CreateUserModel.tsx';
import { isEqualToOtherValue, isShorterThanMinLength, isLongerThanMaxLength, isNotEmpty, isOnlyContainsAlphaNumeric, isOnlyContainsNumeric, isValidEmail } from '../util/validation.js';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cfmPassword, setCfmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    cfmPassword: '',
    email: '',
    contactNo: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ title: '', type: '' });

  const handleValidation = (inputType) => {
    let validationErrors = {
      username: '',
      password: '',
      cfmPassword: '',
      email: '',
      contactNo: ''
    };

    if(inputType === 'username'){
      validationErrors.username = validateUsername(username);
    }
    
    if(inputType === 'password'){
      validationErrors.password = validatePassword(password);
    }
    
    if(inputType === 'cfmPassword'){
      validationErrors.cfmPassword = validateCfmPassword(cfmPassword);
    }

    if(inputType === 'email'){
      validationErrors.email = validateEmail(email);
    }
    
    if(inputType === 'contactNo'){
      validationErrors.contactNo = validateContactNo(contactNo);
    }

    setErrors(validationErrors);
  };

  const confirmClicked = () => {
      const validationErrors = {
        username: '',
        password: '',
        cfmPassword: '',
        email: '',
        contactNo: ''
      };
      validationErrors.username = validateUsername(username);
      validationErrors.password = validatePassword(password);
      validationErrors.cfmPassword = validateCfmPassword(cfmPassword);
      validationErrors.email = validateEmail(email);
      validationErrors.contactNo = validateContactNo(contactNo);
      setErrors(validationErrors);
      const checkValidation = Object.values(validationErrors).every(error => error === '');
    if (checkValidation) {
      console.log('Form is valid, submitting form to backend now');
      handleOpenDialog();
    } else {
      console.log('Form is invalid');
    }
  };

  const handleOpenDialog = () => {
    setDialogData({
      title: 'Confirm Create User?',
      type: SharedVarConstants.CREATE_USER_DIALOG_TYPE,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = async (result) => {
    setDialogOpen(false);
    if (result === 'confirm') {
      console.log('Confirmed!');
      const formDetails: UserModel = {
        id: 0,
        username: username,
        password: password,
        email: email,
        contactNo: contactNo,
        delInd: '',
        createdBy: '',
        createdDt: null
      };
      const request: CreateUserModel = {
        user: formDetails
      };

      try {
          const response = await createUser(request);
          if(response.statusCode !== 0){
            setErrorMsg(response.resultMessage);
          } else {
            //create user success! sending resultMessage back to account login screen
            setErrorMsg('');

          }
          console.log("User created successfully:", response);
      } catch (error) {
          console.error("Error creating user:", error);
          setErrorMsg("Failed to create user. Please try again.");
      }
    } else {
      console.log('Cancelled!');
    }
  };

  const handleOnBlurInput = (inputType) => (e) => {
    handleValidation(inputType);
  }

  const handleOnChangeInput = (inputType) => (e) => {
    if(inputType === 'username'){
      setUsername(e.target.value.toUpperCase());
    } else if(inputType === 'password'){
      setPassword(e.target.value);
    } else if(inputType === 'cfmPassword'){
      setCfmPassword(e.target.value);
    } else if(inputType === 'email'){
      setEmail(e.target.value.toUpperCase());
    } else if(inputType === 'contactNo'){
      setContactNo(e.target.value);
    }
    setErrors((prevState) => ({
      ...prevState, 
      [inputType]: ''
    }));
  }

  function validateUsername(username: string): string {
    if (!isNotEmpty(username)) {
      return 'This field is required';
    } else if (!isOnlyContainsAlphaNumeric(username)) {
      return 'Please enter only alphabet characters';
    } else if (isLongerThanMaxLength(username, 20)) {
      return 'Maximum length is 20 characters';
    } else if (isShorterThanMinLength(username, 5)) {
      return 'Minimum length is 5 characters';
    } else {
      return '';
    }
  }

  function validatePassword(password: string): string {
    if (!isNotEmpty(password)) {
      return 'This field is required';
    } else if (isLongerThanMaxLength(password, 20)) {
      return 'Maximum length is 20 characters';
    } else if (isShorterThanMinLength(password, 5)) {
      return 'Minimum length is 5 characters';
    } else {
      return '';
    }
  }
  
  function validateCfmPassword(cfmPassword: string): string {
    if (!isNotEmpty(cfmPassword)) {
      return 'This field is required';
    } else if (!isEqualToOtherValue(cfmPassword, password)) {
      return 'Passwords do not match';
    } else {
      return '';
    }
  }

  function validateEmail(email: string): string {
    if (!isNotEmpty(email)) {
      return 'This field is required';
    } else if (!isValidEmail(email)) {
      return 'Please enter a valid email address';
    } else if (isLongerThanMaxLength(100)) {
      return 'Maximum length is 100 characters';
    } else {
      return '';
    }
  }

  function validateContactNo(contactNo: string): string {
    if (!isNotEmpty(contactNo)) {
      return 'This field is required';
    } else if (!isOnlyContainsNumeric(contactNo)) {
      return 'Please enter only numeric characters';
    } else if (isLongerThanMaxLength(contactNo, 30)) {
      return 'Maximum length is 30 characters';
    } else {
      return '';
    }
  }

  return (
    <><div className="container">
      <br />
      {errorMsg && <div className="alert alert-danger col-md-6 offset-md-3"><b>Fail: </b>{errorMsg}</div>}
      <Card className="card col-md-6 offset-md-3">
        <Card.Header className="card-header">
          <h2>Create New Account</h2>
        </Card.Header>
        <Card.Body className="card-body d-flex flex-column align-items-center justify-content-center">
          <div className="container">
            <form>
              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="USERNAME_LABEL_1" htmlFor="username_0_Label" className={`control-label ${errors.username ? 'highlightLabel' : ''}`}>
                  <span id="USERNAME">User Name</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input
                  id="username_0"
                  type="text"
                  className="form-control allCaps"
                  value={username}
                  onBlur={handleOnBlurInput('username')}
                  onChange={handleOnChangeInput('username')}
                  name="username" />
                <label id="username_error_0" className={`error-text ${errors.username ? 'highlightLabel' : ''}`} htmlFor="name_0">
                  {errors.username}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="PASSWORD_LABEL_1" htmlFor="password_0_Label" className={`control-label ${errors.password ? 'highlightLabel' : ''}`}>
                  <span id="PASSWORD">Password</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input
                  id="password_0"
                  type="password"
                  className="form-control allCaps"
                  value={password}
                  onBlur={handleOnBlurInput('password')}
                  onChange={handleOnChangeInput('password')}
                  name="password" />
                <label id="password_error_0" className={`error-text ${errors.password ? 'highlightLabel' : ''}`} htmlFor="password_0">
                  {errors.password}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="CFMPASSWORD_LABEL_1" htmlFor="cfmPassword_0_Label" className={`control-label ${errors.cfmPassword ? 'highlightLabel' : ''}`}>
                  <span id="CFMPASSWORD">Confirm Password</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input
                  id="cfmPassword_0"
                  type="password"
                  className="form-control allCaps"
                  value={cfmPassword}
                  onBlur={handleOnBlurInput('cfmPassword')}
                  onChange={handleOnChangeInput('cfmPassword')}
                  name="cfmPassword" />
                <label id="cfmPassword_error_0" className={`error-text ${errors.cfmPassword ? 'highlightLabel' : ''}`} htmlFor="cfmPassword_0">
                  {errors.cfmPassword}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="EMAIL_LABEL_1" htmlFor="email_0_Label" className={`control-label ${errors.email ? 'highlightLabel' : ''}`}>
                  <span id="EMAIL">Email</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input
                  id="email_0"
                  type="text"
                  className="form-control allCaps"
                  value={email}
                  onBlur={handleOnBlurInput('email')}
                  onChange={handleOnChangeInput('email')}
                  name="email" />
                <label id="email_error_0" className={`error-text ${errors.email ? 'highlightLabel' : ''}`} htmlFor="email_0">
                  {errors.email}
                </label>
              </div>

              <br />

              <div className="form-group form-row required col-md-8 align_cont_center">
                <label id="CONTACTNO_LABEL_1" htmlFor="contactNo_0_Label" className={`control-label ${errors.contactNo ? 'highlightLabel' : ''}`}>
                  <span id="CONTACTNO">Contact No</span>
                  <span className="mandatory-label"></span>&nbsp;
                </label>
                <input
                  id="contactNo_0"
                  type="text"
                  className="form-control allCaps"
                  value={contactNo}
                  onBlur={handleOnBlurInput('contactNo')}
                  onChange={handleOnChangeInput('contactNo')}
                  name="contactNo" />
                <label id="contactNo_error_0" className={`error-text ${errors.contactNo ? 'highlightLabel' : ''}`} htmlFor="contactNo_0">
                  {errors.contactNo}
                </label>
              </div>

              <div className="text-right">
                <button className="btn-register" type="button" onClick={confirmClicked}>
                  <span id="cfm">Register</span>
                </button>
              </div>
            </form>
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
    
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        data={dialogData} />
    </>
  );
};

export default CreateUser;


