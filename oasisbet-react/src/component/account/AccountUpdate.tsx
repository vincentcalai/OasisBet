import React, { useEffect, useState } from "react";
import './AccountUpdate.css';
import { Card, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSessionStorage } from "../util/useSessionStorage.ts";
import SharedVarConstants from "../../constants/SharedVarConstants";

export default function AccountUpdate(){
    const CONTACT_TAB = 'CONTACT';
    const LOGIN_TAB = 'LOGIN';

    const CURRENT_PASSWORD = 'CURRENT_PASSWORD';
    const NEW_PASSWORD = 'NEW_PASSWORD';
    const CFM_PASSWORD = 'CFM_PASSWORD';

    const [accountDetails, setAccountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    const [accId, setAccId] = useState('');
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [isContactNoDisabled, setIsContactNoDisabled] = useState(true);

    useEffect(() => {
        console.log("accountDetails in AccountOverview: ", accountDetails);
        const { account, personalInfo } = accountDetails || {};
        const { accId } = account || {};
        const {email, contactNo} = personalInfo || {};

        setAccId(accId);
        setEmail(email);
        setContactNo(contactNo);
        setAccountDetails(accountDetails);
    }, [accountDetails, setAccountDetails]);

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

    const handlePasswordInputChange = (event, type) => {
        if(type === CURRENT_PASSWORD){
            setCurrentPassword(event.target.value);
        } else if(type === NEW_PASSWORD){
            setNewPassword(event.target.value);
        } else if(type === CFM_PASSWORD){
            setCfmPassword(event.target.value);
        }
    };

    return (
        <div className="container-fluid">
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
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <div className="d-flex justify-content-end">
                            <button className="btn btn-danger btn-cancel" type="button"
                                onClick={() => onCancel(CONTACT_TAB)}>
                                Cancel
                            </button>
                            <button className="btn btn-success btn-confirm-action" type="button">
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
                                    onChange={(e) => handlePasswordInputChange(e, CURRENT_PASSWORD)}
                                    value = {currentPassword}
                                    required
                                    />
                                </div>
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
                                    onChange={(e) => handlePasswordInputChange(e, NEW_PASSWORD)}
                                    value = {newPassword}
                                    required
                                    />
                                </div>
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
                                    onChange={(e) => handlePasswordInputChange(e, CFM_PASSWORD)}
                                    value = {cfmPassword}
                                    required
                                    />
                                </div>
                                </div>
                            </div>
                        </form>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-danger btn-cancel" type="button"
                                    onClick={() => onCancel(LOGIN_TAB)}>
                                    Cancel
                                </button>
                                <button className="btn btn-success btn-confirm-action" type="button">
                                    Confirm
                                </button>
                            </div>
                            <br />
                        </Tab>
                    </Tabs>
                </Card.Body> 
            </Card>
        </div>
    );
}