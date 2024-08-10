export const initialState = {
    showError: false,
    errorText: ''
}

const errorReducer = (state = initialState, {type, payload}) => {
    console.log("error reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'OPEN_ALERT':
            return {...state, showError: true, errorText: payload.errorText || state.errorText};
        case 'CLOSE_ALERT':
            return {...state, showError: false, errorText: ''};
        default:
            return state;
    }
}

export default errorReducer;