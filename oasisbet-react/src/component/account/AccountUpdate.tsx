import React from "react";
import './AccountUpdate.css';
import { Card, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export default function AccountUpdate(){

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
                                    <span id="ACCOUNT_NO">{1000001}</span>
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
                                        required
                                        />
                                        &nbsp;
                                        <div className="input-group-append">
                                        <button className="btn btn-outline-secondary btn-pencil" type="button">
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
                                            required
                                            />
                                            &nbsp;
                                            <div className="input-group-append">
                                            <button className="btn btn-outline-secondary btn-pencil" type="button">
                                                <FontAwesomeIcon icon={faPencil}/>
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <div className="d-flex justify-content-end">
                            <button className="btn btn-danger btn-cancel" type="button">
                                Cancel
                            </button>
                            <button className="btn btn-success btn-confirm" type="button">
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
                                    required
                                    />
                                </div>
                                </div>
                            </div>
                        </form>
                            <hr />
                            <div className="d-flex justify-content-end">
                            <button className="btn btn-danger btn-cancel" type="button">
                                Cancel
                            </button>
                            <button className="btn btn-success btn-confirm" type="button">
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