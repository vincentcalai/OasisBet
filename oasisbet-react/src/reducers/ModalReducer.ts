const modalReducer = (state = {}, {type, payload}) => {
    console.log("modal reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'OPEN_MODAL':
            return {...state, [payload]: true};
        case 'CLOSE_MODAL':
            return {...state, [payload]: false};
        default:
            return state;
    }
}

export default modalReducer;