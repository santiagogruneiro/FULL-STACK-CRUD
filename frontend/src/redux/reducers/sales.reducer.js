
const initialState = []

const salesReducer = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'SET_SALES_DATA':
            return {
                ...state,
                sales: payload
            }

        case 'ADD_SALE':
            return{
                ...state,
                sales: [...state.sales,payload]
            }    
        case 'SET_SELECTED_SALE':
            return {
                ...state,
                selectedSales: payload
            }
        case 'SET_WINDOW_CONFIRM_DELETE_IS_OPEN':
            return{
                ...state,
                windowConfirmDeleteIsOpen:payload
            }
        case 'REMOVE_CUSTOMER_SALE':
            return{
                ...state,
                selectedSales: state.selectedSales.filter(e=>e._id !== payload)
            }    
        default:
            return state
    }
}

export default salesReducer

