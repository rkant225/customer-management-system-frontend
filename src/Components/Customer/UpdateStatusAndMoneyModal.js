import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper } from '@material-ui/core';
import { useEffect } from 'react';
import * as Actions from '../../Redux/Actions/customerActions';
import { connect } from 'react-redux';
import UpdateStatusAndMoney from './UpdateStatusAndMoney';

const UpdateStatusAndMoneyModal=(props)=> {
    const {onClose, getItemsList, addCustomer, itemsList, customerId, recordsLimit, pageIndex, searchBy} = props;

    useEffect(()=>{
        getItemsList();
    }, []);

    const onCustomerAdd = (formData)=>{
        const {name, mobileNo, address, item, description, date} = formData;
        console.log('formData', formData);

        const customerData =  {name, mobileNo, address, item, description, date : new Date()};

        addCustomer(customerData, ()=>{});

    }

  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Box className="add-customer-modal">
            <UpdateStatusAndMoney 
                customerId={customerId} 
                onClose={onClose}
                recordsLimit={recordsLimit}
                pageIndex={pageIndex}
                searchBy={searchBy}
            />
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
        addCustomer : (customerData, callBack)=> dispatch(Actions.addCustomer(customerData, callBack))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStatusAndMoneyModal);