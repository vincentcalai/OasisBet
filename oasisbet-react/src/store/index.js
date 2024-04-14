
import {createStore} from 'redux';

const betSlipReducer = (state= {betSlip: 0}, action) => {
    if(action.type === 'ADD_BET_SELECTION'){
        console.log("adding bet reducer works!")
        return {
            betSlip: state.betSlip + 1
        }
    }

    if(action.type === 'REMOVE_BET_SELECTION'){
        console.log("remove bet reducer works!")
        return {
            betSlip: state.betSlip - 1
        };
    }
    
    return state;
}

const store = createStore(betSlipReducer);

export default store;