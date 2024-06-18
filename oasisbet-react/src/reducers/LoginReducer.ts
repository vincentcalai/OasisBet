const loginReducer = (state = {}, {type, payload}) => {
    console.log("login reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'UPDATE_LOGIN':
            return {...state, ...payload};
        default:
            return state;
    }
}

export default loginReducer;