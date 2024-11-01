const personalInfoReducer = (state = {}, {type, payload}) => {
    console.log("personalInfoReducer reducer.. state: ", state, " type: ", type, " payload: ", payload);
    switch(type) {
        case 'UPDATE_PERSONAL_INFO':
            return {...state, ...payload};
        case 'UPDATE_PERSONAL_INFO_RESP':
            return payload;
        default:
            return state;
    }
}

export default personalInfoReducer;