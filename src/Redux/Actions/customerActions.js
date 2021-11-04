
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

export const getCustomersList =(limit, page, searchBy)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/customer?limit=${limit}&page=${page}&searchBy=${searchBy}`;
        const response = await API.request(path, 'Get');

        if(response.isSuccessfull){
            dispatch({ type: 'GET_CUSTOMERS_LIST', payload: response || {}});
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

export const deleteCustomer =(customerId, recordsLimit, pageIndex, searchBy)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/customer`;
        const response = await API.request(path, 'Delete', {customerId});

        if(response.isSuccessfull){
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Customer Deleted successfully.'});
            dispatch(getCustomersList(recordsLimit, pageIndex, searchBy));
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || 'Unable to delete customer.'});
            stopLoading(dispatch);
        }        
    }          
}

export const updateStatusAndMoney =(customerUpdatedData, recordsLimit, pageIndex, searchBy, callBack)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/customer/updateStatus`;
        const response = await API.request(path, 'Put', customerUpdatedData);

        if(response.isSuccessfull){
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Customer Updated successfully.'});
            dispatch(getCustomersList(recordsLimit, pageIndex, searchBy));
            stopLoading(dispatch);
            callBack();
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || 'Unable to fetch items list.'});
            stopLoading(dispatch);
        }        
    }          
}