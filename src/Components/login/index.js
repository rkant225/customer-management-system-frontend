import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './loginForm';

import * as Actions from '../../Redux/Actions/loginActions';

const Login = (props)=>{
    const {location} = props;
    const {login, isAuthenticated} = props;

    useEffect(()=>{
        
    },[])

    const handleLogin = (formData) =>{
        const { mobileNo, password } = formData;
        console.log('Data', mobileNo, password)
        const loginData = {mobileNo, password};
        login(loginData);
    }

    return(
        <React.Fragment>

            {isAuthenticated && <Redirect to="/customer"/> }

            <Grid container>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                    <React.Fragment>
                        <Paper style={{marginTop : '3rem'}}>
                            <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontSize : '1.5rem', fontWeight : '900', textAlign : 'center'}}>
                                Login
                            </Typography>
                            <div style={{padding : '1rem'}}>
                                <LoginForm onSubmit={handleLogin}/>
                            </div>

                            <div style={{width : '60%', margin : 'auto',  padding : '1rem', borderTop : '1px solid blue', textAlign : 'center'}}>
                                <Typography style={{fontSize : '1.3rem'}}>
                                    Don't have account?
                                </Typography>
                            </div>
                        </Paper>
                    </React.Fragment>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
            
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {LoginModel} = state;
    return{
        isAuthenticated : LoginModel.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        login : (loginData)=> dispatch(Actions.login(loginData)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);