import Dialog from "@mui/material/Dialog";
import { RegisterInputDTO } from "../../../api/dto/input/register-input";
import { DialogProps } from "../../dialog/dialog-interface";
import * as React from 'react';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { dialogSx } from "../../device/dialog/styles";
import { UserRole } from "../../../model/roles";
import { DropDownMenu } from "../../dropdown-menu";
import { User } from "../../../model/user";


interface UpdateRoleDialogProps {
    isOpen: boolean
    handleClose: () => void
    onSubmit: (newRole: UserRole) => void
    theme: any
    user: User
    possibleRoles: UserRole[]
}


export function UpdateRoleDialog(
    { 
        isOpen,
        handleClose,
        onSubmit,
        theme,
        user,
        possibleRoles
    } : UpdateRoleDialogProps
){
    const [role, setRole] = React.useState<UserRole>(user.role)

    return (
    <div>
        <Dialog open={isOpen} onClose={handleClose}
        sx={dialogSx(theme)}
        >
            <DialogTitle>
                {`Changing role of ${user.firstName} ${user.lastName}`}
            </DialogTitle>
            <DialogContent>

                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <DropDownMenu //TODO: add role colors
                        label='Role'
                        values={possibleRoles}
                        defaultValue={user.role}
                        onValueChange={(it)=> {
                            setRole(UserRole[it]);
                        }}
                    />
                </div>
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
                    onSubmit(role)
                    handleClose()
                }}>
                Confirm Change
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}
