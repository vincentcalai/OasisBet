export const initialState = {
    accountDetails: null,
    personalDetails: null
}

const accountReducer = (state = initialState, {type, payload}) => {
    console.log("account reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'UPDATE_ACCOUNT_DETAILS':
            return {...state, ...payload};
        default:
            return state;
    }
}

export default accountReducer;