
import { combineReducers } from 'redux';
import betSlipReducer from '../reducers/BetSlipReducer.ts';
import loginReducer from '../reducers/LoginReducer.ts';

const rootReducer = combineReducers({
    betSlip: betSlipReducer,
    login: loginReducer
});

export default rootReducer;