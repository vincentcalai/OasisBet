
export const setSpinner = (loader, loaderText, textClass: any | null | undefined= null) => {
    return {
        type: 'LOAD_SPINNER',
        payload: {loader, loaderText, textClass }      
    };
}

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
