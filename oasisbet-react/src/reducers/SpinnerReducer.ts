export const initialState = {
    loader: false,
    loaderText: '',
    textClass: undefined
}

const spinnerReducer = (state = initialState, {type, payload}) => {
    console.log("spinner reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'LOAD_SPINNER':
            return payload;
        default:
            return {...state};
    }
}

export default spinnerReducer;