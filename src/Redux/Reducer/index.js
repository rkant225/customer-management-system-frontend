import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';
import customerReducer from './customerReducer';
import loadingReducer from './loadingReducer';
import serverErrorReducer from './serverErrorReducer';
import serverSuccessReducer from './serverSuccessReducer';
import sessionTimeOutReducer from './sessionTimeOutReducer';

export default combineReducers(
    {
        form : formReducer,
        LoginModel : loginReducer,
        UsersModel : usersReducer,
        CustomerModel : customerReducer,
        LoadingModel : loadingReducer,
        ServerErrorModel : serverErrorReducer,
        ServerSuccessModal : serverSuccessReducer,
        SessionTimeOutModel : sessionTimeOutReducer,

    }
);