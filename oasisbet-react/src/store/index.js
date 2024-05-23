
import {createStore, combineReducers } from 'redux';

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

const userReducer = (state = { message: '' }, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            console.log("Create user success in user reducer works! Payload:", action.payload);
            return {
                action: 'CREATE',
                message: action.payload
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    betSlip: betSlipReducer,
    user: userReducer
});

const store = createStore(rootReducer);

export default store;