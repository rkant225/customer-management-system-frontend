import { Grid, Paper, Typography, Button, TablePagination, TextField, OutlinedInput, InputBase } from '@material-ui/core';
// import { Fab, IconButton } from '@mui/material';
import { IconButton, Fab } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Actions from '../../Redux/Actions/customerActions';
import AddCurtomerModal from '../AddCustomer/AddCurtomerModal';
import CustomerCard from './CustomerCard';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import UpdateStatusAndMoneyModal from './UpdateStatusAndMoneyModal';



const fabStyle = {
    position: 'fixed',
    bottom: '30%',
    right: 16,
};

const CurtomerHomePage = (props)=>{
    const {history} = props;
    const {getCustomersList, customersData, deleteCustomer} = props;
    const {placeId} = useParams();
    const isEdit = placeId ? true : false;
    const {customers, pagination} = customersData;
    const {limit, page, totalPages, totalRecords, } = pagination || {};

    const [recordsLimit, setRecordsLimit] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [searchBy, setSearchBy] = useState("");
    const [customerId, setCustomerId] = useState(0);

    const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
    const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);

    const handleChangePage = (event, newPage) => {
        console.log(event, newPage)
        setPageIndex(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRecordsLimit(parseInt(event.target.value, 10));
        setPageIndex(0);
      };

    useEffect(()=>{
        getCustomersList(recordsLimit, pageIndex, searchBy);
    }, [recordsLimit, pageIndex]);


    const handleCustomerDelete = (customerId)=>{
        deleteCustomer(customerId, recordsLimit, pageIndex, searchBy)
    }

    const handleCustomerSearch=(e)=>{
        e.preventDefault();
        // searchBy
        getCustomersList(recordsLimit, pageIndex, searchBy);
    }

    const handleUpdateStatusModalOpen = (customerId)=>{
        setCustomerId(customerId);
        setOpenUpdateStatusModal(true);
    }

    return(
        <React.Fragment>
            <Grid container>
                {/* <Grid item md={4}></Grid> */}
                <Grid item xs={12} style={{marginBottom : '2rem', marginTop : '1rem'}}>

                    {/* Header */}
                    <div style={{marginTop : '1rem', margin : 'auto', position : 'fixed', top : 0, backgroundColor : 'greenyellow', padding : '.4rem', zIndex : '100', right : '0', left : '0', textAlign : '-webkit-center'}}>
                        <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', width : 'max-content', padding : '.4rem 1.5rem', borderRadius : '2rem'}}>
                            <form onSubmit={handleCustomerSearch}>
                                <TextField variant="standard" label="Search" size="small" value={searchBy} onChange={(e)=>{setSearchBy(e.target.value)}}/>
                                <IconButton type="submit" sx={{ p: '10px' }}>
                                    <SearchIcon />
                                </IconButton>
                            </form>
                        </div>
                    </div>
                    
                                
                    {/* Cards */}
                    <div style={{display : 'flex', flexWrap : 'wrap', marginTop : '4rem'}}>
                        {customers?.map((customer, index)=>{
                            return(
                            <CustomerCard 
                                key={index} 
                                history={history} 
                                customer={customer} 
                                deleteCustomer={handleCustomerDelete}
                                openStatusUpdateModal={handleUpdateStatusModalOpen}
                            />)
                        })}
                    </div>

                    {/* Pagination */}
                    <div style={{marginBottom : '3rem'}}>
                        <TablePagination
                            component="div"
                            count={totalRecords}
                            page={pageIndex}
                            onChangePage={handleChangePage}
                            rowsPerPage={recordsLimit}
                            rowsPerPageOptions={[5,10,15,20,25,50]}
                            // onRowsPerPageChange={handleChangeRowsPerPage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            labelRowsPerPage="Per Page"
                        
                        />
                    </div>


                    {/* Add Customer Modal */}
                    <div >
                    {openAddCustomerModal && 
                            <AddCurtomerModal
                                onClose={()=>{setOpenAddCustomerModal(false)}}
                            />
                        }
                    </div>

                    {/* UpdateStatus Modal */}
                    <div>
                    {openUpdateStatusModal && 
                            <UpdateStatusAndMoneyModal
                                onClose={()=>{setOpenUpdateStatusModal(false)}}
                                customerId={customerId}
                                recordsLimit={recordsLimit}
                                pageIndex={pageIndex}
                                searchBy={searchBy}
                            />
                        }
                    </div>



                    {/* Footer */}
                    <div style={{position : 'fixed', bottom : 0, backgroundColor : 'greenyellow', padding : '.2rem', zIndex : '100', right : '0', left : '0', textAlign : '-webkit-center'}}>
                        <Fab color="primary" aria-label="add" onClick={()=>{setOpenAddCustomerModal(true)}}>
                            <AddIcon />
                        </Fab>
                    </div>

                </Grid>
                {/* <Grid item md={4}></Grid> */}
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {CustomerModel} = state;
    return{
        customersData : CustomerModel.customersData,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getCustomersList : (limit, page, searchBy)=> dispatch(Actions.getCustomersList(limit, page, searchBy)),
        deleteCustomer : (customerId, recordsLimit, pageIndex, searchBy)=>{dispatch(Actions.deleteCustomer(customerId, recordsLimit, pageIndex, searchBy))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurtomerHomePage);
