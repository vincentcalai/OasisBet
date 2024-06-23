import React from "react";
import './Withdrawals.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants";

export default function Withdrawals({handleNavToTrxHist}){

    return (
        <div className="container-fluid">
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Withdrawals</h2>
                </Card.Header>
                <Card.Body className="card-body">
                <label className="control-label col-xs-6 col-sm-3 col-md-3 withdraw-section-label-width">Balance:</label>
                    <span className="col-xs-6 col-sm-3 col-md-2 withdraw-section-selection-width">$100.00</span>
                    <br />
                    <br />
                    <span className="control-label check-trx-hist-note">
                        Note: Check <span className="link-style" onClick={() => handleNavToTrxHist(SharedVarConstants.NAV_MENU_SELECT_TRX_HIST)}>transaction history</span> for more details.
                    </span>
                    <hr />
                    <form>
                        <div className="form-group row">
                        <label id="WITHDRAWAL_LABEL_1" htmlFor="withdrawal_0_Label" className="control-label col-sm-4 withdraw-section-label-width withdraw-acc-label-text">
                            <span id="WITHDRAWAL">Withdraw from OasisBet Account:</span>
                        </label>
                        <div className="col-sm-4">
                            <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">$</span>
                            </div>
                            <input id="withdrawalAmt_0" type="text" className="form-control allCaps" name="withdrawalAmt" />
                            </div>
                        </div>
                        </div>
                        <br />
                        <div className="form-group row">
                        <label id="PASSWORD_LABEL_1" htmlFor="password_0_Label" className="control-label col-sm-4 withdraw-section-label-width withdraw-acc-label-text">
                            <span id="PASSWORD">Enter OasisBet Account password:</span>
                        </label>
                        <div className="col-sm-4">
                            <div className="input-group">
                            <div className="input-group-prepend"></div>
                            <input type="password" className="form-control withdraw-section-selection-width no-spinner" id="password_0" name="password" required />
                            </div>
                        </div>
                        </div>
                    </form>
                    <hr />
                    <div className="dialog-actions">
                        <button className="btn btn-danger btn-cancel" type="button" onClick={() => {/* onCancelWithdrawal() */}}>
                        Cancel
                        </button>
                        <button className="btn btn-success btn-confirm-action" type="button" onClick={() => {/* confirmClicked() */}}>
                        Confirm
                        </button>
                    </div>
                    <br />
                </Card.Body> 
            </Card>
        </div>
    );
}