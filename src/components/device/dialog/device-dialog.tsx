import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Theme } from "@mui/material";
import * as React from "react";
import { DeviceFormDialogProps } from "./device-dialog-interface";
import { dialogSx } from "../../dialog/styles";
import { useForm } from "react-hook-form";
import { DeviceInputDTO } from "../../../api/dto/input/device-input";
import {DescriptionConstraints, NameConstraints, StreamURLConstraints} from "../../../model/device";


const DeviceDialog = (
    { 
      dialogTitle,
      isOpen, 
      handleClose, 
      onSubmit, 
      theme, 
      requiredTextFields,
      defaultValues
    }: DeviceFormDialogProps
) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<DeviceInputDTO>({defaultValues})

  const nameRegisterOption =
      isRequiredField(requiredTextFields, 'name') ?
          {...NameConstraints, required: 'Name is required' } : { ...NameConstraints, required: false }
  const descriptionRegisterOption =
      isRequiredField(requiredTextFields, 'description') ?
          {...DescriptionConstraints, required: 'Description is required' } : {...DescriptionConstraints, required: false }
  const streamUrlRegisterOption =
      isRequiredField(requiredTextFields, 'streamURL') ?
          {...StreamURLConstraints, required: 'Stream URL is required' } : {...StreamURLConstraints,  required: false }

  React.useEffect(() => {
    reset()
  }, [isOpen]);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}
        sx={dialogSx(theme)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register('name', nameRegisterOption)}
              error={!!errors.name}
              helperText={errors.name?.message}
              color='secondary'
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              {...register('description', descriptionRegisterOption)}
              error={!!errors.description}
              helperText={errors.description?.message}
              color='secondary'
            />
            <TextField
              label="Stream URL"
              fullWidth
              margin="normal"
              {...register('streamURL', streamUrlRegisterOption)}
              error={!!errors.streamURL}
              helperText={errors.streamURL?.message}
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

const isRequiredField = (fields: string[], name: string) => {
    return fields.includes(name)
}

export default DeviceDialog;
