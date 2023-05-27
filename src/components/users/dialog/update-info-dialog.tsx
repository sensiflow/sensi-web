import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"
import * as React from "react"
import { dialogSx } from "../../device/dialog/styles"
import { EmailConstraints, NameConstraints, User } from "../../../model/user"
import register from "../../../pages/register"
import { useForm } from "react-hook-form"
import { UserInfoUpdateDTO } from "../../../api/dto/input/user-inputs"
import { DialogProps } from "../../dialog/dialog-interface"


interface UpdateInfoDialogProps extends DialogProps<UserInfoUpdateDTO> {
    user : User
    label: string
}

export function UserUpdateInfoDialog (
    { 
        isOpen,
        handleClose,
        onSubmit,
        theme,
        user,
        label
     } : UpdateInfoDialogProps
){

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
      } = useForm<UserInfoUpdateDTO>({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName
        }})
    

    React.useEffect(() => {
        reset()
    }, [isOpen]);
    

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