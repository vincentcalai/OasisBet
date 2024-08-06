
export const setSpinner = (loader, loaderText, textClass: any | null | undefined= null) => {
    return {
        type: 'LOAD_SPINNER',
        payload: {loader, loaderText, textClass }      
    };
}

