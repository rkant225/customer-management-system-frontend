import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';

export const login =(loginData)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = '/api/auth/login';
        
        const response = await API.request(path, 'Post', loginData);

        if(response.isSuccessfull){
            dispatch({ type: 'LOGIN', payload : {user : response.user}});
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Logged in successfully.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage});
            stopLoading(dispatch);
        }        
    }          
}


export const logOut =()=>{
    return async (dispatch)=>{
        dispatch({ type: 'LOGOUT'});
    }          
}