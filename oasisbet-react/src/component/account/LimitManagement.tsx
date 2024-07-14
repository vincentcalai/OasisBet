import React, { useEffect, useState } from "react";
import './LimitManagement.css';
import { Card, ProgressBar } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import { retrieveMtdAmounts } from "../../services/api/ApiService.ts";
import { useSessionStorage } from "../util/useSessionStorage.ts";

export default function LimitManagement(){
    const [accountDetails, setAccountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [mtdDepositAmt, setMtdDepositAmt] = useState('0.00');
    const [mtdBetAmt, setMtdBetAmt] = useState('0.00');
    const [depositProgress, setDepositProgress] = useState(0 as number);
    const [betProgress, setBetProgress] = useState(0 as number);

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        console.log("accountDetails in Deposits: ", accountDetails);
        const { accId, depositLimit, betLimit } = accountDetails || {};

        retrieveAccDetails(depositLimit, betLimit, accId);

        setAccountDetails(accountDetails);
    }, [accountDetails, setAccountDetails]);

    const retrieveAccDetails = async (depositLimit: number, betLimit: number, accId: string) => {
        try {
            const response: any = await retrieveMtdAmounts(accId);
            const mtdDepositAmt = response.account.mtdDepositAmt;
            const mtdBetAmt = response.account.mtdBetAmount;
            const depositProgress = mtdDepositAmt ? (mtdDepositAmt/depositLimit) * 100 : 0;
            const betProgress = mtdBetAmt ? (mtdBetAmt/betLimit) * 100 : 0;

            setMtdDepositAmt(mtdDepositAmt != null ? mtdDepositAmt.toFixed(2).toString() : '0.00');
            setMtdBetAmt(mtdBetAmt != null ? mtdBetAmt.toFixed(2).toString() : '0.00');
            setDepositProgress(depositProgress);
            setBetProgress(betProgress);
        } catch (error) {
            //TODO to change this error message to a generic error message shown as red banner
            console.error("Error in retrieve MTD amounts:", error);
            setErrorMsg("Error in retrieving Account Details. Please try again.");
        }
    } 

    return (
        <div className="container-fluid">
            <br />
            {successMsg && <div className="alert alert-success col-md-6 offset-md-3"><b>Success: </b>{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger col-md-6 offset-md-3"><b>Fail: </b>{errorMsg}</div>}
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
                            <ProgressBar now={depositProgress} />
                            <span>{depositProgress}%</span>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">${accountDetails.depositLimit}</label>
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
                            <ProgressBar now={betProgress} />
                            <span>{betProgress}%</span>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">${accountDetails.betLimit}</label>
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
                            <button className="btn btn-success btn-confirm-action" type="button">
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