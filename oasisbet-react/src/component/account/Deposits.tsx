import React from "react";
import './Deposits.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants";

export default function Deposits({handleNavToTrxHist}){

    return (
        <div className="container-fluid">
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Deposits</h2>
                </Card.Header>
                <Card.Body className="card-body">
                    <label className="control-label col-xs-6 col-sm-3 col-md-3 deposit-section-label-width">Balance:</label>
                        <span className="col-xs-6 col-sm-3 col-md-2 deposit-section-selection-width">$100.00</span>
                        <br />
                        <br />
                    <label className="control-label col-xs-6 col-sm-3 col-md-3 deposit-section-label-width">Deposit Remaining Limit:</label>
                    <span className="col-xs-6 col-sm-3 col-md-2 deposit-section-selection-width">
                        $1000.00
                    </span>
                    <br />
                    <br />
                    <span className="control-label check-trx-hist-note">
                        Note: Check <span className="link-style"  onClick={() => handleNavToTrxHist(SharedVarConstants.NAV_MENU_SELECT_TRX_HIST)}>transaction history</span> for more details.
                    </span>
                    <hr />
                    <form>
                        <div className="form-group row">
                            <label
                                id="DEPOSIT_LABEL_1"
                                htmlFor="deposit_0_Label"
                                className="control-label col-sm-4 deposit-section-label-width deposit-acc-label-text"
                            >
                                <span id="DEPOSIT">Deposit:</span>
                            </label>
                            <div className="col-sm-4">
                                <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input
                                    id="depositAmt_0"
                                    type="text"
                                    className="form-control allCaps"
                                    name="depositAmt"
                                    inputMode="numeric"
                                />
                                </div>
                            </div>
                            </div>
                        </form>
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
                </Card.Body> 
            </Card>
        </div>
    );
}