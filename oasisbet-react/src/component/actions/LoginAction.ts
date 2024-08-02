
export const updateLoginDetails = (key, value) => {
    return {
        type: 'UPDATE_LOGIN',
        payload: {
            [key]: value
        }      
    };
}

