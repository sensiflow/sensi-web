import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Theme } from "@mui/material";
import * as React from "react";
import { DeviceFormDialogProps } from "./device-dialog-interface";
import { dialogSx } from "./styles";
import { useForm } from "react-hook-form";
import { DeviceInputDTO } from "../../../api/dto/input/device-input";


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
  const [isClosed, setIsClosed] = React.useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<DeviceInputDTO>({defaultValues})

  const nameRegisterOption = isRequiredField(requiredTextFields, 'name') ? { required: 'Name is required' } : { required: false }
  const descriptionRegisterOption = isRequiredField(requiredTextFields, 'description') ? { required: 'Description is required' } : { required: false }
  const streamUrlRegisterOption = isRequiredField(requiredTextFields, 'streamUrl') ? { required: 'Stream URL is required' } : { required: false }

  React.useEffect(() => {
    reset()
    setIsClosed(false)
  }, [isClosed]);

  const onCloseHandler = () => {
    handleClose()
    setIsClosed(true)
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={onCloseHandler}
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
              {...register('streamUrl', streamUrlRegisterOption)}
              error={!!errors.streamUrl}
              helperText={errors.streamUrl?.message}
              color='secondary'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseHandler} color="secondary">
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
