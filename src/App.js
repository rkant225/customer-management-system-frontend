import './App.css'
import {connect} from 'react-redux';
import { Box, CssBaseline } from '@material-ui/core';
import {BrowserRouter, Redirect, Route, Router, Switch} from 'react-router-dom'
import history from './router/history';
import ProtectedRoute from './router/protectedRoute';
import {startLoading, stopLoading} from './Redux/Actions/loadingActions';
import React, { Suspense, useEffect } from 'react';
import FallBackLoader from './Components/SharedComponents/fallBackLoader';


//-----------LAZY LOADING-------
const Login = React.lazy(()=>import('./Components/login'));
const LogOut = React.lazy(()=>import('./Components/logOut'));
const Customer = React.lazy(()=>import('./Components/Customer'));
const UpdateStatusAndMoney = React.lazy(()=>import('./Components/Customer/UpdateStatusAndMoney'));
const Loader = React.lazy(()=>import('./Components/SharedComponents/loader'));
const RenderSuccessMessage = React.lazy(()=>import('./Components/SharedComponents/renderSuccessMessage'));
const RenderErrorMessage = React.lazy(()=>import('./Components/SharedComponents/renderErrorMessage'));
//-----------LAZY LOADING-------

function App(props) {
  const {dispatch} = props;

  useEffect(()=>{
    stopLoading(dispatch);
  },[]);

  return (
    <div>
      
        <CssBaseline>
          <Suspense fallback={<FallBackLoader/>}>
            <Loader>
              <RenderSuccessMessage>
                <RenderErrorMessage>

                  <Router history={history}>
                    <Box style={{paddingLeft : '1rem', paddingRight : '1rem'}} >
                      <Switch>
                        <Route path="/" exact component={(props)=><Login {...props}/>}/>
                        <Route path="/login" component={(props)=><Login {...props}/>}/>
                        <Route path="/logout" component={(props)=><LogOut {...props}/>}/>
                        <ProtectedRoute path="/customer" component={(props)=><Customer {...props}/>}/>
                        <ProtectedRoute path="/update-status/:customerId" component={(props)=><UpdateStatusAndMoney {...props}/>}/>
                        {/* <Redirect to="/"/> */}
                      </Switch>
                    </Box>
                  </Router>
                </RenderErrorMessage>
              </RenderSuccessMessage>
            </Loader>
          </Suspense>
        </CssBaseline>
    </div>
  );
}

const mapStateToProps =(state)=>{
  return{ }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
