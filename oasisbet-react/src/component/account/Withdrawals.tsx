import React, { useEffect, useRef, useState } from "react";
import './Withdrawals.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import { updateAccountDetails, updateLoginDetails } from "../actions/ReducerAction.ts";
import { UpdateAccountModel, AccountModel, LoginCredentialsModel } from "../../constants/Modal.ts";
import { jwtAuthenticate, updateAccDetails } from "../../services/api/ApiService.ts";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../common/dialog/ConfirmDialog.tsx";
import {handleJwtTokenExpireError} from "../../services/AuthService.ts";
import { useNavigate } from "react-router-dom";
import SharedVarMethods from "../../constants/SharedVarMethods.ts";
import { closeAlert, openAlert } from "../actions/ReducerAction.ts";

export default function Withdrawals({handleNavToTrxHist}){
    const PASSWORD = 'PASSWORD';
    const WITHDRAWAL_AMT = 'WITHDRAWAL_AMT';

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState({ title: '', type: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accountDetails = useSelector((state: any) => state['accountDetails']) ;
    const [balance, setBalance] = useState('NA');
    const [withdrawalAmt, setWithdrawalAmt] = useState(0 as number);
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [inputErrorMsg, setInputErrorMsg] = useState('');

    const isWithdrawalAmtValid = useRef(false);

    useEffect(() => {
        dispatch(closeAlert());
        console.log("accountDetails in Withdrawals: ", accountDetails);
        const { balance } = accountDetails || {};

        setBalance(balance != null ? balance.toFixed(2).toString() : 'NA');
    }, [accountDetails, dispatch]);

    const onWithdrawalInputChange = (e, type) => {
        if(type === WITHDRAWAL_AMT) {
            validateWithdrawalAmt(e.target.value);
            setWithdrawalAmt(e.target.value);
        }
        if(type === PASSWORD) {
            setPassword(e.target.value);
        }
    }

    const validateWithdrawalAmt = (amount) => {
        const pattern = /^(0(\.\d{1,2})?|[1-9]\d{0,8}(\.\d{1,2})?)$/;
        if(amount >= 200000){
            setInputErrorMsg('Maximum amount to withdraw is $199999.99');
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

    const onCancel = () => {
        setWithdrawalAmt(0);
        setPassword('');
        setInputErrorMsg('');
        setSuccessMsg('');
        setErrorMsg('');
        isWithdrawalAmtValid.current = false;
    }

    const confirmSubmit = () => {
        setSuccessMsg('');
        setErrorMsg('');
        const isFormValid = validateWithdrawalAmt(withdrawalAmt);
        if(withdrawalAmt < 1) {
          setInputErrorMsg('Minimum amount to withdraw is $1');
          return false;
        }
        if (isFormValid) {
          console.log('Form is valid, submitting form to backend now');
          handleOpenDialog();
        } else {
          setInputErrorMsg('Withdrawal amount is invalid');
          console.log('Form is invalid');
        }
    };

    const handleOpenDialog = () => {
        setDialogData({
          title: SharedVarConstants.CFM_WITHDRAW_DIALOG_TITLE,
          type: SharedVarConstants.CFM_WITHDRAW_DIALOG_TYPE
        });
        setDialogOpen(true);
      };

    const handleCloseDialog = async (result) => {
        setDialogOpen(false);
        if (result === 'confirm') {
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
          const account: AccountModel = accountDetails;
          account['withdrawalAmt'] = withdrawalAmt;
          account['actionType'] = 'W';
          request.account = account;
    
          try {
              await callApiUpdateAccDetails(request);
          } catch (error) {
              //Try refresh JWT token if token expired
              try {
                const response = await handleJwtTokenExpireError(error, async () => await callApiUpdateAccDetails(request))
                if(response){
                    console.log("General Error: ", error);
                    dispatch(openAlert(error.message));
                }
              } catch (error) {
                console.log("Error when withdrawing after refresh token: ", error);
                SharedVarMethods.clearSessionStorage();
                dispatch(updateLoginDetails('isUserLoggedIn', false));
                navigate('/account', { state: { code: 1, message: SharedVarConstants.UNAUTHORIZED_ERR_MSG } });
              }
          }
        } else {
          console.log('Cancelled!');
        }
    };

    async function callApiUpdateAccDetails(request: UpdateAccountModel) {
        try {
            const response = await updateAccDetails(request);
            if (response.statusCode !== 0) {
                console.log("Error withdraw amount, response:", response);
                setErrorMsg(response.resultMessage);
            } else {
                //withdraw amount success!
                console.log("Amount withdrew successfully:", response);
                dispatch(updateAccountDetails('accountDetails', response.account))
                dispatch(updateLoginDetails('balance', response.account?.balance));
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
                        <label id="WITHDRAWAL_LABEL_1" htmlFor="withdrawalAmt_0" className="control-label col-sm-4 withdraw-section-label-width withdraw-acc-label-text">
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
                        <label id="PASSWORD_LABEL_1" htmlFor="password_0" className="control-label col-sm-4 withdraw-section-label-width withdraw-acc-label-text">
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
                            disabled={!isWithdrawalAmtValid.current || password === ''}
                            onClick={onCancel}>
                        Cancel
                        </button>
                        <button className="btn btn-success btn-confirm-action" type="button" 
                            disabled={!isWithdrawalAmtValid.current || password === ''}
                            onClick={confirmSubmit}>
                        Confirm
                        </button>
                    </div>
                    <br />
                </Card.Body> 
            </Card>

            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                data={dialogData} />
        </div>
    );
}


