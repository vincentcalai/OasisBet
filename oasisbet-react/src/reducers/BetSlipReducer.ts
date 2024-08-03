const betSlipReducer = (state = { betSlip: [] }, action) => {
    console.log("betSlip reducer.. state: ", state, " action: ", action);
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

export default betSlipReducer;