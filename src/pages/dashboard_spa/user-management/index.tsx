import { Box, Button } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import * as React from "react";
import Header from "../../../components/header/Header";
import { PaginationModel } from "../../../model/pagination-model";
import { Page } from "../../../model/page";
import {deleteUser, getUsers} from "../../../api/fake/fake-api";
import { User } from "../../../model/user";
import UserList from "../../../components/users/user-list";
import { UserMGMDialogReducer, UserMGMDialogs, UserMGMDialogReducerState, UserMGMDialogReducerAction } from "./user-mgm-dialog-reducer";
import { RegisterDialog } from "../../../components/users/dialog/register-dialog";
import { RegisterInputDTO } from "../../../api/dto/input/register-input";
import {PasswordUpdateDTO, UserRoleInput, UserUpdateDTO} from "../../../api/dto/input/user-inputs";
import { UpdatePasswordDialog } from "../../../components/users/dialog/update-password-dialog";
import { UserRole, checkRolePermission, getRoleHierarchy, getRolesBellow } from "../../../model/roles";
import { DeleteUserDialog } from "../../../components/users/dialog/delete-user-dialog";
import { UpdateRoleDialog } from "../../../components/users/dialog/update-role-dialog";
import { UserUpdateInfoDialog } from "../../../components/users/dialog/update-info-dialog";
import { useCurrentUser } from "../../../logic/context/user-context";
import {updateUser, updateUserRole} from "../../../api/axios/user/api";
import { register } from "../../../api/axios/authentication/api";


//TODO: cant delete myself
export default function UserManagementPage(){
    const theme: Theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
   
    const { currentUser, fetchCurrentUser } = useCurrentUser()
    const userRole = currentUser.role;
    const userID = currentUser.id


    const [paginationModel, setPaginationModel] = React.useState<PaginationModel>(
      { pageSize: 5, page: 0 }
    );
    const [isLoading, setIsLoading] = React.useState(true);
    const [users, setUsers] = React.useState<Page<User>>(null);
    const [dialogState, dispatchDialog] : [UserMGMDialogReducerState, (action: UserMGMDialogReducerAction) => void] 
     = React.useReducer(
      UserMGMDialogReducer,
      {
        openRegisterDialog: false,
        openUpdatePasswordDialog: false,
        openUpdateInfoDialog: false,
        openUpdateRoleDialog: false,
        openDeleteDialog: false
      }
    ); 
      
    const [userUnderUpdate, setUserUnderUpdate] =
      React.useState<User>(null);


    const addHoverColor = isDarkMode ? "#09A065" : "#0BC87E";
  
    const reloadUsersPage = async () => {
      setIsLoading(true);
      const userModelPage : Page<User> = await getUsers(paginationModel);
      setUsers(userModelPage);
      setIsLoading(false);
    };

    React.useEffect(() => {
      reloadUsersPage();
    }, [paginationModel]);



    //Open Dialog and set info

    const onUserUpdateRequest = (userToUpdate: User) => {
      setUserUnderUpdate(userToUpdate);
      dispatchDialog({type: "open", target: UserMGMDialogs.UPDATE_INFO});
    };

    const onPasswordUpdateRequest = (user: User) => {
      setUserUnderUpdate(user);
      dispatchDialog({type: "open", target: UserMGMDialogs.UPDATE_PASSWORD});
    }

    const onRoleUpdateRequest = (userToUpdate: User) => {
      setUserUnderUpdate(userToUpdate);
      dispatchDialog({type: "open", target: UserMGMDialogs.UPDATE_ROLE});
    }

    const onUserDeleteRequest = (user: User) => {
      setUserUnderUpdate(user);
      dispatchDialog({type: "open" , target: UserMGMDialogs.DELETE});
    };


    //Submit functions

    const onRegisterSubmit = async (input: RegisterInputDTO) => {

      await register(input)
      await reloadUsersPage()
      setUserUnderUpdate(null);
      dispatchDialog({type: "close", target: UserMGMDialogs.REGISTER})
    };

    const onPasswordUpdateSubmit = async (input: PasswordUpdateDTO) => {
      const userUpdateInput = {
        password : input.password
      }
      await updateUser(userUnderUpdate.id,userUpdateInput);
      await reloadUsersPage()
      setUserUnderUpdate(null);
      dispatchDialog({type: "close", target: UserMGMDialogs.UPDATE_PASSWORD})
    }

    const onUserDeleteSubmit = async (id : number) => {
      await deleteUser(id)
      await reloadUsersPage()

      setUserUnderUpdate(null);
      dispatchDialog({type: "close", target: UserMGMDialogs.DELETE})
    }

    const onRoleUpdateSubmit = async (newRole: UserRole) => {
      const newUserRole = {role: newRole} as UserRoleInput
      await updateUserRole(userUnderUpdate.id, newUserRole);

      await reloadUsersPage()

      if(currentUser.id === userUnderUpdate.id){
          console.log("fetching current user");
          await fetchCurrentUser()
      }

      setUserUnderUpdate(null);
      dispatchDialog({type: "close", target: UserMGMDialogs.UPDATE_ROLE})
    }

    const onUserUpdateSubmit = async (input: UserUpdateDTO) => {
      const userUpdateInput = {
        firstName: input.firstName,
        lastName: input.lastName
      }
      await updateUser(userUnderUpdate.id,userUpdateInput);

      await reloadUsersPage()
      if(currentUser.id === userUnderUpdate.id)
          await fetchCurrentUser();

      setUserUnderUpdate(null);
      dispatchDialog({type: "close", target: UserMGMDialogs.UPDATE_INFO})
    }



    const canUserActOn = (user: User) => {
      //if user is the same as the one being updated, then it can act
      if(userID === user.id) return true;
      else if(userRole === UserRole.ADMIN) return true;
      else {
        //else check if user can act on the other user
        const hierarchy = getRolesBellow(userRole)

        return hierarchy.includes(user.role);
      }
    }

    const possibleRegisterRoles = userRole === UserRole.ADMIN ? getRoleHierarchy(UserRole.ADMIN) : getRolesBellow(UserRole.MODERATOR);

    //Visibility of buttons
    const onUserUpdateClick = checkRolePermission(userRole, "users:update_info") ? onUserUpdateRequest : null;
    const onPasswordUpdateClick = checkRolePermission(userRole, "users:update_info") ? onPasswordUpdateRequest : null;
    const onRoleUpdateClick = checkRolePermission(userRole, "users:update_role") ? onRoleUpdateRequest : null;
    const onUserDeleteClick = checkRolePermission(userRole, "users:delete") ? onUserDeleteRequest : null;
    const isRegisterVisible = checkRolePermission(userRole, "users:register");

    return (
        <Box m="20px">
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Header
              title="User Management"
              subTitle="Managing the organization devices"
              isLoading={isLoading}
            />
            {isRegisterVisible && (
            <Box  style={{ display: "flex", margin: "0px 0px 20px, 20px" }}>
              <Button
                variant="contained"
                sx={{
                  width: "200px",
                  height: "60px",
                  color: "white",
                  "fontSize": "15px",
                  backgroundColor: "#2EE59D",
                  ":hover": {
                    backgroundColor: addHoverColor,
                  },
                  "boxShadow": "0px 8px 15px " + addHoverColor,
                }}
                onClick={() => dispatchDialog({type: "open", target: UserMGMDialogs.REGISTER}) }
              >
                Register a new user
              </Button>
            </Box>
            )}
          </Box>
    
          <Box m="40px 0 0 0" height="75vh">
              <UserList
                isLoading={isLoading}
                currentPage={users}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onPasswordUpdateClick={onPasswordUpdateClick}
                onRoleUpdateClick={onRoleUpdateClick}
                onUserUpdateClick={onUserUpdateClick}
                onUserDeleteClick={onUserDeleteClick}
                canUserActOn={canUserActOn}
              />
            <Box m="40px 0 0 0" />
          </Box>

          <RegisterDialog
            isOpen={dialogState.openRegisterDialog}
            handleClose={() => dispatchDialog({type: "close", target: UserMGMDialogs.REGISTER})}
            onSubmit={onRegisterSubmit}
            theme={theme}
            possibleRoles={possibleRegisterRoles}
          />

          <UpdatePasswordDialog
            isOpen={dialogState.openUpdatePasswordDialog}
            handleClose={() => dispatchDialog({type: "close", target: UserMGMDialogs.UPDATE_PASSWORD})}
            onSubmit={onPasswordUpdateSubmit}
            theme={theme}
          />
          
          { userUnderUpdate && 
            <DeleteUserDialog
              isOpen={dialogState.openDeleteDialog}
              handleClose={() => dispatchDialog({type: "close", target: UserMGMDialogs.DELETE})}
              onSubmit={onUserDeleteSubmit}
              theme={theme}
              user={userUnderUpdate}
            />
          }

          { userUnderUpdate && 
            <UpdateRoleDialog
              isOpen={dialogState.openUpdateRoleDialog}
              handleClose={() => dispatchDialog({type: "close", target: UserMGMDialogs.UPDATE_ROLE})}
              onSubmit={onRoleUpdateSubmit}
              theme={theme}
              user={userUnderUpdate}
              possibleRoles={getRoleHierarchy(userRole)}
            />
          }

          { userUnderUpdate && 
            <UserUpdateInfoDialog
              isOpen={dialogState.openUpdateInfoDialog}
              handleClose={() => dispatchDialog({type: "close", target: UserMGMDialogs.UPDATE_INFO})}
              onSubmit={onUserUpdateSubmit}
              theme={theme}
              defaultValues = {
                {
                    firstName: userUnderUpdate.firstName,
                    lastName: userUnderUpdate.lastName
                }
            }
              label={`Updating ${userUnderUpdate.firstName} ${userUnderUpdate.lastName}`}
            />
          }

        </Box>
      );
}
