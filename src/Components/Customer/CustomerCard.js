import { Grid, Paper, Typography, Button, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteForeverIcon  from '@material-ui/icons/DeleteForever';

const CustomerCard = (props)=>{
    const {history, customer, deleteCustomer, openStatusUpdateModal} = props;
    const {id, name, address, mobileNo, item, status, money, description, date} = customer;

    const [backGroundColor, setBackGroungColor] = useState('white');

    useEffect(()=>{
        if(status === "NOT_STARTED"){
            setBackGroungColor('red')
        }
        if(status === "STARTED"){
            setBackGroungColor('yellow')
        }
        if(status === "COMPLETED"){
            setBackGroungColor('green')
        }
    }, [status]);


    return(
        <React.Fragment>
            <Paper className="customer-card-container">
                <div>
                    <p style={{textAlign : 'center', fontSize : '1.8rem', backgroundColor : '#444444', color : 'white'}}>{name}</p>
                    <hr/>
                    <table style={{width : '100%'}}>
                        <tbody>
                            <tr>
                                <td style={{width : '30%', fontWeight : '600'}}>Date</td>
                                <td style={{textAlign : 'right'}}>{new Date(date).toDateString()}</td>
                            </tr>
                            <tr>
                                <td style={{width : '30%', fontWeight : '600'}}>Mobile</td>
                                <td style={{textAlign : 'right'}}>{mobileNo}</td>
                            </tr>
                            <tr>
                                <td style={{width : '30%', fontWeight : '600'}}>Address</td>
                                <td style={{textAlign : 'right'}}>{address}</td>
                            </tr>
                            <tr>
                                <td style={{width : '30%', fontWeight : '600'}}>Item</td>
                                <td style={{textAlign : 'right'}}><b>{item.replace(/_/g, ' ')}</b></td>
                            </tr>
                            <tr>
                                <td style={{width : '30%', fontWeight : '600'}}>Description</td>
                                <td style={{textAlign : 'right'}}>{description}</td>
                            </tr>
                            <tr>
                                <td style={{width : '30%', fontWeight : '600'}}>Status</td>
                                <td style={{textAlign : 'right'}}>{status.replace(/_/g, ' ')}</td>
                            </tr>
                            <tr>
                                <td style={{width : '30%', fontWeight : '600'}}>Money</td>
                                <td style={{textAlign : 'right'}}>{money}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr/>

                <div style={{display : 'flex', justifyContent : 'space-between', textAlign : 'center'}}>

                    <div>
                        <p style={{backgroundColor : backGroundColor, borderRadius : '5rem', height : '30px', width : '30px'}}></p>
                    </div>

                    <Typography align="right">
                        <IconButton aria-label="delete" size="medium" onClick={()=>{deleteCustomer(id)}}>
                            <DeleteForeverIcon fontSize="inherit" />
                        </IconButton>

                        <Button variant="contained" color="primary" onClick={()=>{openStatusUpdateModal(id)}}>Update Status</Button>
                    </Typography>

                </div>
                
            </Paper>
        </React.Fragment>
    );
}



const mapStateToProps =(state)=>{
    return{

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,         
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCard);