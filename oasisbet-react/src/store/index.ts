
import { combineReducers } from 'redux';
import betSlipReducer from '../reducers/BetSlipReducer.ts';
import loginReducer from '../reducers/LoginReducer.ts';

const rootReducer: any = combineReducers({
    betSlip: betSlipReducer,
    login: loginReducer
});

export default rootReducer;