

export const filterReducer = (expenseState, action) => {
    switch (action.type) {
        case "FILTER_COMPLETED":
            return{
                ...expenseState,
                isCompleted:!expenseState.isCompleted
            }
        
         case "FILTER_NEW":
            return{
                ...expenseState,
                isNew:!expenseState.isNew
                }
        case "FILTER_INPROGRESS":
            return{
                ...expenseState,
                isInprogress:!expenseState.isInprogress
                }
        case "FILTER_SEARCH":
            return{
                ...expenseState,
                searchQuery: action.payload
            }
        case "FILTER_MINIMUM":
            return{
                ...expenseState,
                minimumPrice:action.payload
            }

        case "FILTER_MAXIMUM":
            return{
                ...expenseState,
                maximumPrice:action.payload
            }
        case "FILTER_FROM_DATE":
            return{
                ...expenseState,
                fromDate:action.payload
            }

        case "FILTER_TO_DATE":
            return{
                ...expenseState,
                toDate:action.payload
            }

        case "FILTER_MERCHANT":
            return{
                ...expenseState,
                merchant:action.payload
            }

        case "CLEAR_FILTERS":
            return{
                isNew:false,
                isCompleted:false,
                isInprogress:false,
                searchQuery:"",
                minimumPrice:"",
                maximumPrice:"",
                fromDate:"",
                toDate:""
            }
    
        default:
            return expenseState;
    }
}