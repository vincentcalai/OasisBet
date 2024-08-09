
import { combineReducers } from 'redux';
import betSlipReducer from '../reducers/BetSlipReducer.ts';
import loginReducer from '../reducers/LoginReducer.ts';
import modalReducer from '../reducers/ModalReducer.ts';
import spinnerReducer from '../reducers/SpinnerReducer.ts';
import errorReducer from '../reducers/ErrorReducer.ts';

const rootReducer: any = combineReducers({
    betSlip: betSlipReducer,
    login: loginReducer,
    modal: modalReducer,
    spinner: spinnerReducer,
    error: errorReducer
});

export default rootReducer;