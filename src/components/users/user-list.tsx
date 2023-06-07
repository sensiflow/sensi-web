import { GridPaginationModel, GridColDef, DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { LinearProgress } from "@mui/material";
import { MenuOption, ThreeDotMenu } from "../three-dot-menu";
import { User } from "../../model/user";
import { DataGridListProps } from "../lists/data-grid-list";
import InfoMousePopover from "../info-pop-over";


interface OptionsColumnHandlers {
    onPasswordUpdateClick?: (user: User) => void;
    onUserUpdateClick?: (user: User) => void;
    onRoleUpdateClick?: (user: User) => void;
    onUserDeleteClick?: (user: User) => void;
}

export enum UserAction{
    UpdatePassword,
    UpdateInfo,
    UpdateRole,
    DeleteUser
}

const gridRowOptions = (handlers: OptionsColumnHandlers, row: User, canUserActOn : (user: User, userAction : UserAction) => boolean ) => {
    const menuOptions : MenuOption[] = []


    handlers.onUserUpdateClick && canUserActOn(row,UserAction.UpdateInfo) && menuOptions.push({
        label: "Update User Info",
        handler: () => handlers.onUserUpdateClick(row)
    })
    handlers.onPasswordUpdateClick && canUserActOn(row,UserAction.UpdatePassword) && menuOptions.push({
        label: "Update Password",
        handler: () => handlers.onPasswordUpdateClick(row)
    }) 
    handlers.onRoleUpdateClick && canUserActOn(row,UserAction.UpdateRole) && menuOptions.push({
        label: "Update Role",
        handler: () => handlers.onRoleUpdateClick(row)
    })
    handlers.onUserDeleteClick && canUserActOn(row,UserAction.DeleteUser) && menuOptions.push({
        label: "Delete User",
        handler: () => handlers.onUserDeleteClick(row)
    })


    return (
        menuOptions.length > 0 ? (
      <div>
        <ThreeDotMenu
            options={menuOptions}
        />
      </div>
        ) : (
            <div>
                <InfoMousePopover
                    info = "You do not have permission to act on this user."
                />
            </div>
        )

    );
};

function userColumnDefinition(handlers: OptionsColumnHandlers, canUserActOn : (user: User,userAction:UserAction) => boolean ): GridColDef<User>[] {
    return [
        { field: "firstName", headerName: "First Name", flex: 1.4 },
        { field: "lastName", headerName: "Last Name", flex: 1.4 },
        { field: "email", headerName: "Email", flex: 2 },
        { field: "role", headerName: "Role", flex: 1 },
        {
            field: " ",
            headerName: " ",
            disableColumnMenu: true,
            disableReorder: true,
            sortable: false,
            renderCell: (grid) => gridRowOptions(handlers, grid.row, canUserActOn),
            flex: 0.9,
            align: "center",
          },
    ]
}


/**
 * Represents a list of users in a data grid.
 */
interface UserListProps extends DataGridListProps<User> {
    onPasswordUpdateClick?: (user: User) => void;
    onUserUpdateClick?: (user: User) => void;
    onRoleUpdateClick?: (user: User) => void;
    onUserDeleteClick?: (user: User) => void;
    canUserActOn: (user: User,userAction : UserAction) => boolean;
}

export default function UserList({
    isLoading,
    currentPage,
    paginationModel,
    onPaginationModelChange,
    onPasswordUpdateClick,
    onUserUpdateClick,
    onRoleUpdateClick,
    onUserDeleteClick,
    canUserActOn
}: UserListProps) {
    const users: Array<User> = currentPage?.items;
    const columnNames: GridColDef<User>[] = userColumnDefinition({
        onPasswordUpdateClick,
        onUserUpdateClick,
        onRoleUpdateClick,
        onUserDeleteClick
    },
    canUserActOn
    );

    return (
        <DataGrid
            paginationMode="server"
            keepNonExistentRowsSelected
            autoHeight
            density="comfortable"
            disableRowSelectionOnClick
            loading={isLoading}
            slots={{
                loadingOverlay: LinearProgress,
            }}
            editMode="cell"
            pageSizeOptions={[5, 10, 20]}
            paginationModel={paginationModel as GridPaginationModel}
            onPaginationModelChange={onPaginationModelChange}
            rowCount={currentPage?.totalElements ?? 0}
            columns={columnNames}
            rows={users ?? []}
      />
    )
}

