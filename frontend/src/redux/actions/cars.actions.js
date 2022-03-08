export const setCarsData = (payload) => (
    {
        type:'SET_CARS_DATA',
        payload:payload
    }
)
export const setSelectedCar = (payload) => (
    {
        type: 'SET_SELECTED_CAR',
        payload: payload
    }
)

export const setCarsSendDataFunction = (payload) => (
    {
        type:'SET_CARS_SEND_DATA_FUNCTION',
        payload:payload
    }
)

export const setWindowConfirmDeleteIsOpen = (payload) => (
    {
        type:'SET_CARS_CONFIRM_DELETE_WINDOW_OPEN',
        payload:payload
    }
)

export const removeCar = (payload) => (
    {
        type:'REMOVE_CAR',
        payload:payload
    }
)

export const addCar = (payload) => (
    {
        type:'ADD_CAR',
        payload:payload
    }
)