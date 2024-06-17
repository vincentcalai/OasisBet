const loginReducer = (state = {}, {type, payload}) => {
    switch(type) {
        case 'UPDATE_LOGIN':
            return {...state, ...payload};
        default:
            return state;
    }
}

export default loginReducer;