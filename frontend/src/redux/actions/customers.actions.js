export const setCustomersData = (payload) => (
    {
        type: 'SET_CUSTOMERS_DATA',
        payload: payload
    }
)

export const setSelectedCustomer = (payload) => (
    {
        type: 'SET_SELECTED_CUSTOMER',
        payload: payload
    }
)

export const setCustomerSendDataFunction = (payload) => (
    {
        type:'SET_CUSTOMER_SEND_DATA_FUNCTION',
        payload:payload
    }
)

export const windowConfirmDeleteIsOpen = (payload) => (
    {
        type:'SET_CUSTOMER_CONFIRM_DELETE_WINDOW_OPEN',
        payload:payload
    }
)

export const removeCustomer = (payload) => (
    {
        type:'REMOVE_CUSTOMER',
        payload:payload
    }
)

export const addCustomer = (payload) => (
    {
        type:'ADD_CUSTOMER',
        payload:payload
    }
)