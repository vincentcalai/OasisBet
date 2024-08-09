
//Login
export const updateLoginDetails = (key, value) => {
    return {
        type: 'UPDATE_LOGIN',
        payload: {
            [key]: value
        }      
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
        payload: errorText
    }
}

export const closeAlert = errorText => {
    return {
        type: 'CLOSE_ALERT',
        payload: errorText
    }
}


