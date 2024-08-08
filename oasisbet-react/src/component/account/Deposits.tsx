import React, { useEffect, useRef, useState } from "react";
import './Deposits.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import { getSessionStorageOrDefault, useSessionStorage } from "../util/useSessionStorage.ts";
import ConfirmDialog from "../common/dialog/ConfirmDialog.tsx";
import { AccountModel, UpdateAccountModel } from "../../constants/MockData.ts";
import { updateAccDetails, retrieveMtdAmounts } from "../../services/api/ApiService.ts";
import { updateLoginDetails } from "../actions/LoginAction.ts";
import { useDispatch } from "react-redux";
import SharedVarMethods from "../../constants/SharedVarMethods.ts";
import { handleJwtTokenExpireError } from "../../services/AuthService.ts";
import { useNavigate } from "react-router-dom";

export default function Deposits({handleNavToTrxHist}){
    const [accountDetails, setAccountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [balance, setBalance] = useState('NA');
    const [mtdDepositAmt, setMtdDepositAmt] = useState('0.00');
    const [depositAmt, setDepositAmt] = useState(0 as number);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState({ title: '', type: '' });
    const [inputErrorMsg, setInputErrorMsg] = useState('');
    
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const isDepositAmtValid = useRef(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("accountDetails in Deposits: ", accountDetails);
        const { accId, balance, depositLimit } = accountDetails || {};

        retrieveAccDetails(depositLimit, accId);

        setBalance(balance != null ? balance.toFixed(2).toString() : 'NA');
        setAccountDetails(accountDetails);
    }, [accountDetails, setAccountDetails]);
    
    const retrieveAccDetails = async (depositLimit: number, accId: string) => {
        try {
            const response: any = await retrieveMtdAmounts(accId);
            const mtdDepositAmt = response.account.mtdDepositAmt;
            const displayRemDeposit = depositLimit - (mtdDepositAmt ?? 0);
            setMtdDepositAmt(displayRemDeposit != null ? displayRemDeposit.toFixed(2).toString() : '0.00');
        } catch (error) {
            //TODO to change this error message to a generic error message shown as red banner
            console.error("Error in retrieve MTD amounts:", error);
            setErrorMsg("Error in retrieving Account Details. Please try again.");
        }
    } 

    const onDepositAmtChange = (e) => {
        setDepositAmt(e.target.value);
        validateDepositAmt(e.target.value);
    }

    const validateDepositAmt = (amount) => {
        const pattern = /^(0(\.\d{1,2})?|[1-9]\d{0,8}(\.\d{1,2})?)$/;
        if(amount > 200000){
            setInputErrorMsg('Maximum amount to deposit is $199999.99');
            isDepositAmtValid.current = false;
            return false;
        } else if(!pattern.test(amount)) {
            console.log("pattern failed!")
            isDepositAmtValid.current = false;
            setInputErrorMsg('Please enter correct format');
            return false
        } 
        isDepositAmtValid.current = true;
        setInputErrorMsg('');
        return true;
    }

    const onCancel = () => {
        setDepositAmt(0);
        setInputErrorMsg('');
        setSuccessMsg('');
        setErrorMsg('');
    }

    const confirmSubmit = () => {
      const isFormValid = validateDepositAmt(depositAmt);
      if(depositAmt < 1) {
        setInputErrorMsg('Minimum amount to deposit is $1');
        return false;
      }
      if (isFormValid) {
        console.log('Form is valid, submitting form to backend now');
        handleOpenDialog();
      } else {
        setInputErrorMsg('Deposit amount is invalid');
        console.log('Form is invalid');
      }
    };
  
    const handleOpenDialog = () => {
      setDialogData({
        title: SharedVarConstants.CFM_DEPOSIT_DIALOG_TITLE,
        type: SharedVarConstants.CFM_DEPOSIT_DIALOG_TYPE,
      });
      setDialogOpen(true);
    };

    const handleCloseDialog = async (result) => {
        setDialogOpen(false);
        if (result === 'confirm') {
          console.log('Confirmed!');
          const request: UpdateAccountModel = new UpdateAccountModel();
          const account: AccountModel = getSessionStorageOrDefault(SharedVarConstants.ACCOUNT_DETAILS, {});
          account['depositAmt'] = depositAmt;
          account['actionType'] = 'D';
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

    async function callApiUpdateAccDetails(request: UpdateAccountModel) {
        try {
            const response = await updateAccDetails(request);
            if (response.statusCode !== 0) {
                console.log("Error depositing amount, response:", response);
                setErrorMsg(response.resultMessage);
            } else {
                //deposit amount success!
                console.log("Amount deposited successfully:", response);
                sessionStorage.setItem(SharedVarConstants.ACCOUNT_DETAILS, JSON.stringify(response.account));
                dispatch(updateLoginDetails('balance', response.account?.balance));
                setAccountDetails(response.account);
                setSuccessMsg(response.resultMessage);
                setErrorMsg('');
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
                    <h2>Deposits</h2>
                </Card.Header>
                <Card.Body className="card-body">
                    <label className="control-label col-xs-6 col-sm-3 col-md-3 deposit-section-label-width">Balance:</label>
                        <span className="col-xs-6 col-sm-3 col-md-2 deposit-section-selection-width">${balance}</span>
                        <br />
                        <br />
                    <label className="control-label col-xs-6 col-sm-3 col-md-3 deposit-section-label-width">Deposit Remaining Limit:</label>
                    <span className="col-xs-6 col-sm-3 col-md-2 deposit-section-selection-width">
                        ${mtdDepositAmt}
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
                                    onChange={onDepositAmtChange}
                                    value={depositAmt === 0 ? '' : depositAmt}
                                />
                                </div>
                                <label id="input_error_0" className={`error-text ${inputErrorMsg ? 'highlightLabel' : ''}`} htmlFor="input_0">
                                    {inputErrorMsg}
                                </label>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <div className="dialog-actions">
                        <button className="btn btn-danger btn-cancel" type="button"
                            disabled ={!isDepositAmtValid.current}
                            onClick={onCancel}>
                        Cancel
                        </button>
                        <button className="btn btn-success btn-confirm-action" type="button"
                            disabled ={!isDepositAmtValid.current}
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


