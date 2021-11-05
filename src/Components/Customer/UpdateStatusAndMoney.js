import { Grid, Paper, Button } from '@material-ui/core';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Actions from '../../Redux/Actions/customerActions';
import Axios from 'axios';
import {startLoading, stopLoading} from '../../Redux/Actions/loadingActions';

const UpdateStatusAndMoney = (props)=>{
    const {history, dispatch, customerId, onClose, recordsLimit, pageIndex, searchBy, itemStatus} = props;
    const {updateStatusAndMoney} = props;

    const [status, setStatus] = useState("NOT_STARTED");
    const [amount, setAmount] = useState(0);
    const [customer, setCustomer] = useState("");

//////customerUpdatedData, callBack, customerId, status, money

    const fetchDetailsOfCurrentUser = async ()=>{
        startLoading(dispatch);
        const URL = `${process.env.REACT_APP_BASE_API_URL}/api/singleCustomer/${customerId}`;
        const response = await Axios.get(URL);
        const customerData = response.data.customer;
        setCustomer(customerData);
        stopLoading(dispatch);
    }

    useEffect(()=>{
        fetchDetailsOfCurrentUser();
    }, []);

    const getTextMessageBasedOnStatus = () =>{
        let textMessage = "";

        if(status == "NOT_STARTED"){
            textMessage = `Aap ke *${customer.item.replace(/_/g, ' ')}* ka reparing ka kaam jald hi chalu ho jayega, Jab aap ka *${customer.item.replace(/_/g, ' ')}* ban jayega tab aap ko suchit kiya jayega. Dhanyawad...!!!`
        }

        if(status == "STARTED"){
            textMessage = `Aap ke *${customer.item.replace(/_/g, ' ')}* ka reparing ka kaam chalu ho gaya hai, Jab aap ka *${customer.item.replace(/_/g, ' ')}* ban jayega tab aap ko suchit kiya jayega. Dhanyawad...!!!`
        }

        if(status == "COMPLETED"){
            textMessage = `Aap ke *${customer.item.replace(/_/g, ' ')}* ka reparing ka kaam poora ho gaya hai, Iske reparing ka total kharcha *${amount}* hua hai. Aap kabhi bhi dukan pe aa ke apna *${customer.item.replace(/_/g, ' ')}* le jaa sakte hai. Dhanyawad...!!!`
        }

        return textMessage;
    }

    const handleUpdateStatus=()=>{
        const callBack = ()=>{
            // history.push(`/customer`);
            // window.location.href = `https://api.whatsapp.com/send?phone=91${customer.mobileNo}&text=${getTextMessageBasedOnStatus()}`;
            onClose();
            window.open(`https://api.whatsapp.com/send?phone=91${customer.mobileNo}&text=${getTextMessageBasedOnStatus()}`);
        }
        const customerUpdatedData = {customerId : customerId, money : amount, status : status};
        updateStatusAndMoney(customerUpdatedData, recordsLimit, pageIndex, searchBy, itemStatus, callBack)
    }


    return(
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} style={{textAlign : 'center'}}>
                        <Paper style={{padding : '1rem', marginTop : '1rem', textAlign : "initial"}}>

                            <div style={{marginTop : '1rem'}}>
                                <FormControl variant="outlined" style={{width : '100%'}}>
                                    <InputLabel >Status</InputLabel>
                                    <Select label="Status" onChange={(e)=>{setStatus(e.target.value); setAmount(0);}} value={status}>
                                        <MenuItem value={"NOT_STARTED"}>NOT_STARTED</MenuItem>
                                        <MenuItem value={"STARTED"}>STARTED</MenuItem>
                                        <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            {status === "COMPLETED" && <TextField name="amount" type="number" fullWidth variant="outlined" label="Amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}} style={{marginTop : '1rem'}}/>}

                            

                            <div style={{display: 'flex', justifyContent : 'space-between', }}>
                                <Typography align="left" style={{marginTop : '1rem'}}>
                                    <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
                                </Typography>
                                <Typography align="right" style={{marginTop : '1rem'}}>
                                    <Button variant="contained" color="primary" onClick={handleUpdateStatus}>Update and send message</Button>
                                </Typography>
                            </div>
                        
                        </Paper>
                </Grid>
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
        updateStatusAndMoney : (customerUpdatedData, recordsLimit, pageIndex, searchBy, itemStatus, callBack)=> dispatch(Actions.updateStatusAndMoney(customerUpdatedData, recordsLimit, pageIndex, searchBy, itemStatus, callBack)),
    }
}

////customerUpdatedData, callBack, customerId, status, money
export default connect(mapStateToProps, mapDispatchToProps)(UpdateStatusAndMoney);