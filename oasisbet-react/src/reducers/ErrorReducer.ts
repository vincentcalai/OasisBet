export const initialState = {
    showError: false,
    errorText: ''
}

const errorReducer = (state = initialState, {type, payload}) => {
    console.log("error reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'OPEN_ALERT':
            return {...state, showError: true, ...payload};
        case 'CLOSE_ALERT':
            return {...state, showError: false, ...payload};
        default:
            return state;
    }
}

export default errorReducer;