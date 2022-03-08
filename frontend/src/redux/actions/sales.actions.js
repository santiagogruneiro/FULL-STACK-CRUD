export const setSalesData = (payload) => (
    {
        type:'SET_SALES_DATA',
        payload:payload
    }
)

export const addSale = (payload) => (
    {
        type:'ADD_SALE',
        payload
    }
)

export const setSelectedSale = (payload) => (
    {
        type:'SET_SELECTED_SALE',
        payload
    }
)

export const removeCustomerSale = (payload) => (
    {
        type:'REMOVE_CUSTOMER_SALE',
        payload
    }
)

export const setWindowConfirmDeleteIsOpen = (payload) => (
    {
        type:'SET_WINDOW_CONFIRM_DELETE_IS_OPEN',
        payload
    }
)