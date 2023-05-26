import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Theme } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { DeviceInputDTO } from "../../../api/dto/input/device-input";
import { dialogSx } from "./styles";
import { GroupInputUpdateDTO } from "../../../api/dto/input/group-update-input";

interface UpdateGroupDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    onSubmit: (input: GroupInputUpdateDTO) => void;
    theme: Theme;
    defaultValues: GroupInputUpdateDTO;
}


const UpdateGroupDialog = (
    { 
      isOpen, 
      handleClose, 
      onSubmit, 
      theme, 
      defaultValues
    }: UpdateGroupDialogProps
) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<GroupInputUpdateDTO>({defaultValues})

  React.useEffect(() => {
    reset(defaultValues)
  }, [defaultValues]);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}
        sx={dialogSx(theme)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Update Group</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              color='secondary'
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
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

export default UpdateGroupDialog;