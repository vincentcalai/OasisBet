import React, { useEffect, useState } from "react";
import './LimitManagement.css';
import { Card, OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import { jwtAuthenticate, retrieveMtdAmounts, updateAccDetails } from "../../services/api/ApiService.ts";
import { getSessionStorageOrDefault, useSessionStorage } from "../util/useSessionStorage.ts";
import ConfirmDialog from "../common/dialog/ConfirmDialog.tsx";
import { AccountModel, LoginCredentialsModel, UpdateAccountModel } from "../../constants/MockData.ts";
import SharedVarMethods from "../../constants/SharedVarMethods.ts";
import { handleJwtTokenExpireError } from "../../services/AuthService.ts";
import { updateLoginDetails } from "../actions/LoginAction.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LimitManagement(){
    const DEPOSIT = 'deposit';
    const BET = 'bet';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [accountDetails, setAccountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [mtdDepositAmt, setMtdDepositAmt] = useState('0.00');
    const [mtdBetAmt, setMtdBetAmt] = useState('0.00');
    const [depositProgress, setDepositProgress] = useState(0 as number);
    const [betProgress, setBetProgress] = useState(0 as number);
    const [password, setPassword] = useState('');
    const [depositErrorMsg, setDepositErrorMsg] = useState('');
    const [betErrorMsg, setBetErrorMsg] = useState('');

    const [selectedDepositOption, setSelectedDepositOption] = useState('300');
    const [selectedBetOption, setSelectedBetOption] = useState('100');

    const [selectedDepositAmt, setSelectedDepositAmt] = useState('300');
    const [selectedBetAmt, setSelectedBetAmt] = useState('100');

    const [isDepositAmtInputDisabled, setIsDepositAmtInputDisabled] = useState(true);
    const [isBetAmtInputDisabled, setIsBetAmtInputDisabled] = useState(true);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState({ title: '', type: '' });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        console.log("accountDetails in Limit Management: ", accountDetails);
        const { accId, depositLimit, betLimit } = accountDetails || {};

        const retrieveAccDetails = async (depositLimit: number, betLimit: number, accId: string) => {
            try {
                await callApiRetrieveMtdAmounts(depositLimit, betLimit, accId);
            } catch (error) {
                //Try refresh JWT token if token expired
                try {
                    const response = await handleJwtTokenExpireError(error, async () => await callApiRetrieveMtdAmounts(depositLimit, betLimit, accId))
                    if(response){
                        //TODO: Throw general error message here
                        console.log("General Error: ", error);
                    }
                } catch (error) {
                  console.log("Error when retriving MTD amounts after refresh token: ", error);
                  SharedVarMethods.clearSessionStorage();
                  dispatch(updateLoginDetails('isUserLoggedIn', false));
                  navigate('/account', { state: { code: 1, message: SharedVarConstants.UNAUTHORIZED_ERR_MSG } });
                }
            }
        }

        retrieveAccDetails(depositLimit, betLimit, accId);

        setAccountDetails(accountDetails);
        setSelectedDepositOption('300');
        setSelectedBetOption('100');
        setSelectedDepositAmt('300');
        setSelectedBetAmt('100');
        setIsDepositAmtInputDisabled(true);
        setIsBetAmtInputDisabled(true);
    }, [accountDetails, setAccountDetails, dispatch, navigate]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleInputLimitChange = (e, type) => {
        const value = e.target.value;
        const isOtherSelected = value === 'other';
        const newValue = isOtherSelected ? '' : value;
    
        if (type === DEPOSIT) {
            const depositAmt = isOtherSelected ? '' : newValue;
            setSelectedDepositAmt(depositAmt);
            setSelectedDepositOption(newValue);
            setIsDepositAmtInputDisabled(!isOtherSelected);
            setDepositErrorMsg('');
        } else if (type === BET) {
            const betAmt = isOtherSelected ? '' : newValue;
            setSelectedBetAmt(betAmt);
            setSelectedBetOption(newValue);
            setIsBetAmtInputDisabled(!isOtherSelected);
            setBetErrorMsg('');
        }
    };

    const validateInput = (amount, type) => {
        const pattern = /^(0(\.\d{1,2})?|[1-9]\d{0,8}(\.\d{1,2})?)$/;
        let errorMsg = '';
    
        if (amount > 200000) {
            errorMsg = 'Maximum amount to set is $199999.99';
        } else if (!pattern.test(amount)) {
            errorMsg = 'Please enter correct format';
        }
    
        if (type === DEPOSIT) {
            setDepositErrorMsg(errorMsg);
        } else if (type === BET) {
            setBetErrorMsg(errorMsg);
        }
    
        return;
    };

    const onChangeInputAmount = (e, type) => {
        validateInput(e.target.value, type);
        if(type === DEPOSIT){
            setSelectedDepositAmt(e.target.value)
        } else if(type === BET){
            setSelectedBetAmt(e.target.value)
        }
    }

    const isDisabled = (): boolean => {
        return !selectedDepositAmt || !selectedBetAmt || !password || Boolean(betErrorMsg) || Boolean(depositErrorMsg);
    };
    
    
    const onCancel = () => {
        setSelectedDepositOption('300');
        setSelectedDepositAmt('300');
        setSelectedBetOption('100');
        setSelectedBetAmt('100');
        setPassword('');
        setIsDepositAmtInputDisabled(true);
        setIsBetAmtInputDisabled(true);
        setErrorMsg('');
        setSuccessMsg('');
        setDepositErrorMsg('');
        setBetErrorMsg('');
    }

    const confirmSubmit = () => {
        if (selectedDepositOption === '' && selectedDepositAmt === ''){
            setDepositErrorMsg('Deposit Limit is required'); 
            console.log('Form is invalid');
            return; 
        } else if (selectedBetOption === '' && selectedBetAmt === ''){
            setBetErrorMsg('Bet Limit is required');
            console.log('Form is invalid');
            return; 
        }
        handleOpenDialog();
    }

    const handleOpenDialog = () => {
        setDialogData({
          title: SharedVarConstants.CFM_CHANGE_LIMIT_DIALOG_TITLE,
          type: SharedVarConstants.CFM_CHANGE_LIMIT_DIALOG_TYPE,
        });
        setDialogOpen(true);
    };

    const handleCloseDialog = async (result) => {
        setDialogOpen(false);
        if (result === 'confirm') {
          console.log('Confirmed!');
          const username = sessionStorage.getItem(SharedVarConstants.AUTH_USER);
          if(!username){
            console.log("Username is not found in session storage");
            return;
          }  
          const loginCredentialModel = new LoginCredentialsModel(username, password);
          try {
            const response = await jwtAuthenticate(loginCredentialModel, dispatch);
            if(!response){
                console.log("Invalid Credential! Response: ", response);
                setPassword('');
                setErrorMsg(SharedVarConstants.INCORRECT_PW_ERR_MSG);
                return;
            }
            console.log("Login response: ", response);
          } catch (error) {
            setPassword('');
            setErrorMsg(SharedVarConstants.INCORRECT_PW_ERR_MSG);
            console.log("Invalid Credential, ", error);
            return;
          }

          const request: UpdateAccountModel = new UpdateAccountModel();
          const account: AccountModel = getSessionStorageOrDefault(SharedVarConstants.ACCOUNT_DETAILS, {});
          account['betLimit'] = +selectedBetAmt;
          account['depositLimit'] = +selectedDepositAmt;
          account['actionType'] = 'L';
          request.account = account;
    
          try {
            await callApiUpdateAccDetails(request);
          } catch (error) {
          //Try refresh JWT token if token expired
            try {
                const response = await handleJwtTokenExpireError(error, async () => await callApiUpdateAccDetails(request))
                if(response){
                    //TODO: Throw general error message here
                    console.log("General Error: ", error);
                }
            } catch (error) {
            console.log("Error when updating account details after refresh token: ", error);
            SharedVarMethods.clearSessionStorage();
            dispatch(updateLoginDetails('isUserLoggedIn', false));
            navigate('/account', { state: { code: 1, message: SharedVarConstants.UNAUTHORIZED_ERR_MSG } });
            }
          }
        } else {
          console.log('Cancelled!');
        }
    };

    async function callApiRetrieveMtdAmounts(depositLimit: number, betLimit: number, accId: string) {
        try {
            const response: any = await retrieveMtdAmounts(accId);
            const mtdDepositAmt = response.account.mtdDepositAmt;
            const mtdBetAmt = response.account.mtdBetAmount;
            const depositProgress = mtdDepositAmt ? (mtdDepositAmt/depositLimit) * 100 : 0;
            const betProgress = mtdBetAmt ? (mtdBetAmt/betLimit) * 100 : 0;

            setMtdDepositAmt(mtdDepositAmt != null ? mtdDepositAmt.toFixed(2).toString() : '0.00');
            setMtdBetAmt(mtdBetAmt != null ? mtdBetAmt.toFixed(2).toString() : '0.00');
            setDepositProgress(depositProgress != null ? Number(depositProgress.toFixed(2)) : 0);
            setBetProgress(betProgress != null ? Number(betProgress.toFixed(2)) : 0);
        } catch (error) {
            throw error;
        }
    }

    async function callApiUpdateAccDetails(request: UpdateAccountModel) {
        try {
            const response = await updateAccDetails(request);
            if(response.statusCode !== 0){
            console.log("Error setting deposit/bet limit, response:", response);
            setErrorMsg(response.resultMessage);
            } else {
            //set bet and deposit limit success!
            console.log("Set deposit/bet limit successfully:", response);
            sessionStorage.setItem(SharedVarConstants.ACCOUNT_DETAILS, JSON.stringify(response.account));
            setAccountDetails(response.account);
            setSuccessMsg(response.resultMessage);
            setErrorMsg('');
            setPassword('');
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="container-fluid">
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
                            <div className="col-sm-6 col-md-6 progress-bar-section">
                            <OverlayTrigger 
                                placement="top"
                                overlay={
                                <Tooltip id={`tooltip-top`}>
                                    {'$' + mtdDepositAmt}
                                </Tooltip>
                                }
                            >
                                <ProgressBar now={depositProgress} />
                            </OverlayTrigger>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">Current Limit</label>
                        </div>
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">$0.00</label>
                            <div className="col-sm-6 col-md-6">
                                <span>{depositProgress}%</span>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">${accountDetails.depositLimit}</label>
                        </div>
                        <br />
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">Change Monthly Deposit Limit</label>
                            <div className="col-md-3">
                            <div className="dropdown-section">
                                <select id="depositLimitDropdown" className="limit-dropdown"
                                    value={selectedDepositOption || 'other'} onChange={(e) => handleInputLimitChange(e, DEPOSIT)}>
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
                                <input type="text" className="form-control limit-left-section-selection-width no-spinner" 
                                id="deposit_limit_0" name="deposit_limit" 
                                value={selectedDepositAmt}
                                onChange={(e) => onChangeInputAmount(e, DEPOSIT)}
                                disabled={isDepositAmtInputDisabled} required />
                                <label id="input_error_0" className={`error-text ${depositErrorMsg ? 'highlightLabel' : ''}`} htmlFor="input_0">
                                    {depositErrorMsg}
                                </label>
                            </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">Bets</label>
                            <div className="col-sm-6 col-md-6 progress-bar-section">
                            <OverlayTrigger 
                                placement="top"
                                overlay={
                                <Tooltip id={`tooltip-top`}>
                                    {'$' + mtdBetAmt}
                                </Tooltip>
                                }
                            >
                                <ProgressBar now={betProgress} />
                            </OverlayTrigger>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">Current Limit</label>
                        </div>
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">$0.00</label>
                            <div className="col-sm-6 col-md-6">
                                <span>{betProgress}%</span>
                            </div>
                            <label className="control-label col-sm-3 col-md-3 limit-right-section-label-width">${accountDetails.betLimit}</label>
                        </div>
                        <br />
                        <div className="row">
                            <label className="control-label col-sm-3 col-md-3 limit-left-section-label-width">Change Monthly Betting Limit</label>
                            <div className="col-md-3">
                            <div className="dropdown-section">
                                <select id="betLimitDropdown" className="limit-dropdown"
                                    value={selectedBetOption || 'other' } onChange={(e) => handleInputLimitChange(e, BET)}>
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
                                    <input type="text" className="form-control limit-section-selection-width no-spinner" 
                                    id="bet_limit_0" name="bet_limit" 
                                    value={selectedBetAmt} 
                                    onChange={(e) => onChangeInputAmount(e, BET)}
                                    disabled={isBetAmtInputDisabled} required />
                                    <label id="input_error_0" className={`error-text ${betErrorMsg ? 'highlightLabel' : ''}`} htmlFor="input_0">
                                        {betErrorMsg}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="form-group row">
                            <label className="control-label col-sm-4 limit-left-section-label-width limit-acc-label-text">Enter OasisBet Account password</label>
                            <div className="col-md-3">
                            <input type="password" className="form-control limit-section-selection-width no-spinner" 
                            id="password_0" name="password" 
                            onChange={handlePasswordChange}
                            value={password}
                            required />
                            </div>
                        </div>
                        <hr />
                        <div className="dialog-actions">
                            <button className="btn btn-danger btn-cancel" type="button" onClick={onCancel}
                                disabled={isDisabled()}>
                                Cancel
                            </button>
                            <button className="btn btn-success btn-confirm-action" type="button" onClick={confirmSubmit}
                                disabled={isDisabled()}>
                                Confirm
                            </button>
                        </div>
                        <br />
                    </form>
                </Card.Body> 
            </Card>

            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                data={dialogData} />
        </div>
    );
}