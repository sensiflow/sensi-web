import { PersonOutlined } from "@mui/icons-material"
import * as React from "react"
import { DropMenu } from "../../../components/three-dot-menu"
import {Box, useTheme} from "@mui/material";
import { UserUpdateDTO, PasswordUpdateDTO } from "../../../api/dto/input/user-inputs";

import { UserUpdateInfoDialog } from "../../../components/users/dialog/update-info-dialog";
import { UpdatePasswordDialog } from "../../../components/users/dialog/update-password-dialog";
import { UserMenuDialogReducerState, UserMenuDialogReducerAction, UserMenuDialogReducer, UserMenuDialogs } from "./user-menu-dialog-reducer";
import {useAuth} from "../../../logic/context/auth-context";
import { updateUser } from "../../../api/axios/user/api";

export function UserMenu(){
    const theme = useTheme();

    const { user, fetchCurrentUser, logout } = useAuth()

    const [dialogState, dispatchDialog] : [UserMenuDialogReducerState, (action: UserMenuDialogReducerAction) => void]
    = React.useReducer( UserMenuDialogReducer,
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

        await fetchCurrentUser()
        dispatchDialog({type: "close", target: UserMenuDialogs.UPDATE_INFO})
    }

    const onPasswordUpdateSubmit = async (input: PasswordUpdateDTO) => {
        const userUpdateInput = {
            password : input.password
        }
        await updateUser(user.id,userUpdateInput);
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
        },
        {
            label: "Logout",
            handler: logout
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
                defaultValues = {
                    {
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                }
                label={`Update your information:`}
            />
            }
        </Box>
    )
}