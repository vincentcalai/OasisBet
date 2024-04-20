
import {createStore} from 'redux';

const betSlipReducer = (state = { betSlip: [] }, action) => {
    switch (action.type) {
        case 'ADD_BET_SELECTION':
            console.log("Adding bet reducer works! Payload:", action.payload);
            return {
                betSlip: action.payload
            };
        case 'REMOVE_BET_SELECTION':
            console.log("Removing bet reducer works! Payload:", action.payload);
            return {
                betSlip: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(betSlipReducer);

export default store;