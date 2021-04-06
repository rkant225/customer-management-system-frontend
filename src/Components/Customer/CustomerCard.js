import { Grid, Paper, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const CustomerCard = (props)=>{
    const {history, customer} = props;
    const {id, name, address, mobileNo, item, status, money, description, date} = customer;

    const [backGroundColor, setBackGroungColor] = useState('white');

    useEffect(()=>{
        if(status == "NOT_STARTED"){
            setBackGroungColor('red')
        }
        if(status == "STARTED"){
            setBackGroungColor('yellow')
        }
        if(status == "COMPLETED"){
            setBackGroungColor('green')
        }
    }, [status]);

    const handleStatusUpdate = () =>{
        history.push(`/update-status/${id}`);
    }

    return(
        <React.Fragment>
            <Paper style={{marginTop : '1rem', textAlign : 'initial', padding : '.5rem', border : '2px solid blue'}}>
                <div>
                    <p style={{textAlign : 'center', fontSize : '1.8rem', backgroundColor : '#444444', color : 'white'}}>{name}</p>
                    <hr/>
                    <br/>
                        <b>Date : </b> {new Date(date).toDateString()}
                        <br/>
                        <b>Mobile : </b> {mobileNo}
                        <br/>
                        <b>Address : </b> {address}
                        <br/>
                        <b>Item : </b> {item.replace(/_/g, ' ')}
                        <br/>
                        <b>Description : </b> {description}
                        <br/>
                        <b>Status : </b> {status.replace(/_/g, ' ')}
                        <br/>
                        <b>Money : </b> {money}
                        <br/>
                </div>

                <div style={{display : 'flex', justifyContent : 'space-between'}}>

                    <div>
                        <p style={{backgroundColor : backGroundColor, borderRadius : '5rem', height : '30px', width : '30px', marginTop : '16px'}}></p>
                    </div>

                    <Typography align="right" style={{marginTop : '1rem'}}>
                        <Button variant="contained" color="primary" onClick={handleStatusUpdate}>Update Status</Button>
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