import React, { useState } from "react";
import './AccountLanding.css';
import AccountLogin from "./AccountLogin.tsx";
import AccountSideNav from "../common/AccountSideNav.tsx";
import SharedVarConstants from "../../constants/SharedVarConstants.js";
import { Card } from "react-bootstrap";

export default function AccountLanding(){

    const isUserLoggedIn = false;

    const [accountMenuSelect, setAccountMenuSelect] = useState(SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_OVERVIEW);
    const [accountMenuHdr, setAccountMenuHdr] = useState(SharedVarConstants.ACCOUNT_OVERVIEW_HEADER);

    const onHandleAccountMenuSelection = (menuSelect) => {
        setAccountMenuHdr(retrieveAccountMenuHdr(SharedVarConstants, accountMenuSelect));
        setAccountMenuSelect(menuSelect);
    };

    function retrieveAccountMenuHdr(sharedVar, accountMenuSelect): string {
        switch(accountMenuSelect) { 
            case sharedVar.API_SOURCE_COMP_TYPE_EPL: { 
                return sharedVar.COMP_HEADER_EPL; 
            } 
            case sharedVar.API_SOURCE_COMP_TYPE_LALIGA: { 
                return sharedVar.COMP_HEADER_LALIGA; 
            } 
            case sharedVar.API_SOURCE_COMP_TYPE_BUNDESLIGA: {
                return sharedVar.COMP_HEADER_BUNDESLIGA; 
            }
            case sharedVar.API_SOURCE_COMP_TYPE_SERIE_A: {
                return sharedVar.COMP_HEADER_SERIE_A; 
            }
            case sharedVar.API_SOURCE_COMP_TYPE_LIGUE_ONE: {
                return sharedVar.COMP_HEADER_LIGUE_ONE; 
            }
            case sharedVar.API_SOURCE_COMP_TYPE_FA_CUP: {
                return sharedVar.COMP_HEADER_FA_CUP; 
            }
            case sharedVar.API_SOURCE_COMP_TYPE_EFL_CUP: {
                return sharedVar.COMP_HEADER_EFL_CUP; 
            }
            case sharedVar.API_SOURCE_COMP_TYPE_UCL: {
                return sharedVar.COMP_HEADER_UCL; 
            }
            default: {
                return '';
            }
        }
    }
    

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
                                <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                                    <Card.Header className="card-header">
                                        <h2>{accountMenuHdr}</h2>
                                    </Card.Header>
                                    <Card.Body className="card-body">
                                        
                                    </Card.Body> 
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}