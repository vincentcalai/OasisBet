import React from 'react';
import './CompSideNav.css';
import SharedVarConstants from '../../constants/SharedVarConstants.ts';

function AccountSideNav({ accountMenuSelect, handleClick }) {
    return (
        <div className="sidebar">
            <ul>
                <li className={`sidebar-item ${accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_OVERVIEW ? 'highlightSideNav' : ''}`} onClick={() => handleClick(SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_OVERVIEW)}>{SharedVarConstants.ACCOUNT_OVERVIEW_HEADER}</li>
                <li className={`sidebar-item ${accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_UPDATE ? 'highlightSideNav' : ''}`} onClick={() => handleClick(SharedVarConstants.NAV_MENU_SELECT_ACCOUNT_UPDATE)}>{SharedVarConstants.ACCOUNT_UPDATE_HEADER}</li>
                <li className={`sidebar-item ${accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_TRX_HIST ? 'highlightSideNav' : ''}`} onClick={() => handleClick(SharedVarConstants.NAV_MENU_SELECT_TRX_HIST)}>{SharedVarConstants.TRANSACTION_HISTORY_HEADER}</li>
                <li className={`sidebar-item ${accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_LIMIT_MGMT ? 'highlightSideNav' : ''}`} onClick={() => handleClick(SharedVarConstants.NAV_MENU_SELECT_LIMIT_MGMT)}>{SharedVarConstants.LIMIT_MANAGEMENT_HEADER}</li>
                <li className={`sidebar-item ${accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_DEPOSITS ? 'highlightSideNav' : ''}`} onClick={() => handleClick(SharedVarConstants.NAV_MENU_SELECT_DEPOSITS)}>{SharedVarConstants.DEPOSIT_HEADER}</li>
                <li className={`sidebar-item ${accountMenuSelect === SharedVarConstants.NAV_MENU_SELECT_WITHDRAWALS ? 'highlightSideNav' : ''}`} onClick={() => handleClick(SharedVarConstants.NAV_MENU_SELECT_WITHDRAWALS)}>{SharedVarConstants.WITHDRAWALS_HEADER}</li>
            </ul>
        </div>
    );
}
  
export default AccountSideNav;