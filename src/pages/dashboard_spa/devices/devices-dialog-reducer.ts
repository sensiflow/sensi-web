import {DialogReducer, DialogReducerAction} from "../../../logic/reducers/dialog-reducer";

export type DevicesDialogReducerState = {
    openCreateDialog : boolean,
    openDeleteDialog : boolean,
    openUpdateDialog : boolean,
    openUpdateDeviceUrlDialog : boolean
}

export enum DevicesDialogs{
    CREATE_DEVICE = "add_device",
    DELETE_DEVICE = "delete_device",
    UPDATE = "update",
    UPDATE_URL = "update_url"
}

export type DevicesDialogReducerAction = DialogReducerAction<DevicesDialogs>

const dialogsAssociation = {
    [DevicesDialogs.CREATE_DEVICE]: "openCreateDialog",
    [DevicesDialogs.DELETE_DEVICE]: "openDeleteDialog",
    [DevicesDialogs.UPDATE]: "openUpdateDialog",
    [DevicesDialogs.UPDATE_URL]: "openUpdateDeviceUrlDialog"
}

export const DevicesDialogReducer = (state: DevicesDialogReducerState, action: DevicesDialogReducerAction) => {
    return DialogReducer<DevicesDialogs, DevicesDialogReducerState>(state, action, dialogsAssociation)
}