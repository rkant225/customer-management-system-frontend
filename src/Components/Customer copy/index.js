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
    const {addNewPlace, editExistingPlace, getPlaceByPlaceId, currentlySelectedPlace} = props;
    const {placeId} = useParams();
    const isEdit = placeId ? true : false;

    const [file, setFile] = useState(undefined);
    const [fileError, setFileError] = useState('');

    useEffect(()=>{
        if(placeId){
            getPlaceByPlaceId(placeId);
        }
    }, [placeId]);

    const onCustomerAdd = (formData)=>{
        const {address, description, title} = formData;
        const callBack = ()=>{history.push(`/places/${loggedInUserDetails.id}`)}

        // placeId, title, description, address
        const updatedPlaceData = {
            placeId : placeId,
            title : title,
            address : address,
            description : description,
        };
        editExistingPlace(updatedPlaceData, callBack);
            
            
    }


    const getFormInitialValues = ()=>{
        if(currentlySelectedPlace && isEdit){
            const {title, address, description} = currentlySelectedPlace;
            const initialValues = {
                title : title,
                address : address,
                description : description
            }
            return initialValues;
        } else {
            return {
                title : '',
                address : '',
                description : ''
            }
        }
    }

    const openAddCustomerPage = () =>{
        history.push('/add-customer')
    }

    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={8} style={{textAlign : 'center'}}>
                    <div style={{marginTop : '1rem'}}>
                        <Button variant="contained" color="primary" onClick={openAddCustomerPage}>Add Customer</Button>
                    </div>
                    {/* <Paper style={{marginTop : '1rem'}}> */}
                        {/* <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontWeight : '900', textAlign : 'center'}}>
                                Add New Customer
                        </Typography>

                        <div style={{padding : '1.5rem'}}>
                            <AddCustomerForm  onSubmit={onCustomerAdd} />
                        </div> */}
                    {/* </Paper> */}
                </Grid>
                <Grid item md={2}></Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {PlacesModel, LoginModel} = state;
    return{
        currentlySelectedPlace : PlacesModel.currentlySelectedPlace,
        isAuthenticated : LoginModel.isAuthenticated,
        loggedInUserDetails : LoginModel.loggedInUserDetails,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        addNewPlace : (newPlaceData, callBack)=> dispatch(Actions.addNewPlace(newPlaceData, callBack)),
        editExistingPlace : (updatedPlaceData, callBack)=> dispatch(Actions.editExistingPlace(updatedPlaceData, callBack)),
        getPlaceByPlaceId : (placeId)=> dispatch(Actions.getPlaceByPlaceId(placeId)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPlace);