
import {createStore} from 'redux';

const betSlipReducer = (state= {selectionCount: 0}, action) => {
    
    switch (action.type) {
        case 'ADD_BET_SELECTION':
            console.log("Adding bet reducer works! Payload:", action.payload);
            return {
                ...action.payload, 
                selectionCount: state.selectionCount + 1 
            };
        case 'REMOVE_BET_SELECTION':
            console.log("Remove bet reducer works! Payload:", action.payload);
            return {
                ...action.payload, 
                selectionCount: state.selectionCount - 1 
            };
        default:
            return state;
    }
}

const store = createStore(betSlipReducer);

export default store;