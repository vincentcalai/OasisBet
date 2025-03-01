
import { combineReducers } from 'redux';
import betSlipReducer from '../reducers/BetSlipReducer.ts';
import loginReducer from '../reducers/LoginReducer.ts';
import modalReducer from '../reducers/ModalReducer.ts';
import spinnerReducer from '../reducers/SpinnerReducer.ts';
import errorReducer from '../reducers/ErrorReducer.ts';
import accountDetailsReducer from '../reducers/AccountDetailsReducer.ts';
import personalInfoReducer from '../reducers/PersonalInfoReducer.ts';
import betEventReducer from '../reducers/BetEventReducer.ts';

const rootReducer: any = combineReducers({
    accountDetails: accountDetailsReducer,
    personalInfo: personalInfoReducer,
    betSlip: betSlipReducer,
    betEvent: betEventReducer,
    login: loginReducer,
    modal: modalReducer,
    spinner: spinnerReducer,
    error: errorReducer
});

export default rootReducer;