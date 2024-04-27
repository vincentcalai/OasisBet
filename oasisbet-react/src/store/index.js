
import {createStore} from 'redux';

const betSlipReducer = (state = { betSlip: [] }, action) => {
    switch (action.type) {
        case 'ADD_BET_SELECTION':
            console.log("Adding bet reducer works! Payload:", action.payload);
            return {
                action: 'ADD',
                betSlip: action.payload
            };
        case 'REMOVE_BET_SELECTION':
            console.log("Removing bet reducer works! Payload:", action.payload);
            return {
                action: 'REMOVE',
                betSlip: action.payload
            };
        case 'CLEAR_BET_SELECTION':
            console.log("Clearing Bet Selection in bet reducer works! ");
            return {
                action: 'CLEAR',
                betSlip: state.betSlip
            };
        case 'EMPTY_BET_SELECTION':
            console.log("Clearing Bet Selection in bet reducer works! ");
            return {
                action: 'EMPTY',
                betSlip: []
            };
        default:
            return state;
    }
}

const store = createStore(betSlipReducer);

export default store;