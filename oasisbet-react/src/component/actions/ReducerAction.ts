
//Login
export const updateLoginDetails = (key, value) => {
    return {
        type: 'UPDATE_LOGIN',
        payload: {
            [key]: value
        }      
    };
}

//Account details
export const updateAccountDetails = (key, value) => {
    return {
        type: 'UPDATE_ACCOUNT_DETAILS',
        payload: {
            [key]: value
        }      
    };
}

export const updateAccountDetailsWithApiResp = (payload) => {
    return {
        type: 'UPDATE_ACCOUNT_DETAILS_RESP',
        payload: payload
    };
}

//Personal Info
export const updatePersonalInfo = (key, value) => {
    return {
        type: 'UPDATE_PERSONAL_INFO',
        payload: {
            [key]: value
        }      
    };
}

export const updatePersonalInfoWithApiResp = (payload) => {
    return {
        type: 'UPDATE_PERSONAL_INFO_RESP',
        payload: payload
    };
}

//Spinner
export const setSpinner = (loader, loaderText, textClass: any | null | undefined= null) => {
    return {
        type: 'LOAD_SPINNER',
        payload: {loader, loaderText, textClass }      
    };
}

//Modal
export const openModal = modalName => {
    return {
        type: 'OPEN_MODAL',
        payload: modalName
    }
}

export const closeModal = modalName => {
    return {
        type: 'CLOSE_MODAL',
        payload: modalName
    }
}

//Alert
export const openAlert = errorText => {
    return {
        type: 'OPEN_ALERT',
        payload: {errorText}
    }
}

export const closeAlert = () => {
    return {
        type: 'CLOSE_ALERT',
        payload: ''
    }
}


