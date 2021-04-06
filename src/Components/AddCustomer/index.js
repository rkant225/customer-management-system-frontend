import { Grid, Paper, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddCustomerForm from './AddCustomerForm';
import * as Actions from '../../Redux/Actions/customerActions';

const AddOrEditPlace = (props)=>{
    const {history} = props;
    const {loggedInUserDetails} = props;
    const {id, name, email} = loggedInUserDetails;
    const {getItemsList, itemsList, addCustomer} = props;
    const {placeId} = useParams();
    const isEdit = placeId ? true : false;

    const [file, setFile] = useState(undefined);
    const [fileError, setFileError] = useState('');

    useEffect(()=>{
        getItemsList();
    }, []);

    const onCustomerAdd = (formData)=>{
        const {name, mobileNo, address, item, description, date} = formData;
        console.log('formData', formData);

        const callBack = ()=>{history.push(`/customer`)}
        const customerData =  {name, mobileNo, address, item, description, date : new Date()};

        addCustomer(customerData, callBack);

        // // placeId, title, description, address
        // const updatedPlaceData = {
        //     placeId : placeId,
        //     title : title,
        //     address : address,
        //     description : description,
        // };
        // editExistingPlace(updatedPlaceData, callBack);
    }

   

    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={8}>
                    <Paper style={{marginTop : '1rem'}}>
                        <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontWeight : '900', textAlign : 'center', marginTop : '2rem'}}>
                            Add New Customer
                        </Typography>
                        <div style={{padding : '1.5rem'}}>
                            <AddCustomerForm  onSubmit={onCustomerAdd} itemsList={itemsList}/>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={2}></Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {CustomerModel, LoginModel} = state;
    return{
        itemsList : CustomerModel.itemsList,
        isAuthenticated : LoginModel.isAuthenticated,
        loggedInUserDetails : LoginModel.loggedInUserDetails,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getItemsList : ()=> dispatch(Actions.getItemsList()),
        getCustomersList : ()=> dispatch(Actions.getCustomersList()),
        addCustomer : (customerData, callBack)=> dispatch(Actions.addCustomer(customerData, callBack))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPlace);