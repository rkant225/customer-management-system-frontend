import * as React from 'react';
import { Paper, Button, Modal, Typography, Box } from '@material-ui/core';
import AddCustomerForm from './AddCustomerForm';
import { useEffect } from 'react';
import * as Actions from '../../Redux/Actions/customerActions';
import { connect } from 'react-redux';

const AddCurtomerModal=(props)=> {
    const {onClose, getItemsList, addCustomer, itemsList, recordsLimit, pageIndex, searchBy, itemStatus} = props;

    useEffect(()=>{
        getItemsList();
    }, []);

    const onCustomerAdd = (formData)=>{
        const {name, mobileNo, address, item, description, date} = formData;
        console.log('formData', formData);

        const customerData =  {name, mobileNo, address, item, description, date : new Date()};

        addCustomer(customerData, recordsLimit, pageIndex, searchBy, itemStatus, onClose);

    }

  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Box className="add-customer-modal">
            <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontWeight : '900', textAlign : 'center', marginTop : '2rem'}}>
                Add New Customer
            </Typography>

            <div style={{marginTop : '1rem'}}>
                <div style={{padding : '1.5rem'}}>
                    <AddCustomerForm  onSubmit={onCustomerAdd} itemsList={itemsList} onClose={onClose}/>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
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
        addCustomer : (customerData, recordsLimit, pageIndex, searchBy, itemStatus, callBack)=> dispatch(Actions.addCustomer(customerData, recordsLimit, pageIndex, searchBy, itemStatus, callBack))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCurtomerModal);