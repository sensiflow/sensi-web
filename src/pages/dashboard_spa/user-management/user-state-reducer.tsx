
export type DialogReducerState = {
    openUpdateRoleDialog : boolean,
    openUpdateInfoDialog : boolean,
    openUpdatePasswordDialog : boolean,
    openRegisterDialog : boolean,
    openDeleteDialog : boolean,
  }
  

export enum UserDialogs{
    REGISTER = "register",
    UPDATE_INFO = "update_info",
    UPDATE_PASSWORD = "update_password",
    UPDATE_ROLE = "update_role",
    DELETE = "delete"
}

export type DialogReducerAction =
    {
      type: "open",
      target: UserDialogs
    }
    |
    {
      type: "close",
      target: UserDialogs
    } 
  
export const UserDialogReducer = (state : DialogReducerState,action: DialogReducerAction) => {

  const isOpen = action.type === "open" ? true : false;

    switch(action.target){
      case UserDialogs.REGISTER:
        return {...state, openRegisterDialog: isOpen}
      case UserDialogs.UPDATE_INFO:
        return {...state, openUpdateInfoDialog: isOpen}
      case UserDialogs.UPDATE_PASSWORD:
        return {...state, openUpdatePasswordDialog: isOpen}
      case UserDialogs.UPDATE_ROLE:
        return {...state, openUpdateRoleDialog: isOpen}
      case UserDialogs.DELETE:
        return {...state, openDeleteDialog: isOpen}
    
    default:
      return state;
  }
}