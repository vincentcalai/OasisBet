import React from "react";
import './LimitManagement.css';
import { Card, ProgressBar } from "react-bootstrap";

export default function LimitManagement(){

    return (
        <div className="container-fluid">
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Limit Management</h2>
                </Card.Header>
                <Card.Body className="card-body">
                    <form>
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">Deposited</label>
                            <label className="col-sm-6 col-md-6"> </label>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">Current Limit</label>
                        </div>
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">$0.00</label>
                            <div className="col-sm-6 col-md-6">
                            <ProgressBar now={38.88} />
                            <span>38.88%</span>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">${588.00}</label>
                        </div>
                        <br />
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">Change Monthly Deposit Limit</label>
                            <div className="col-md-3">
                            <div className="dropdown-section">
                                <select id="depositLimitDropdown" className="limit-dropdown">
                                    <option value="300">$300</option>
                                    <option value="500">$500</option>
                                    <option value="1000">$1000</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            </div>
                            <div className="col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">$</span>
                                </div>
                                <input type="text" className="form-control limit-left-section-selection-width no-spinner" id="deposit_limit_0" name="deposit_limit" required />
                            </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">Bets</label>
                            <label className="col-sm-6 col-md-6"></label>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">Current Limit</label>
                        </div>
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">$0.00</label>
                            <div className="col-sm-6 col-md-6">
                            <ProgressBar now={58.88} />
                            <span>{58.88}%</span>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">${888.61}</label>
                        </div>
                        <br />
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">Change Monthly Betting Limit</label>
                            <div className="col-md-3">
                            <div className="dropdown-section">
                                <select id="betLimitDropdown" className="limit-dropdown">
                                    <option value="100">$100</option>
                                    <option value="200">$200</option>
                                    <option value="300">$300</option>
                                    <option value="400">$400</option>
                                    <option value="500">$500</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            </div>
                            <div className="col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text limit-section-selection-width">$</span>
                                </div>
                                <input type="text" className="form-control limit-section-selection-width no-spinner" id="bet_limit_0" name="bet_limit" required />
                            </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="form-group row">
                            <label className="control-label col-sm-4 limit-left-section-label-width limit-acc-label-text">Enter OasisBet Account password</label>
                            <div className="col-md-3">
                            <input type="password" className="form-control limit-section-selection-width no-spinner" id="password_0" name="password" required />
                            </div>
                        </div>
                        <hr />
                        <div className="dialog-actions">
                            <button className="btn btn-danger btn-cancel" type="button">
                                Cancel
                            </button>
                            <button className="btn btn-success btn-confirm" type="button">
                                Confirm
                            </button>
                        </div>
                        <br />
                    </form>
                </Card.Body> 
            </Card>
        </div>
    );
}