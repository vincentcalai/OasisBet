const accountDetailsReducer = (state = {}, {type, payload}) => {
    console.log("accountDetailsReducer reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'UPDATE_ACCOUNT_DETAILS':
            return {...state, ...payload};
        case 'UPDATE_ACCOUNT_DETAILS_RESP':
            return payload;
        default:
            return state;
    }
}

export default accountDetailsReducer;