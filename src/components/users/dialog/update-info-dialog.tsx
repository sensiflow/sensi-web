import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"
import * as React from "react"
import { EmailConstraints, NameConstraints, User } from "../../../model/user"
import { useForm } from "react-hook-form"
import { UserInfoUpdateDTO } from "../../../api/dto/input/user-inputs"
import { DialogProps } from "../../dialog/dialog-interface"
import {dialogSx} from "../../dialog/styles";


interface UpdateInfoDialogProps extends DialogProps<UserInfoUpdateDTO> {
    defaultValues : UserInfoUpdateDTO
    label: string
}

export function UserUpdateInfoDialog (
    { 
        isOpen,
        handleClose,
        onSubmit,
        theme,
        defaultValues,
        label
     } : UpdateInfoDialogProps
){

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
      } = useForm<UserInfoUpdateDTO>({
        defaultValues: defaultValues
      })
    

    React.useEffect(() => {
        reset(defaultValues)
    }, [defaultValues]);
    

    return (
    <div>
        <Dialog open={isOpen} onClose={handleClose} sx={dialogSx(theme)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    {label}
                </DialogTitle>
                <DialogContent>

                <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        {...register('firstName', { ...NameConstraints , required: false })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        color='secondary'
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        {...register('lastName', { ...NameConstraints , required: false })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        color='secondary'
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                    Confirm Change
                </Button>
                </DialogActions>
            </form>
        </Dialog>
    </div>
    )
}