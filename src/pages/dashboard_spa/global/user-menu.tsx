import { PersonOutlined } from "@mui/icons-material"
import * as React from "react"
import { DropMenu } from "../../../components/three-dot-menu"
import {Box, useTheme} from "@mui/material";
import { UserUpdateDTO, PasswordUpdateDTO } from "../../../api/dto/input/user-inputs";
import { updateUser } from "../../../api/fake/fake-api";
import { UserUpdateInfoDialog } from "../../../components/users/dialog/update-info-dialog";
import { UpdatePasswordDialog } from "../../../components/users/dialog/update-password-dialog";
import { UserMenuDialogReducerState, UserMenuDialogReducerAction, UserMenuDialogReducer, UserMenuDialogs } from "./user-menu-dialog-reducer";


export function UserMenu(){

    const [user, setUser] = React.useState(null);
    const theme = useTheme();

    const onLogout = () => {
    }
    const reloadUser =  () => {
    }

    const [dialogState, dispatchDialog] : [UserMenuDialogReducerState, (action: UserMenuDialogReducerAction) => void]
    = React.useReducer(
        UserMenuDialogReducer,
     {
       openUpdatePasswordDialog: false,
       openUpdateInfoDialog: false,
     }
    );




    const onUserUpdateSubmit = async (input: UserUpdateDTO) => {
    const userUpdateInput = {
        firstName: input.firstName,
        lastName: input.lastName
    }
    await updateUser(user.id,userUpdateInput);

    reloadUser()
    dispatchDialog({type: "close", target: UserMenuDialogs.UPDATE_INFO})
    }

    const onPasswordUpdateSubmit = async (input: PasswordUpdateDTO) => {
    const userUpdateInput = {
        password : input.password
    }
    await updateUser(user.id,userUpdateInput);
    reloadUser()
    dispatchDialog({type: "close", target: UserMenuDialogs.UPDATE_PASSWORD})
    }
    const onUpdateClick= () =>  dispatchDialog({type: "open", target: UserMenuDialogs.UPDATE_INFO})
    const onPasswordUpdateClick=() => dispatchDialog({type: "open", target: UserMenuDialogs.UPDATE_PASSWORD})

    const options = [
        {
            label: "Update User Info",
            handler: onUpdateClick
        },
        {
            label: "Update Password",
            handler: onPasswordUpdateClick
        }
    ]

    return (
        <Box>
            <DropMenu options={options} icon={<PersonOutlined />} />
            <UpdatePasswordDialog
                isOpen={dialogState.openUpdatePasswordDialog}
                handleClose={() => dispatchDialog({type: "close", target: UserMenuDialogs.UPDATE_PASSWORD})}
                onSubmit={onPasswordUpdateSubmit}
                theme={theme}
            />
            { user && 
            <UserUpdateInfoDialog
                isOpen={dialogState.openUpdateInfoDialog}
                handleClose={() => dispatchDialog({type: "close", target: UserMenuDialogs.UPDATE_INFO})}
                onSubmit={onUserUpdateSubmit}
                theme={theme}
                user={user}
                label={`Update your information:`}
            />
            }
        </Box>
    )
}