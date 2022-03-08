
const initialState = []

const carsReducer = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'SET_CARS_DATA':
            return {
                ...state,
                cars: payload
            }
        case 'SET_SELECTED_CAR':
            return {
                ...state,
                selectedCar: payload
            }
        case 'SET_CARS_SEND_DATA_FUNCTION':
            return {
                ...state,
                sendFunction: payload
            }
        case 'SET_CARS_CONFIRM_DELETE_WINDOW_OPEN':
            return {
                ...state,
                windowConfirmDeleteIsOpen: payload
            }
        case 'REMOVE_CAR':
            return {
                ...state,
                cars: state.cars.filter(e => e._id !== payload)
            }
        case 'ADD_CAR':
            return {
                ...state,
                cars: [...state.cars, payload]
            }
        default:
            return state
    }
}

export default carsReducer

