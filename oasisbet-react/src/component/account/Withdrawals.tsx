import React, { useEffect, useRef, useState } from "react";
import './Withdrawals.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants";
import { useSessionStorage } from "../util/useSessionStorage.ts";

export default function Withdrawals({handleNavToTrxHist}){
    const PASSWORD = 'PASSWORD';
    const WITHDRAWAL_AMT = 'WITHDRAWAL_AMT';

    const [accountDetails, setAccountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [balance, setBalance] = useState('NA');
    const [withdrawalAmt, setWithdrawalAmt] = useState(0 as number);
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [inputErrorMsg, setInputErrorMsg] = useState('');

    const isWithdrawalAmtValid = useRef(false);

    useEffect(() => {
        console.log("accountDetails in Withdrawals: ", accountDetails);
        const { balance } = accountDetails || {};

        setBalance(balance != null ? balance.toFixed(2).toString() : 'NA');
        setAccountDetails(accountDetails);
    }, [accountDetails, setAccountDetails]);

    const onWithdrawalInputChange = (e, type) => {
        if(type === WITHDRAWAL_AMT) {
            setWithdrawalAmt(e.target.value);
        }
        if(type === PASSWORD) {
            setPassword(e.target.value);
        }
        validateWithdrawalAmt(e.target.value);
    }

    const validateWithdrawalAmt = (amount) => {
        const pattern = /^(0(\.\d{1,2})?|[1-9]\d{0,8}(\.\d{1,2})?)$/;
        if(amount > 200000){
            setInputErrorMsg('Maximum amount to deposit is $199999.99');
            isWithdrawalAmtValid.current = false;
            return false;
        } else if(!pattern.test(amount)) {
            console.log("pattern failed!")
            isWithdrawalAmtValid.current = false;
            setInputErrorMsg('Please enter correct format');
            return false;
        } 
        isWithdrawalAmtValid.current = true;
        setInputErrorMsg('');
        return true;
    }

    return (
        <div className="container-fluid">
            {successMsg && <div className="alert alert-success col-md-6 offset-md-3"><b>Success: </b>{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger col-md-6 offset-md-3"><b>Fail: </b>{errorMsg}</div>}
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Withdrawals</h2>
                </Card.Header>
                <Card.Body className="card-body">
                <label className="control-label col-xs-6 col-sm-3 col-md-3 withdraw-section-label-width">Balance:</label>
                    <span className="col-xs-6 col-sm-3 col-md-2 withdraw-section-selection-width">${balance}</span>
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
                            <input id="withdrawalAmt_0" type="text" className="form-control allCaps" name="withdrawalAmt" 
                            onChange={(e) => onWithdrawalInputChange(e, WITHDRAWAL_AMT)}
                            value={withdrawalAmt === 0 ? '' : withdrawalAmt}/>
                            </div>
                            <label id="input_error_0" className={`error-text ${inputErrorMsg ? 'highlightLabel' : ''}`} htmlFor="input_0">
                                {inputErrorMsg}
                            </label>
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
                            <input type="password" className="form-control withdraw-section-selection-width no-spinner" 
                            id="password_0" 
                            name="password" 
                            onChange={(e) => onWithdrawalInputChange(e, PASSWORD)}
                            value={password}
                            required />
                            </div>
                        </div>
                        </div>
                    </form>
                    <hr />
                    <div className="dialog-actions">
                        <button className="btn btn-danger btn-cancel" type="button" 
                            disabled={!isWithdrawalAmtValid}
                            onClick={() => {
                                setWithdrawalAmt(0);
                                setPassword('');
                            }}>
                        Cancel
                        </button>
                        <button className="btn btn-success btn-confirm-action" type="button" 
                            disabled={!isWithdrawalAmtValid}
                            onClick={() => {/* confirmClicked() */}}>
                        Confirm
                        </button>
                    </div>
                    <br />
                </Card.Body> 
            </Card>
        </div>
    );
}