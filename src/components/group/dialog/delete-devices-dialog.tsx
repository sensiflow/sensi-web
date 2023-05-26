import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { dialogSx } from './styles';
import { Theme } from '@mui/material';


interface DeleteGroupDevicesDialogProps {
    isOpen: boolean;
    theme: Theme;
    handleClose: () => void;
    onSubmit: () => void;
}

export default function DeleteGroupDevicesDialog({
  isOpen, 
  theme, 
  handleClose, 
  onSubmit
}: DeleteGroupDevicesDialogProps) {

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
          This will delete the devices permanently from the group. 
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