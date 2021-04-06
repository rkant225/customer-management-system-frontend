import { Grid, Paper, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Actions from '../../Redux/Actions/customerActions';
import CustomerCard from './CustomerCard';

const CurtomerHomePage = (props)=>{
    const {history} = props;
    const {getCustomersList, customersList} = props;
    const {placeId} = useParams();
    const isEdit = placeId ? true : false;


    useEffect(()=>{
        getCustomersList();
    }, []);

    const redirectToAddCustomerPage = () =>{
        history.push('/add-customer')
    }

    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={4}></Grid>
                <Grid item xs={12} md={4} style={{textAlign : 'center', marginBottom : '2rem'}}>
                    <div style={{marginTop : '1rem'}}>
                        <Button variant="contained" color="primary" onClick={redirectToAddCustomerPage}>Add Customer</Button>
                    </div>
                    {customersList.map((customer, index)=>{
                        return <CustomerCard key={index} history={history} customer={customer}/>
                    })}
                </Grid>
                <Grid item md={4}></Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {CustomerModel} = state;
    return{
        customersList : CustomerModel.customersList,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getCustomersList : ()=> dispatch(Actions.getCustomersList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurtomerHomePage);