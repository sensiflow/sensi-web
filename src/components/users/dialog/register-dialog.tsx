import Dialog from "@mui/material/Dialog";
import { RegisterInputDTO } from "../../../api/dto/input/register-input";
import { DialogProps } from "../../dialog/dialog-interface";
import * as React from 'react';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { dialogSx } from "../../dialog/styles";
import { useForm } from "react-hook-form";
import { UserRole } from "../../../model/roles";
import { EmailConstraints, NameConstraints, PasswordConstraints } from "../../../model/user";
import { DropDownMenu } from "../../dropdown-menu";
import { PasswordTextField } from "../password-text-field";


interface RegisterDialogProps extends DialogProps<RegisterInputDTO> {
  possibleRoles: UserRole[]
}

export interface RegisterDialogForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export function RegisterDialog(
    { isOpen, handleClose, onSubmit, theme , possibleRoles }: RegisterDialogProps
){

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<RegisterDialogForm>({})

  React.useEffect(() => {
      reset()
    }, [isOpen]);
  
  return (
  <div>
    <Dialog open={isOpen} onClose={handleClose}
      sx={dialogSx(theme)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Register a new user</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', EmailConstraints )}
            error={!!errors.email}
            helperText={errors.email?.message}
            color='secondary'
          />
          <TextField
            required
            label="First Name"
            fullWidth
            margin="normal"
            {...register('firstName', { ...NameConstraints , required: 'FirstName is required' })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            color='secondary'
          />
          <TextField
            required
            label="Last Name"
            fullWidth
            margin="normal"
            {...register('lastName', { ...NameConstraints ,required: 'LastName is required' })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            color='secondary'
          />
          <PasswordTextField
            label="Password"
            constraints={register('password', PasswordConstraints)}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <DropDownMenu //TODO: add role colors
            label='Role'
            values={possibleRoles}
            onValueChange={(it)=> {
              setValue('role', it)
            }}
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
  )
}
