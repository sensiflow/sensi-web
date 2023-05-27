import { DialogReducer, DialogReducerAction } from "../../../logic/reducers/dialog-reducer"

export enum UserMenuDialogs  {
    UPDATE_INFO = "update_info",
    UPDATE_PASSWORD = "update_password"
}

const dialogsAssociation = {
    [UserMenuDialogs.UPDATE_INFO] : "openUpdateInfoDialog",
    [UserMenuDialogs.UPDATE_PASSWORD] : "openUpdatePasswordDialog",
}


export type UserMenuDialogReducerState = {
    openUpdateInfoDialog : boolean,
    openUpdatePasswordDialog : boolean,
}
  
export type UserMenuDialogReducerAction = DialogReducerAction<UserMenuDialogs>


export const UserMenuDialogReducer = (state : UserMenuDialogReducerState, action: UserMenuDialogReducerAction) => {

    return DialogReducer<UserMenuDialogs,UserMenuDialogReducerState>(state, action, dialogsAssociation)
}