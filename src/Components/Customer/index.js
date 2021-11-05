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
import DeleteConfirmationModal from './DeleteConfirmationModal';



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
    const [itemStatus, setItemStatus] = useState("");

    const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
    const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
    const [openDeleteCOnfirmationModal, setOpenDeleteCOnfirmationModal] = useState(false);

    const handleChangePage = (event, newPage) => {
        console.log(event, newPage)
        setPageIndex(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRecordsLimit(parseInt(event.target.value, 10));
        setPageIndex(0);
      };

    
    useEffect(()=>{
        getCustomersList(recordsLimit, pageIndex, searchBy, itemStatus);
    }, [recordsLimit, pageIndex, itemStatus]);

    const handleStatusChange =(e)=>{
        setPageIndex(0);
        setItemStatus(e.target.value);
    }

    const handleCustomerDelete = ()=>{
        deleteCustomer(customerId, recordsLimit, pageIndex, searchBy, itemStatus)
        setOpenDeleteCOnfirmationModal(false);
    }

    const handleCustomerSearch=(e)=>{
        e.preventDefault();
        // searchBy
        getCustomersList(recordsLimit, pageIndex, searchBy, itemStatus);
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
                        <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', width : 'max-content', padding : '0rem 0rem 0rem .5rem', borderRadius : '2rem'}}>
                            <form onSubmit={handleCustomerSearch}>
                                {/* <TextField variant="standard" label="Search" size="small" value={searchBy} onChange={(e)=>{setSearchBy(e.target.value)}}/> */}
                                <InputBase placeholder="Search" variant="standard" label="Search" size="small" value={searchBy} onChange={(e)=>{setSearchBy(e.target.value)}}/>
                                <IconButton type="submit" sx={{ p: '10px' }}>
                                    <SearchIcon />
                                </IconButton>
                            </form>
                        </div>
                        
                        <div>

                            <div style={{display : 'flex', width : 'max-content'}}>
                                <div>
                                    <label>
                                        <input value="" type="radio" checked={itemStatus === ''} onChange={handleStatusChange}/>
                                        All
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input value="NOT_STARTED" type="radio" checked={itemStatus === 'NOT_STARTED'} onChange={handleStatusChange}/>
                                        Not Started
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input value="STARTED" type="radio" checked={itemStatus === 'STARTED'} onChange={handleStatusChange}/>
                                        Started
                                    </label>
                                </div>
                                
                                <div>
                                    <label>
                                        <input value="COMPLETED" type="radio" checked={itemStatus === 'COMPLETED'} onChange={handleStatusChange}/>
                                        Completed
                                    </label>
                                </div>

                            </div>

                            <div>
                                <b>Total Customers : {totalRecords}</b>
                            </div>
                        </div>
                    </div>
                    
                                
                    {/* Cards */}
                    <div style={{display : 'flex', flexWrap : 'wrap', justifyContent : 'space-evenly', marginTop : '5.5rem'}}>
                        {customers?.map((customer, index)=>{
                            return(
                            <CustomerCard 
                                key={index} 
                                history={history} 
                                customer={customer} 
                                deleteCustomer={()=>{setCustomerId(customer.id); setOpenDeleteCOnfirmationModal(true)}}
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
                            rowsPerPageOptions={[5,15,20,25,50,100]}
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
                                recordsLimit={recordsLimit}
                                pageIndex={pageIndex}
                                searchBy={searchBy}
                                itemStatus={itemStatus}
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
                                itemStatus={itemStatus}
                            />
                        }
                    </div>

                    {/* Delete confirmation Modal */}
                    <div>
                    {openDeleteCOnfirmationModal && 
                            <DeleteConfirmationModal
                                onClose={()=>{setOpenDeleteCOnfirmationModal(false)}}
                                onDelete={()=>{handleCustomerDelete()}}
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
        getCustomersList : (limit, page, searchBy, itemStatus)=> dispatch(Actions.getCustomersList(limit, page, searchBy, itemStatus)),
        deleteCustomer : (customerId, recordsLimit, pageIndex, searchBy, itemStatus)=>{dispatch(Actions.deleteCustomer(customerId, recordsLimit, pageIndex, searchBy, itemStatus))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurtomerHomePage);
