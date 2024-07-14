import React, { useEffect, useRef, useState } from "react";
import './AccountUpdate.css';
import { Card, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSessionStorage } from "../util/useSessionStorage.ts";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import { validatePassword, validateCfmPassword, validateEmail, validateContactNo, validateRequiredField } from "../util/validation.ts";
import ConfirmDialog from "../common/dialog/ConfirmDialog.tsx";
import { AccountDetailsModel, UpdateAccountDetailsModel } from "../../constants/MockData.ts";
import { updateAccInfo } from "../../services/api/ApiService.ts";

export default function AccountUpdate(){
    const CONTACT_TAB = 'CONTACT';
    const LOGIN_TAB = 'LOGIN';

    const EMAIL = 'EMAIL';
    const CONTACT_NO = 'CONTACT_NO';

    const CURRENT_PASSWORD = 'CURRENT_PASSWORD';
    const NEW_PASSWORD = 'NEW_PASSWORD';
    const CFM_PASSWORD = 'CFM_PASSWORD';

    const [accountDetails, setAccountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [personalInfoDetails, setPersonalInfoDetails] = useSessionStorage(SharedVarConstants.PERSONAL_DETAILS, {});
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState({ title: '', type: '' });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [accId, setAccId] = useState('');
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [isContactNoDisabled, setIsContactNoDisabled] = useState(true);
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        cfmPassword: '',
        email: '',
        contactNo: ''
    });

    const hasEditContact = useRef(false);
    const hasEditPassword = useRef(false);

    useEffect(() => {
        console.log("accountDetails in AccountUpdate: ", accountDetails);
        console.log("personalInfoDetails in AccountUpdate: ", personalInfoDetails);
        const { accId } = accountDetails || {};
        const {email, contactNo} = personalInfoDetails || {};
        console.log("email in AccountUpdate: ", email);
        console.log("contactNo in AccountUpdate: ", contactNo);

        setAccId(accId);
        setEmail(email);
        setContactNo(contactNo);
        setAccountDetails(accountDetails);
        setPersonalInfoDetails(personalInfoDetails);
    }, [accountDetails, setAccountDetails, personalInfoDetails, setPersonalInfoDetails]);

    const onCancel = ((navigateTab) => {
        if(navigateTab === CONTACT_TAB && !isEmailDisabled){
            setEmail('');
        }
        if(navigateTab === CONTACT_TAB && !isContactNoDisabled){
            setContactNo('');
        }
        if(navigateTab === LOGIN_TAB){
            setCurrentPassword('');
            setNewPassword('');
            setCfmPassword('');
        }
    });

    const onSubmit = ((type: string) => {
        setSuccessMsg('');
        setErrorMsg('');

        console.log("onSubmit Account Update details: ", email, contactNo);
        const validationErrors = {
            currentPassword: '',
            newPassword: '',
            cfmPassword: '',
            email: '',
            contactNo: ''
        };

        if(type === CONTACT_TAB){
            validationErrors.email = validateEmail(email);
            validationErrors.contactNo = validateContactNo(contactNo);
        } else if(type === LOGIN_TAB){
            validationErrors.currentPassword = validateRequiredField(currentPassword);
            validationErrors.newPassword = validatePassword(newPassword);
            validationErrors.cfmPassword = validateCfmPassword(cfmPassword, newPassword);
        }
        setErrors(validationErrors);

        const checkValidation = Object.values(validationErrors).every(error => error === '');
        if (checkValidation) {
            console.log('Account Update Form is valid, submitting form to backend now');
            handleOpenDialog(type);
        } else {
            console.log('Account Update Form is invalid');
        }
    });

    const handleOpenDialog = (type: string) => {
        let dialogTitle = '';
        let dialogType = '';
        dialogTitle = type === CONTACT_TAB ? SharedVarConstants.CFM_UPDATE_ACC_DETAILS_DIALOG_TITLE : SharedVarConstants.CFM_UPDATE_PW_DIALOG_TITLE;
        dialogType = type === CONTACT_TAB ? SharedVarConstants.CFM_UPDATE_ACC_DETAILS_DIALOG_TYPE : SharedVarConstants.CFM_UPDATE_PW_DIALOG_TYPE;
        setDialogData({
            title: dialogTitle,
            type: dialogType,
        });
        setDialogOpen(true);
    };

    const handleCloseDialog = async (result) => {
        setDialogOpen(false);
        if (result === 'confirm') {
          console.log('Confirmed!');
          setIsContactNoDisabled(true)
          setIsEmailDisabled(true)
          
          const request: UpdateAccountDetailsModel = new UpdateAccountDetailsModel();
          const accountDetails: AccountDetailsModel = new AccountDetailsModel();
          
          const username = sessionStorage.getItem(SharedVarConstants.AUTH_USER);
          if(!username){
            console.log("Username is not found in session storage");
            return;
          }  
          accountDetails.username = username
          if(dialogData?.type === SharedVarConstants.CFM_UPDATE_ACC_DETAILS_DIALOG_TYPE){
            accountDetails.contactNo = contactNo;
            accountDetails.email = email;
          } else if(dialogData?.type === SharedVarConstants.CFM_UPDATE_PW_DIALOG_TYPE){
            accountDetails.newPassword = newPassword;
            accountDetails.oldPassword = currentPassword;
          } else {
            console.log("Cannot find dialog type");
            return;
          }

          request['accountDetails'] = accountDetails;
          try {
              const response = await updateAccInfo(request);
              if(response.statusCode !== 0){
                console.log("Error updating account information, response:", response);
                setErrorMsg(response.resultMessage);
              } else {
                //update account information success!
                console.log("Update account information successfully:", response);
                if(dialogData?.type === SharedVarConstants.CFM_UPDATE_ACC_DETAILS_DIALOG_TYPE){
                    const personalDetails = {
                        "email": email,
                        "contactNo": contactNo
                    };
                    sessionStorage.setItem(SharedVarConstants.PERSONAL_DETAILS, JSON.stringify(personalDetails));
                    setPersonalInfoDetails(personalDetails);
                }
                
                setSuccessMsg(response.resultMessage);
                setErrorMsg('');
              }
          } catch (error) {
              //TODO to change this error message to a generic error message shown as red banner
              console.error("Error in handling updating account infomation:", error);
              setErrorMsg("Failed to update account infomation. Please try again.");
          }
        } else {
          console.log('Cancelled!');
        }
    };

    const handlePasswordInputChange = (event, type) => {
        hasEditPassword.current = true;
        if(type === CURRENT_PASSWORD){
            setCurrentPassword(event.target.value);
        } else if(type === NEW_PASSWORD){
            setNewPassword(event.target.value);
        } else if(type === CFM_PASSWORD){
            setCfmPassword(event.target.value);
        }
    };

    const handleContactInputChange = (event, type) => {
        hasEditContact.current = true;
        if(type === EMAIL){
            setEmail(event.target.value);
        } else if(type === CONTACT_NO){
            setContactNo(event.target.value);
        }
    };

    const handleValidation = (inputType) => {
        let validationErrors = {
          currentPassword: '',
          newPassword: '',
          cfmPassword: '',
          email: '',
          contactNo: ''
        };

        if(inputType === CURRENT_PASSWORD){
            validationErrors.currentPassword = validateRequiredField(currentPassword);
        }
        
        if(inputType === NEW_PASSWORD){
          validationErrors.newPassword = validatePassword(newPassword);
        }
        
        if(inputType === CFM_PASSWORD){
          validationErrors.cfmPassword = validateCfmPassword(newPassword, cfmPassword);
        }
    
        if(inputType === EMAIL){
          validationErrors.email = validateEmail(email);
        }
        
        if(inputType === CONTACT_NO){
          validationErrors.contactNo = validateContactNo(contactNo);
        }
    
        setErrors(validationErrors);
    };

    const handleOnBlurInput = (inputType) => (e) => {
        handleValidation(inputType);
    }

    return (
        <div className="container-fluid">
            <br />
            {successMsg && <div className="alert alert-success col-md-6 offset-md-3"><b>Success: </b>{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger col-md-6 offset-md-3"><b>Fail: </b>{errorMsg}</div>}
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Account Update</h2>
                </Card.Header>
                <Card.Body className="card-body">
                <hr />
                <br />
                    <Tabs
                        defaultActiveKey="contact"
                        id="account-update-tab"
                        className="account-update-parent-tab-modal mb-3"
                        >
                        <Tab eventKey="contact" title="Contact Info">
                            <form>
                                <div className="form-group row mx-0">
                                    <label
                                    id="ACCOUNT_NO_LABEL"
                                    htmlFor="account_no_0_Label"
                                    className="control-label col-sm-4 acc-update-section-label-width acc-update-label-text"
                                    >
                                    <span id="ACCOUNT_NO">ACCOUNT NO.</span>
                                    </label>
                                    <label
                                    id="ACCOUNT_NO_INPUT"
                                    htmlFor="account_no_0_input"
                                    className="control-label col-sm-4 acc-update-label-text"
                                    >
                                    <span id="ACCOUNT_NO">{accId}</span>
                                    </label>
                                </div>
                                <hr />
                                <div className="form-group row mx-0">
                                    <label
                                    id="EMAIL_LABEL"
                                    htmlFor="email_0_Label"
                                    className="control-label col-sm-4 acc-update-section-label-width acc-update-label-text"
                                    >
                                    <span id="EMAIL">Email:</span>
                                    </label>
                                    <div className="col-sm-4">
                                        <div className="input-group">
                                            <div className="input-group-prepend"></div>
                                            <input
                                            type="text"
                                            className="form-control acc-update-section-selection-width no-spinner"
                                            id="email_0"
                                            name="email"
                                            value = {email}
                                            onBlur={handleOnBlurInput(EMAIL)}
                                            onChange={(e) => handleContactInputChange(e, EMAIL)}
                                            disabled = {isEmailDisabled}
                                            required
                                            />
                                            &nbsp;
                                            <div className="input-group-append">
                                            <button className="btn btn-outline-secondary btn-pencil" type="button"
                                                onClick={() => setIsEmailDisabled(!isEmailDisabled)}>
                                                <FontAwesomeIcon icon={faPencil} className="pencil-icon"/>
                                            </button>
                                            </div>
                                        </div>
                                        <label id="email_error_0" className={`error-text ${errors.email ? 'highlightLabel' : ''}`} htmlFor="email_0">
                                            {errors.email}
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group row mx-0">
                                    <label
                                    id="CONTACT_NO_LABEL"
                                    htmlFor="contact_no_0_Label"
                                    className="control-label col-sm-4 acc-update-section-label-width acc-update-label-text"
                                    >
                                    <span id="CONTACT_NO">Contact No:</span>
                                    </label>
                                    <div className="col-sm-4">
                                        <div className="input-group">
                                            <div className="input-group-prepend"></div>
                                            <input
                                            type="text"
                                            className="form-control acc-update-section-selection-width no-spinner"
                                            id="contact_no_0"
                                            name="contactNo"
                                            value = {contactNo}
                                            onBlur={handleOnBlurInput(CONTACT_NO)}
                                            onChange={(e) => handleContactInputChange(e, CONTACT_NO)}
                                            disabled = {isContactNoDisabled}
                                            required
                                            />
                                            &nbsp;
                                            <div className="input-group-append">
                                            <button className="btn btn-outline-secondary btn-pencil" type="button"
                                                onClick={() => setIsContactNoDisabled(!isContactNoDisabled)}>
                                                <FontAwesomeIcon icon={faPencil}/>
                                            </button>
                                            </div>
                                        </div>
                                        <label id="contact_no_error_0" className={`error-text ${errors.contactNo ? 'highlightLabel' : ''}`} htmlFor="contact_no_0">
                                            {errors.contactNo}
                                        </label>
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <div className="d-flex justify-content-end">
                            <button className="btn btn-danger btn-cancel" type="button"
                                disabled={!hasEditContact.current}
                                onClick={() => onCancel(CONTACT_TAB)}>
                                Cancel
                            </button>
                            <button className="btn btn-success btn-confirm-action" type="button"
                                disabled={!hasEditContact.current}
                                onClick={() => onSubmit(CONTACT_TAB)}>
                                Confirm
                            </button>
                            </div>
                            <br />
                        </Tab>
                        <Tab eventKey="login" title="Login Info">
                        <form>
                            <div className="form-group row mx-0">
                                <label
                                id="OLD_PASSWORD_LABEL"
                                htmlFor="old_password_0_Label"
                                className="control-label col-sm-4 acc-update-section-label-width acc-update-label-text"
                                >
                                <span id="OLD_PASSWORD">Current Password:</span>
                                </label>
                                <div className="col-sm-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend"></div>
                                        <input
                                        type="password"
                                        className="form-control acc-update-section-selection-width no-spinner"
                                        id="old_password_0"
                                        name="old_password"
                                        onBlur={handleOnBlurInput(CURRENT_PASSWORD)}
                                        onChange={(e) => handlePasswordInputChange(e, CURRENT_PASSWORD)}
                                        value = {currentPassword}
                                        required
                                        />
                                    </div>
                                    <label id="current_password_error_0" className={`error-text ${errors.currentPassword ? 'highlightLabel' : ''}`} htmlFor="current_password_0">
                                        {errors.currentPassword}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group row mx-0">
                                <label
                                id="NEW_PASSWORD_LABEL"
                                htmlFor="new_password_0_Label"
                                className="control-label col-sm-4 acc-update-section-label-width acc-update-label-text"
                                >
                                <span id="NEW_PASSWORD">New Password:</span>
                                </label>
                                <div className="col-sm-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend"></div>
                                        <input
                                        type="password"
                                        className="form-control acc-update-section-selection-width no-spinner"
                                        id="new_password_0"
                                        name="new_password"
                                        onBlur={handleOnBlurInput(NEW_PASSWORD)}
                                        onChange={(e) => handlePasswordInputChange(e, NEW_PASSWORD)}
                                        value = {newPassword}
                                        required
                                        />
                                    </div>
                                    <label id="newPassword_error_0" className={`error-text ${errors.newPassword ? 'highlightLabel' : ''}`} htmlFor="newPassword_0">
                                        {errors.newPassword}
                                    </label>    
                                </div>
                            </div>
                            <div className="form-group row mx-0">
                                <label
                                id="CFM_NEW_PASSWORD_LABEL"
                                htmlFor="cfm_new_password_0_Label"
                                className="control-label col-sm-4 acc-update-section-label-width acc-update-label-text"
                                >
                                <span id="CFM_NEW_PASSWORD">Confirm New Password:</span>
                                </label>
                                <div className="col-sm-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend"></div>
                                        <input
                                        type="password"
                                        className="form-control acc-update-section-selection-width no-spinner"
                                        id="cfm_new_password_0"
                                        name="cfm_new_password"
                                        onBlur={handleOnBlurInput(CFM_PASSWORD)}
                                        onChange={(e) => handlePasswordInputChange(e, CFM_PASSWORD)}
                                        value = {cfmPassword}
                                        required
                                        />
                                    </div>
                                    <label id="cfmPassword_error_0" className={`error-text ${errors.cfmPassword ? 'highlightLabel' : ''}`} htmlFor="cfmPassword_0">
                                        {errors.cfmPassword}
                                    </label>
                                </div>
                            </div>
                        </form>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-danger btn-cancel" type="button"
                                    disabled={!hasEditPassword.current}
                                    onClick={() => onCancel(LOGIN_TAB)}>
                                    Cancel
                                </button>
                                <button className="btn btn-success btn-confirm-action" type="button"
                                    disabled={!hasEditPassword.current}
                                    onClick={() => onSubmit(LOGIN_TAB)}>
                                    Confirm
                                </button>
                            </div>
                            <br />
                        </Tab>
                    </Tabs>
                </Card.Body> 
            </Card>

            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                data={dialogData} />
        </div>
    );
}
