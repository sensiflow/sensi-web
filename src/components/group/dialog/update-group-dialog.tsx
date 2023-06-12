import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Theme } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import {dialogSx} from "../../dialog/styles";
import {GroupInputDTO} from "../../../api/dto/input/group-input";

interface UpdateGroupDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    onSubmit: (input: GroupInputDTO) => void;
    theme: Theme;
    defaultValues: GroupInputDTO;
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
  } = useForm<GroupInputDTO>({defaultValues})

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