import React, { useEffect, useState } from "react";
import './AccountOverview.css';
import { Card } from "react-bootstrap";
import { useSessionStorage } from "../util/useSessionStorage.ts";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import SharedVarMethods from "../../constants/SharedVarMethods.ts";
import { handleJwtTokenExpireError } from "../../services/AuthService.ts";
import { updateLoginDetails } from "../actions/LoginAction.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { retrieveYtdAmounts } from "../../services/api/ApiService.ts";


export default function AccountOverview(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [accountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [balance, setBalance] = useState('NA');
    const [ytdDepositAmt, setYtdDepositAmt] = useState('0.00');
    const [ytdWithdrawalAmt, setYtdWithdrawalAmt] = useState('0.00');

    useEffect(() => {
        console.log("accountDetails in AccountOverview: ", accountDetails);
        const { accId, balance } = accountDetails || {};
        setBalance(balance != null ? balance.toFixed(2).toString() : 'NA');

        retrieveAccDetails(accId);
    }, [accountDetails]);

    const retrieveAccDetails = async (accId: string) => {
        try {
            await callApiRetrieveYtdAmounts(accId);
        } catch (error) {
            //Try refresh JWT token if token expired
            try {
              await handleJwtTokenExpireError(error, async () => await callApiRetrieveYtdAmounts(accId))
            } catch (error) {
              console.log("Error when withdrawing after refresh token: ", error);
              SharedVarMethods.clearSessionStorage();
              dispatch(updateLoginDetails('isUserLoggedIn', false));
              navigate('/account', { state: { code: 1, message: SharedVarConstants.UNAUTHORIZED_ERR_MSG } });
            }
        }
    } 

    async function callApiRetrieveYtdAmounts(accId: string) {
        try {
            const response: any = await retrieveYtdAmounts(accId);
            const ytdDepositAmt = response.account.ytdDepositAmt;
            const ytdWithdrawalAmt = response.account.ytdWithdrawalAmt;
            
            setYtdDepositAmt((ytdDepositAmt ?? 0).toFixed(2));
            setYtdWithdrawalAmt((ytdWithdrawalAmt ?? 0).toFixed(2));
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="container-fluid">
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Account Overview</h2>
                </Card.Header>
                <Card.Body className="card-body">
                <label className="control-label">
                    Balance
                </label>
                <div className="dashboard-sidemenu-value">
                    ${balance}
                </div>
                <label className="control-label">
                    Deposit
                </label>
                <div className="dashboard-sidemenu-value">
                    ${ytdDepositAmt}
                </div>
                <div className="text_year_to_date">
                    (Year To Date)
                </div>
                <label className="control-label">
                    Withdrawal
                </label>
                <div className="dashboard-sidemenu-value">
                    ${ytdWithdrawalAmt}
                </div>
                <div className="text_year_to_date">
                    (Year To Date)
                </div>
                </Card.Body> 
            </Card>
        </div>
    );
}
