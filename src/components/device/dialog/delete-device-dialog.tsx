import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { dialogSx } from '../../dialog/styles';
import { DeleteDeviceDialogProps } from './device-dialog-interface';


export default function DeleteDeviceDialog({
  isOpen, 
  theme, 
  handleClose, 
  onSubmit
}: DeleteDeviceDialogProps) {

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={dialogSx(theme)}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Devices"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure? 
          This will interrupt every on-going processing and metric analysis of these devices. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}