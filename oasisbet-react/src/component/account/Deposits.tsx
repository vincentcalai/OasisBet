import React, { useEffect, useState } from "react";
import './Deposits.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants";
import { getSessionStorageOrDefault, useSessionStorage } from "../util/useSessionStorage.ts";
import ConfirmDialog from "../common/dialog/ConfirmDialog.tsx";
import { AccountModel, UpdateAccountModel } from "../../constants/MockData.js";
import { updateAccDetails } from "../../services/api/ApiService.js";

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

    useEffect(() => {
        console.log("accountDetails in Deposits: ", accountDetails);
        const { balance, mtdDepositAmt, depositLimit } = accountDetails || {};

        const displayRemDeposit = depositLimit - (mtdDepositAmt ?? 0);

        setBalance(balance != null ? balance.toFixed(2).toString() : 'NA');
        setMtdDepositAmt(displayRemDeposit != null ? displayRemDeposit.toFixed(2).toString() : '0.00');
        setAccountDetails(accountDetails);
    }, [accountDetails, setAccountDetails]);
    
    const onDepositAmtChange = (e) => {
        setDepositAmt(e.target.value);
        validateDepositAmt(e.target.value);
    }

    const validateDepositAmt = (amount) => {
        const pattern = /^(0(\.\d{1,2})?|[1-9]\d{0,8}(\.\d{1,2})?)$/;
        if(amount > 200000){
            setInputErrorMsg('Maximum amount to deposit is $199999.99');
            return false;
        } else if(!pattern.test(amount)) {
            console.log("pattern failed!")
            setInputErrorMsg('Please enter correct format');
            return false
        } 
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
      if (isFormValid) {
        console.log('Form is valid, submitting form to backend now');
        handleOpenDialog();
      } else {
        console.log('Form is invalid');
      }
    };
  
    const handleOpenDialog = () => {
      setDialogData({
        title: 'Confirm Deposit?',
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
              const response = await updateAccDetails(request);
              if(response.statusCode !== 0){
                console.log("Error depositing amount, response:", response);
                setErrorMsg(response.resultMessage);
              } else {
                //deposit amount success!
                console.log("Amount deposited successfully:", response);
                setAccountDetails(response.account);
                setSuccessMsg(response.resultMessage);
                setErrorMsg('');
              }
          } catch (error) {
              //TODO to change this error message to a generic error message shown as red banner
              console.error("Error in handling deposit:", error);
              setErrorMsg("Failed to deposit. Please try again.");
          }
        } else {
          console.log('Cancelled!');
        }
      };

    return (
        <div className="container-fluid">
            <br />
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
                            onClick={onCancel}>
                        Cancel
                        </button>
                        <button className="btn btn-success btn-confirm-action" type="button"
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