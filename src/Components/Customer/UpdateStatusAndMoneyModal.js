import * as React from 'react';
import { Paper, Modal, Typography, Button, Box } from '@material-ui/core';
import { useEffect } from 'react';
import * as Actions from '../../Redux/Actions/customerActions';
import { connect } from 'react-redux';
import UpdateStatusAndMoney from './UpdateStatusAndMoney';

const UpdateStatusAndMoneyModal=(props)=> {
    const {onClose, getItemsList, addCustomer, itemsList, customerId, recordsLimit, pageIndex, searchBy, itemStatus} = props;

    useEffect(()=>{
        getItemsList();
    }, []);



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
                itemStatus={itemStatus}
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
        getCustomersList : ()=> dispatch(Actions.getCustomersList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStatusAndMoneyModal);