import {DialogReducer, DialogReducerAction} from "../../../logic/reducers/dialog-reducer";

export type GroupDialogReducerState = {
    openAddDevicesToGroupDialog : boolean,
    openRemoveGroupDevicesDialog : boolean,
    openDeleteGroupDialog : boolean,
    openUpdateGroupDialog : boolean
}

export enum GroupDialogs{
    ADD_DEVICES = "add_devices",
    REMOVE_DEVICES = "remove_devices",
    UPDATE = "update",
    DELETE = "delete"
}

export type GroupDialogReducerAction = DialogReducerAction<GroupDialogs>

const dialogsAssociation = {
    [GroupDialogs.ADD_DEVICES]: "openAddDevicesToGroupDialog",
    [GroupDialogs.REMOVE_DEVICES]: "openRemoveGroupDevicesDialog",
    [GroupDialogs.DELETE]: "openDeleteGroupDialog",
    [GroupDialogs.UPDATE]: "openUpdateGroupDialog"
}

export const GroupDialogReducer = (state: GroupDialogReducerState, action: GroupDialogReducerAction) => {
    return DialogReducer<GroupDialogs, GroupDialogReducerState>(state, action, dialogsAssociation)
}