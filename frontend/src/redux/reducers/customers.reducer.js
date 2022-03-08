
const initialState = []

const customersReducer = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'SET_CUSTOMERS_DATA':
            return {
                ...state,
                customers: payload
            }
        case 'SET_SELECTED_CUSTOMER':
            return {
                ...state,
                selectedCustomer: payload
            }
        case 'SET_CUSTOMER_SEND_DATA_FUNCTION':
            return {
                ...state,
                sendFunction: payload
            }
        case 'SET_CUSTOMER_CONFIRM_DELETE_WINDOW_OPEN':
            return {
                ...state,
                windowConfirmDeleteIsOpen: payload
            }
        case 'REMOVE_CUSTOMER':
            return {
                ...state,
                customers: state.customers.filter(e => e._id !== payload)
            }
        case 'REMOVE_CUSTOMER_SALE':
            return {
                ...state,
                
            }
        case 'ADD_CUSTOMER':
            return {
                ...state,
                customers: [...state.customers, payload]
            }
        default:
            return state
    }
}

export default customersReducer

