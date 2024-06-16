import React, { useEffect, useState } from "react";
import './AccountOverview.css';
import { Card } from "react-bootstrap";
import { useSessionStorage } from "../util/useSessionStorage.ts";
import SharedVarConstants from "../../constants/SharedVarConstants.js";
import { AccountModel } from "../../constants/MockData.js";


export default function AccountOverview(){
    const [accountDetails, setAccountDetails] = useSessionStorage<AccountModel>(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [balance, setBalance] = useState('NA');
    const [ytdDepositAmt, setYtdDepositAmt] = useState('0.00');
    const [ytdWithdrawalAmt, setYtdWithdrawalAmt] = useState('0.00');

    useEffect(() => {
        console.log("accountDetails: ", accountDetails);
        const { account } = accountDetails || {};
        const { balance, ytdDepositAmt, ytdWithdrawalAmt } = account || {};

        setBalance((balance ?? 'NA').toString());
        setYtdDepositAmt((ytdDepositAmt ?? 0).toFixed(2));
        setYtdWithdrawalAmt((ytdWithdrawalAmt ?? 0).toFixed(2));
        setAccountDetails(accountDetails);
    }, [accountDetails, setAccountDetails]);

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
