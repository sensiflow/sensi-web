import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import * as React from 'react';
import { UpdateDeviceUrlDialogProps } from './device-dialog-interface';
import { dialogSx } from './styles';

export default function UpdateDeviceUrlDialog({
  isOpen, 
  theme, 
  handleClose, 
  onSubmit
}: UpdateDeviceUrlDialogProps) {

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
          {"Updating Device's Url"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure? 
          Changing this will interrupt every on-going processing and metric analysis of these devices. 
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