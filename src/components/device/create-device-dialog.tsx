import { useForm } from 'react-hook-form';
import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Theme } from '@mui/material';
import { tokens } from '../../theme';

export interface DeviceInput {
  name: string;
  description: string;
  streamUrl: string;
}

interface CreateDeviceDialogProps {
  isOpen: boolean;
  theme: Theme;
  handleClose: () => void;
  onSubmit: (DeviceInput) => void;
}

const CreateDeviceDialog = (
    { isOpen, handleClose, onSubmit, theme }: CreateDeviceDialogProps 
) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<DeviceInput>();
  const colors = tokens(theme.palette.mode)
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} 
        sx={{
          "& .MuiDialog-paper": {
            "backgroundColor": theme.palette.background.default,
            "borderRadius": "5px"
          }
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>New Device</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              color='secondary'
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description?.message}
              color='secondary'
            />
            <TextField
              label="Stream URL"
              fullWidth
              margin="normal"
              {...register('streamUrl', { required: 'Stream URL is required' })}
              error={!!errors.streamUrl}
              helperText={errors.streamUrl?.message}
              color='secondary'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateDeviceDialog;