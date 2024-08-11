import React, { useState } from "react";
import './AccountLanding.css';
import AccountLogin from "./AccountLogin.tsx";
import AccountSideNav from "../common/AccountSideNav.tsx";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import AccountOverview from "./AccountOverview.tsx";
import TrxHist from "./TrxHist.tsx";
import AccountUpdate from "./AccountUpdate.tsx";
import Withdrawals from "./Withdrawals.tsx";
import Deposits from "./Deposits.tsx";
import LimitManagement from "./LimitManagement.tsx";
import { useSelector } from "react-redux";
import AlertError from "../util/AlertError.tsx";
import TerminateAccount from "./TerminateAccount.tsx";

export default function AccountLanding(){

    const isUserLoggedIn = useSelector((state: any) => state['login']['isUserLoggedIn']) ;
    const [accountMenuSelect, setAccountMenuSelect] = useState(SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_OVERVIEW);

    const onHandleAccountMenuSelection = (menuSelect) => {
        setAccountMenuSelect(menuSelect);
    };

    return (
        <>
            {!isUserLoggedIn && <AccountLogin></AccountLogin>}

            {isUserLoggedIn && 
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <AccountSideNav accountMenuSelect={accountMenuSelect} handleClick={onHandleAccountMenuSelection}>
                            </AccountSideNav>
                        </div>
                        <div className="col-10">
                            <div className="container-fluid">
                                <br />
                                <AlertError></AlertError>
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_OVERVIEW && <AccountOverview></AccountOverview>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_UPDATE && <AccountUpdate></AccountUpdate>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_TRX_HIST && <TrxHist></TrxHist>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_LIMIT_MGMT && <LimitManagement></LimitManagement>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_DEPOSITS && <Deposits handleNavToTrxHist={onHandleAccountMenuSelection}></Deposits>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_WITHDRAWALS && <Withdrawals handleNavToTrxHist={onHandleAccountMenuSelection}></Withdrawals>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_TERMINATE_ACCOUNT && <TerminateAccount></TerminateAccount>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}