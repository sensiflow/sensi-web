import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import * as React from "react";
import { dialogSx } from "../../device/dialog/styles";
import { User } from "../../../model/user";


interface DeleteUserDialogProps {
    isOpen: boolean
    handleClose: () => void
    onSubmit: (id: number) => void
    theme: any
    user : User
}

export function DeleteUserDialog({
    isOpen,
    handleClose,
    onSubmit,
    theme,
    user
}: DeleteUserDialogProps){

    return (
    <div>
        <Dialog open={isOpen} onClose={handleClose}
            sx={dialogSx(theme)}
        >

        <DialogTitle>{`Deleting user: ${user.firstName} ${user.lastName}`}</DialogTitle>
        <DialogContent>
            Confirm Deletion?
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="secondary">
            Cancel
        </Button>
        <Button variant="contained" color="error" onClick={() => {
            onSubmit(user.id)
            handleClose()
        }} >
            Confirm
        </Button>
        </DialogActions>

        </Dialog>
    </div>
    )
}