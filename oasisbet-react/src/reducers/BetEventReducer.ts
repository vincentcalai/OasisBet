const betEventReducer = (state = { betEvent: [] }, action) => {
    console.log("betEvent reducer.. state: ", state, " action: ", action);
    switch (action.type) {
        case 'UPDATE_ODDS':
            console.log("update bet event reducer works! Payload:", action.payload);
            return {
                action: 'UPDATE',
                betEvent: action.payload
            };
        default:
            return state;
    }
}

export default betEventReducer;