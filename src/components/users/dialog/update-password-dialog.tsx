import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { PasswordUpdateDTO } from "../../../api/dto/input/user-inputs";
import { PasswordConstraints } from "../../../model/user";
import { dialogSx } from "../../dialog/styles";
import { DialogProps } from "../../dialog/dialog-interface";
import { PasswordTextField } from "../password-text-field";




export function UpdatePasswordDialog({
    isOpen,
    handleClose,
    onSubmit,
    theme
}: DialogProps<PasswordUpdateDTO>){

    const {
        handleSubmit,
        register,
        watch,
        reset,
        formState: { errors }
    } = useForm<PasswordUpdateDTO>({})


    React.useEffect(() => {
        reset()
        }, [isOpen]);
    

    const PasswordEqualConstraints = {
        required: 'Confirm Password is required',
        validate: (value: string) => {
            return value === watch('password') || 'The passwords do not match'
        }
    }

    return (
    <div>
        <Dialog open={isOpen} onClose={handleClose}
        sx={dialogSx(theme)}
        >
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Update password</DialogTitle>
            <DialogContent>
            <PasswordTextField
                label="Password"
                constraints={register('password', PasswordConstraints)}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <PasswordTextField
                label="Confirm Password"
                constraints={register('repeatPassword', PasswordEqualConstraints)}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword?.message}
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