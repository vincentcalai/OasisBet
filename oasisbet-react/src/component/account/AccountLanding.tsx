import React, { useState } from "react";
import './AccountLanding.css';
import AccountLogin from "./AccountLogin.tsx";
import AccountSideNav from "../common/AccountSideNav.tsx";
import SharedVarConstants from "../../constants/SharedVarConstants.js";
import AccountOverview from "./AccountOverview.tsx";
import TrxHist from "./TrxHist.tsx";
import AccountUpdate from "./AccountUpdate.tsx";
import Withdrawals from "./Withdrawals.tsx";
import Deposits from "./Deposits.tsx";
import LimitManagement from "./LimitManagement.tsx";

export default function AccountLanding(){

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [accountMenuSelect, setAccountMenuSelect] = useState(SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_OVERVIEW);

    const onHandleAccountMenuSelection = (menuSelect) => {
        setAccountMenuSelect(menuSelect);
    };

    function handleLogin(onLogin){
        console.log("in handleLogin: ", onLogin);
        setIsUserLoggedIn(onLogin);
    }

    return (
        <>
            {!isUserLoggedIn && <AccountLogin onLogin={handleLogin}></AccountLogin>}

            {isUserLoggedIn && 
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <AccountSideNav accountMenuSelect={accountMenuSelect} handleClick={onHandleAccountMenuSelection}>
                            </AccountSideNav>
                        </div>
                        <div className="col-10">
                            <div className="container-fluid">
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_OVERVIEW && <AccountOverview></AccountOverview>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_UPDATE && <AccountUpdate></AccountUpdate>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_TRX_HIST && <TrxHist></TrxHist>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_LIMIT_MGMT && <LimitManagement></LimitManagement>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_DEPOSITS && <Deposits></Deposits>}
                                {accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_WITHDRAWALS && <Withdrawals></Withdrawals>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}