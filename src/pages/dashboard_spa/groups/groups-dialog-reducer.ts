import {DialogReducer, DialogReducerAction} from "../../../logic/reducers/dialog-reducer";

export type GroupsDialogReducerState = {
    openCreateGroupDialog : boolean
}

export enum GroupsDialogs{
    CREATE = "create_group",
}

export type GroupsDialogReducerAction = DialogReducerAction<GroupsDialogs>

const dialogsAssociation = {
    [GroupsDialogs.CREATE]: "openCreateGroupDialog",
}

export const GroupsDialogReducer = (state: GroupsDialogReducerState, action: GroupsDialogReducerAction) => {
    return DialogReducer<GroupsDialogs, GroupsDialogReducerState>(state, action, dialogsAssociation)
}