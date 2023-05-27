import { DialogReducer, DialogReducerAction } from "../../../logic/reducers/dialog-reducer";

export type UserMGMDialogReducerState = {
    openUpdateRoleDialog : boolean,
    openUpdateInfoDialog : boolean,
    openUpdatePasswordDialog : boolean,
    openRegisterDialog : boolean,
    openDeleteDialog : boolean,
  }
  

export enum UserMGMDialogs{
    REGISTER = "register",
    UPDATE_INFO = "update_info",
    UPDATE_PASSWORD = "update_password",
    UPDATE_ROLE = "update_role",
    DELETE = "delete"
}

export type UserMGMDialogReducerAction = DialogReducerAction<UserMGMDialogs>

const dialogsAssociation = {
  [UserMGMDialogs.REGISTER] : "openRegisterDialog",
  [UserMGMDialogs.UPDATE_INFO] : "openUpdateInfoDialog",
  [UserMGMDialogs.UPDATE_PASSWORD] : "openUpdatePasswordDialog",
  [UserMGMDialogs.UPDATE_ROLE] : "openUpdateRoleDialog",
  [UserMGMDialogs.DELETE] : "openDeleteDialog" 
}

export const UserMGMDialogReducer = (state : UserMGMDialogReducerState, action: UserMGMDialogReducerAction) => {

  return DialogReducer<UserMGMDialogs,UserMGMDialogReducerState>(state, action, dialogsAssociation)
}