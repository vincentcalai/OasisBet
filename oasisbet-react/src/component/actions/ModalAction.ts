
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