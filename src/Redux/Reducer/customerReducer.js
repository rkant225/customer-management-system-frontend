const initialState = {
    itemsList : [],
    customersData : {},
    allPlaces : [],
    placesOfSelectedUser : [],
    currentlySelectedPlace : {}
};

const customerReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_ITEMS_LIST' :
            return {
                ...state,
                itemsList : action.payload
            }
        case 'GET_CUSTOMERS_LIST' :
            return {
                ...state,
                customersData : action.payload
            }
        default :
            return {
                ...state
            }
    }
}

export default customerReducer;