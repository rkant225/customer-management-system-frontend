import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import {Field, reduxForm} from 'redux-form';
import validateDetailsForm from './validateAddCustomerForm';

const renderTextField = ({ input, myLabel, meta: { touched, error }, maxLength, ...custom }) => {
    return <TextField fullWidth variant="outlined" label={myLabel} error={touched && error !== undefined} helperText={touched && error} {...input} {...custom} inputProps={{'aria-label': `${myLabel} text box`, maxLength : maxLength || 256}} />
}

const renderSelectField = (fieldData) => {
    const { input, myLabel, meta: { touched, error }, children, ...custom } = fieldData;
    return (
        <FormControl variant="outlined" style={{width : '100%'}}  error={touched && error !== undefined}>
            <InputLabel id="itemType_label" >{myLabel}</InputLabel>
            <Select labelId="itemType_label" label={myLabel} error={touched && error !== undefined} {...input} {...custom} children={children} onChange={(event, index, value) => { input.onChange(event.target.value); }} />
            <FormHelperText>{touched && error ? error : ""}</FormHelperText>
        </FormControl>
    )
}

const AddCustomerForm = (props)=>{
    const {onSubmit, itemsList, onClose} = props; // Comming from parent
    const { handleSubmit, pristine, reset, submitting, handleFileChange } = props;
    
    useEffect(()=>{
        reset();
    },[]);

    //name, mobileNo, address, item, description
    return(
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <React.Fragment>
                    <Field name="name" label="Name" maxLength={20} component={renderTextField}/>
                    <Field name="mobileNo" label="Mobile Number" maxLength={10} component={renderTextField} style={{marginTop : '1rem'}}/>
                    <Field name="address" label="Address" maxLength={40} component={renderTextField} style={{marginTop : '1rem'}}/>

                    <div style={{marginTop : '1rem'}}>
                        <Field name="item" component={renderSelectField} myLabel="Item Type">
                            <MenuItem value="">Please select</MenuItem>
                            {itemsList.map((item, index) => {
                                return <MenuItem key={index} value={item}>{item.replace(/_/g, ' ')}</MenuItem>
                            })}
                        </Field>
                    </div>

                    <Field name="description" label="Description" maxLength={250} component={renderTextField} style={{marginTop : '1rem'}}/>
                    {/* <Field name="date" label="Date" maxLength={250} component={renderTextField} style={{marginTop : '1rem'}}/> */}

                    <Typography align="right" style={{marginTop : '1rem'}}>
                        <Button  variant="contained" color="primary" onClick={onClose} style={{marginRight : '.5rem'}}>Close</Button>
                        <Button  type="submit" variant="contained" color="primary" disabled={pristine || submitting}>Add Customer</Button>
                    </Typography>
                    
                </React.Fragment>
            </form>
        </React.Fragment>
    );
}

export default reduxForm({form : 'AddNewPlace',  destroyOnUnmount : true, enableReinitialize : true, validate : validateDetailsForm})(AddCustomerForm);