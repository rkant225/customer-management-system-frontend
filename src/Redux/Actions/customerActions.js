
import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';


export const getItemsList =()=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/customer/getItemsList`;
        const response = await API.request(path, 'Get');

        if(response.isSuccessfull){
            dispatch({ type: 'GET_ITEMS_LIST', payload: response.itemsList || []});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || 'Unable to fetch items list.'});
            stopLoading(dispatch);
        }        
    }          
}

export const getCustomersList =()=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/customer`;
        const response = await API.request(path, 'Get');

        if(response.isSuccessfull){
            dispatch({ type: 'GET_CUSTOMERS_LIST', payload: response.customers || []});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || 'Unable to fetch customers list.'});
            stopLoading(dispatch);
        }        
    }          
}

export const addCustomer =(customerData, callBack)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/customer/add`;
        const response = await API.request(path, 'Post', customerData);

        if(response.isSuccessfull){
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Customer Added successfully.'});
            stopLoading(dispatch);
            callBack();
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || 'Unable to fetch items list.'});
            stopLoading(dispatch);
        }        
    }          
}

export const updateStatusAndMoney =(customerUpdatedData, callBack)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/customer/updateStatus`;
        const response = await API.request(path, 'Put', customerUpdatedData);

        if(response.isSuccessfull){
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Customer Added successfully.'});
            stopLoading(dispatch);
            callBack();
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || 'Unable to fetch items list.'});
            stopLoading(dispatch);
        }        
    }          
}