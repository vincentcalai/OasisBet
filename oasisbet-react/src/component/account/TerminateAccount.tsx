import React, { useState } from 'react';
import './TerminateAccount.css';
import { Card } from 'react-bootstrap';
import SharedVarConstants from '../../constants/SharedVarConstants.ts';
import ConfirmDialog from '../common/dialog/ConfirmDialog.tsx';
import SharedVarMethods from '../../constants/SharedVarMethods.ts';
import { updateAccDetails } from '../../services/api/ApiService.ts';
import { handleJwtTokenExpireError } from '../../services/AuthService.ts';
import { openAlert, updateLoginDetails } from '../actions/ReducerAction.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function TerminateAccount(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState({ title: '', type: '' });

    const handleOpenDialog = () => {
        setDialogData({
          title: SharedVarConstants.CFM_TERMINATE_ACC,
          type: SharedVarConstants.CFM_TERMINATE_ACC_TYPE
        });
        setDialogOpen(true);
      };

    const handleCloseDialog = async (result) => {
        setDialogOpen(false);
        if (result === 'confirm') {
          //TODO: to change this to user id
          const id = 1;
          try {
              await callApiTerminateAccount(id);
          } catch (error) {
              //Try refresh JWT token if token expired
              try {
                const response = await handleJwtTokenExpireError(error, async () => await callApiTerminateAccount(id))
                if(response){
                    console.log("General Error: ", error);
                    dispatch(openAlert(error.message));
                }
              } catch (error) {
                console.log("Error when terminating account after refresh token: ", error);
                SharedVarMethods.clearSessionStorage();
                dispatch(updateLoginDetails('isUserLoggedIn', false));
                navigate('/account', { state: { code: 1, message: SharedVarConstants.UNAUTHORIZED_ERR_MSG } });
              }
          }
        } else {
          console.log('Cancelled!');
        }
    };

    async function callApiTerminateAccount(request: number) {
        try {
            //TODO: change this to terminate account API
            const response = await updateAccDetails(request);
            if (response.statusCode !== 0) {
                console.log("Error terminating account, response:", response);
                setErrorMsg(response.resultMessage);
            } else {
                //withdraw amount success!
                console.log("Amount terminated successfully:", response);
                sessionStorage.setItem(SharedVarConstants.ACCOUNT_DETAILS, JSON.stringify(response.account));
                setSuccessMsg(response.resultMessage);
                setErrorMsg('');
            }
        } catch (error) {
            throw error;
        }
    }
    
    function handleCheckboxChange(event): void {
        setIsCheckboxChecked(event.target.checked);
        setIsConfirmDisabled(!event.target.checked);
    }

    return (
        <div className="container-fluid">
            {successMsg && <div className="alert alert-success col-md-6 offset-md-3"><b>Success: </b>{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger col-md-6 offset-md-3"><b>Fail: </b>{errorMsg}</div>}
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Terminate Account</h2>
                </Card.Header>
                <Card.Body className="card-body">
                    <br></br>
                    <div className="terminate-acc-text-block">
                        <p>
                            <b>OasisBet Account Closure Request</b>
                        </p>
                        <p>Before you submit this request, please make sure that you have withdrawn all funds from your Account.</p>
                        <p>If you have any existing product subscription, live streaming subscription and/or bank link, please note that these services will be terminated along with your Account closure.</p>
                    </div>
                    <hr />
                    <div className="terminate-acc-text-block">
                        <input 
                            className="form-check-input terminate-acc-checkbox-input"
                            type="checkbox" 
                            id="agreeTerms" 
                            onChange={handleCheckboxChange} 
                            checked={isCheckboxChecked} 
                        />
                        <label className="form-check-label terminate-acc-checkbox-label" htmlFor="agreeTerms">
                            I have read and understood the above and would like to proceed with my Account closure request.
                        </label>
                    </div>
                    <div className="dialog-actions">
                        <button className="btn btn-success btn-confirm-action" type="button" onClick={handleOpenDialog} disabled={isConfirmDisabled}>
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


