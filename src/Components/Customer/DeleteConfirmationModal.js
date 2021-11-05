import * as React from 'react';
import { Paper, Modal, Typography, Button, Box } from '@material-ui/core';

const DeleteConfirmationModal=(props)=> {
    const {onClose, onDelete} = props;


  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Box className="detete-confirmation-modal">
            <b style={{fontSize : '1.2rem'}}>Are you sure you want to delete this customer?</b>

            <div style={{display : 'flex', marginTop : '1rem', justifyContent : 'space-between'}}>
                <Button  variant="contained" color="primary" onClick={onClose}>No</Button>
                <Button  variant="contained" color="primary" onClick={onDelete}>Yes</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}


export default DeleteConfirmationModal;