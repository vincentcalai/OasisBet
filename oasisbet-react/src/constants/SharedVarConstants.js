const SharedVarConstants = {
    GENERAL_SYS_DOWN_ERR_MSG: "This system is currently not available. Please try again at a later time.",
    BET_TYPE_CD_H2H: "01",
    BET_SELECTION_H2H_HOME: "01",
    BET_SELECTION_H2H_DRAW: "02",
    BET_SELECTION_H2H_AWAY: "03",
    BET_TYPE_H2H_NAME: "1X2",
    DRAW_RESULT: "Draw",
    SETTLED: "Settled",
    NOT_SETTLED: "Not Settled",
    BET_SLIP_MAX_ALLOWED_BET: 5,

    //Odds Constants

    API_SOURCE_COMP_TYPE_EPL: "soccer_epl",
    API_SOURCE_COMP_TYPE_LALIGA: "soccer_spain_la_liga",
    API_SOURCE_COMP_TYPE_BUNDESLIGA: "soccer_germany_bundesliga",
    API_SOURCE_COMP_TYPE_SERIE_A: "soccer_italy_serie_a",
    API_SOURCE_COMP_TYPE_LIGUE_ONE: "soccer_france_ligue_one",
    API_SOURCE_COMP_TYPE_FA_CUP: "soccer_fa_cup",
    API_SOURCE_COMP_TYPE_EFL_CUP: "soccer_efl_cup",
    API_SOURCE_COMP_TYPE_UCL: "soccer_uefa_champs_league",

    COMP_HEADER_EPL: "English Premier League",
    COMP_HEADER_LALIGA: "La Liga",
    COMP_HEADER_BUNDESLIGA: "Bundesliga",
    COMP_HEADER_SERIE_A: "Serie A",
    COMP_HEADER_LIGUE_ONE: "Ligue One",
    COMP_HEADER_FA_CUP: "FA Cup",
    COMP_HEADER_EFL_CUP: "EFL Cup",
    COMP_HEADER_UCL: "UEFA Champions League",

    //Account Constants
    ACCOUNT_OVERVIEW_HEADER: "Account Overview",
    ACCOUNT_UPDATE_HEADER: "Account Update",
    TRANSACTION_HISTORY_HEADER: "Transaction History",
    LIMIT_MANAGEMENT_HEADER: "Limit Management",
    DEPOSIT_HEADER: "Deposits",
    WITHDRAWALS_HEADER: "Withdrawals",

    NAV_MENU_SELECT_ACCOUNT_OVERVIEW: "account_overview",
    NAV_MENU_SELECT_ACCOUNT_UPDATE: "account_update",
    NAV_MENU_SELECT_TRX_HIST: "trx_hist",
    NAV_MENU_SELECT_LIMIT_MGMT: 'limit_mgmt',
    NAV_MENU_SELECT_DEPOSITS: "desposits",
    NAV_MENU_SELECT_WITHDRAWALS: "withdrawals",

    CREATE_USER_DIALOG_TYPE: 'CREATE_USER',
    CFM_DEPOSIT_DIALOG_TYPE: 'CFM_DEPOSIT',
    CFM_WITHDRAW_DIALOG_TYPE: 'CFM_WITHDRAW',
    CFM_CHANGE_LIMIT_DIALOG_TYPE: 'CFM_CHANGE_LIMIT',
    CFM_UPDATE_PW_DIALOG_TYPE: 'CFM_UPDATE_PW',
    CFM_UPDATE_ACC_DETAILS_DIALOG_TYPE: 'CFM_UPDATE_ACC_DETAILS',
    
    CREATE_USER_DIALOG_MSG: 'Are you sure to create a new user?',
    CFM_DEPOSIT_DIALOG_MSG: 'Are you sure to deposit?',
    CFM_WITHDRAW_DIALOG_MSG: 'Are you sure to withdraw?',
    CFM_CHANGE_LIMIT_DIALOG_MSG: 'Are you sure to change Monthly Deposit and Monthly Betting limit?',
    CFM_UPDATE_PW_DIALOG_MSG: 'Are you sure to update account details?',
    CFM_UPDATE_ACC_DETAILS_DIALOG_MSG: 'Confirm account details update?',

    INVALID_DATE_FROM_AND_TO_ERR_MSG: '"From" date cannot be later than "To" date.',
    INVALID_LOGIN_ERR_MSG: 'Please enter a valid credential. Login failed.',

    LAST_24_HRS: 'last24Hrs',
    LAST_3_DAYS: 'last3Days',
    MILLI_SEC_24_HRS: 86400000, // 24 hours in milliseconds
    MILLI_SEC_3_DAYS: 259200000, // 3 days in milliseconds

    HOST_NAME_URL: 'http://localhost:8765/',

    ACCOUNT_DETAILS: 'ACCOUNT_DETAILS',
    PERSONAL_DETAILS: 'PERSONAL_DETAILS',
    AUTH_USER: 'AUTH_USER',
    AUTHORIZATION: 'AUTHORIZATION',
    LOGIN_TIME: 'LOGIN_TIME'

  };

  export default SharedVarConstants;