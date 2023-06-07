import {Box, useTheme} from "@mui/material";
import * as React from "react";
import Header from "../../../components/header/header";

import {useLocation, useNavigate} from "react-router-dom";
import {extractFromUri} from "../../../utils";
import {params, paths} from "../../../app-paths";
import {PaginationModel} from "../../../model/pagination-model";
import {Device} from "../../../model/device";
import {DeviceSimpleOutputDTO, dtoToDevice} from "../../../api/dto/output/device-output";
import {AppButton} from "../../../components/buttons/app-button";
import {tokens} from "../../../theme";
import {GroupDevicesInputDTO} from "../../../api/dto/input/group-devices";
import AddDevicesToGroupDialog from "../../../components/group/dialog/add-devices-to-group-dialog";
import DeviceList from "../../../components/device/device-list";
import {Page} from "../../../model/page";
import DeleteGroupDialog from "../../../components/group/dialog/delete-group-dialog";
import UpdateGroupDialog from "../../../components/group/dialog/update-group-dialog";
import {GroupInputUpdateDTO} from "../../../api/dto/input/group-update-input";
import {DevicesGroup} from "../../../model/group";
import RemoveGroupDevicesDialog from "../../../components/group/dialog/delete-devices-dialog";
import {
    GroupDialogReducer,
    GroupDialogReducerAction,
    GroupDialogReducerState,
    GroupDialogs
} from "./group-dialog-reducer";
import {PageOutputDTO} from "../../../api/dto/output/page-output";
import {constants} from "../../../constants";
import {
    addGroupDevices,
    deleteGroup,
    getDevicesFromGroup, getDevicesGroup,
    removeGroupDevices,
    updateGroup
} from "../../../api/axios/groups/api";
import { getDevices } from "../../../api/axios/device/api";

export interface DeviceInformation{
    device: Device
    groupsID: number[]
}

export default function GroupPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const { pathname} = useLocation();
    const ids = extractFromUri(pathname, paths.dashboard.group)
    const validatedGroupID = parseInt(ids[params.group]);

    const [groupInformation, setGroupInformation] =
        React.useState<DevicesGroup>(null)
    const [isLoadingDevices, setIsLoadingDevices] =
        React.useState(false)
    const [groupDevicesPage, setGroupDevicesPage] =
        React.useState<Page<Device>>(null)
    const [devicesIDSelected, setDevicesIDSelected] = React.useState<
        Array<number>
    >([]);

    const checkboxListPagination =
        React.useRef<PaginationModel>(constants.groupPage.DEFAULT_CHECKBOX_LIST_PAGINATION)
    const [groupDevicesPagination, setGroupDevicesPagination] =
        React.useState<PaginationModel>(constants.groupPage.DEFAULT_GROUP_DEVICES_PAGINATION)

    const [checkboxListDevices, setCheckboxListDevices] =
        React.useState<Array<DeviceInformation>>([])
    const [loadingMoreCheckBoxDevices, setLoadingMoreCheckBoxDevices] =
        React.useState(false)
    const isLastCheckBoxPage = React.useRef<Boolean>(false)

    const [resetScrollToTop, setResetScrollToTop] = React.useState(false)
    const searchQuery = React.useRef(null)

    const [dialogState, dispatchDialog] : [GroupDialogReducerState, (action: GroupDialogReducerAction) => void]
        = React.useReducer(
          GroupDialogReducer,
        {
            openUpdateGroupDialog: false,
            openDeleteGroupDialog: false,
            openRemoveGroupDevicesDialog: false,
            openAddDevicesToGroupDialog: false
        }
    )

    const reloadGroupDevicesPage = async () => {
        console.log("FETCHING GROUP....")
        setIsLoadingDevices(true)
        const devicesDTOPage =
            await getDevicesFromGroup(groupDevicesPagination, validatedGroupID)
        const devicesItems : Device[] = devicesDTOPage.items.map((deviceDTO: DeviceSimpleOutputDTO) =>
            dtoToDevice(deviceDTO))
        const deviceModelPage: Page<Device> = { ...devicesDTOPage, items: devicesItems };
        setGroupDevicesPage(deviceModelPage)
        setIsLoadingDevices(false);
    }

    const getCheckboxListDevices = async (pagination: PaginationModel, searchQuery: {"search": string} = null) => {
        const devicesDTOPage : PageOutputDTO<DeviceSimpleOutputDTO> =
            await getDevices(pagination, false, searchQuery) as PageOutputDTO<DeviceSimpleOutputDTO>
        isLastCheckBoxPage.current = devicesDTOPage.isLast
        return devicesDTOPage.items.map((deviceDTO) => {
            return {"device": dtoToDevice(deviceDTO), "groupsID": deviceDTO.deviceGroupsID}
        })
    }

    const fetchCheckboxListDevices = async () => {
        checkboxListPagination.current = constants.groupPage.DEFAULT_CHECKBOX_LIST_PAGINATION
        const devices: DeviceInformation[] = await getCheckboxListDevices(checkboxListPagination.current)
        setCheckboxListDevices(devices)
    }  
    
    const fetchMoreCheckBoxDevices = async () => { 
        if(isLastCheckBoxPage.current) return
        const newModel =
            {...checkboxListPagination.current, page: checkboxListPagination.current.page + 1}

        const devices: DeviceInformation[] = await getCheckboxListDevices(newModel, searchQuery.current)
        checkboxListPagination.current = newModel
        setCheckboxListDevices([...checkboxListDevices, ...devices])
    }

    const onCheckBoxListSearch = async (inputValue: string) => {
        const query = {search: inputValue}
        searchQuery.current = query
        checkboxListPagination.current = constants.groupPage.DEFAULT_CHECKBOX_LIST_PAGINATION
        const devices: DeviceInformation[] = await getCheckboxListDevices(searchQuery.current, query)
        setCheckboxListDevices(devices)
    }

    const onAddDevicesRequest = () => {
        fetchCheckboxListDevices()
        dispatchDialog({type: "open", target: GroupDialogs.ADD_DEVICES})
    }

    const onAddDevicesSubmit = async (selectedDevices: Array<Device>) => {
        const newDevices = selectedDevices.map((device) => device.id)
        const groupDevicesUpdateInput: GroupDevicesInputDTO = {devicesIDs: newDevices}
        await addGroupDevices(groupDevicesUpdateInput, validatedGroupID)
        reloadGroupDevicesPage()
        dispatchDialog({type: "close", target: GroupDialogs.ADD_DEVICES})
    }

    const onGroupUpdateSubmit = async (input: GroupInputUpdateDTO) => {
        await updateGroup(input, validatedGroupID)
        setGroupInformation({id: validatedGroupID, ...input})
        dispatchDialog({type: "close", target: GroupDialogs.UPDATE})
    }
    const onGroupDeleteSubmit = async () => {
        await deleteGroup(validatedGroupID)
        dispatchDialog({type: "close", target: GroupDialogs.DELETE})
        navigate(paths.dashboard.groups)
    }

    const onDevicesRemoveSubmit = async (input: GroupDevicesInputDTO) => {
        await removeGroupDevices(input, validatedGroupID);
        reloadGroupDevicesPage();
        setDevicesIDSelected((previous) => {
          return previous.filter((id) => !input.devicesIDs.includes(id));
        });
        dispatchDialog({type: "close", target: GroupDialogs.REMOVE_DEVICES})
      };

    const onInputValueChange = (input) => {
        if (input === "") {
          fetchCheckboxListDevices().then((_) => {
            setResetScrollToTop(true);
          });
          searchQuery.current = null;
          return;
        }
        if (!input) return;
        onCheckBoxListSearch(input).then((_) => {
            setResetScrollToTop(true)
        });
      };

    React.useEffect(() => {
        const getInitialGroupInfo = async () => {
            const groupDTO = await getDevicesGroup(validatedGroupID)
            setGroupInformation(groupDTO as DevicesGroup)
        }

        getInitialGroupInfo()
    }, [])
    
    React.useEffect(() => {
        reloadGroupDevicesPage()
    }, [groupDevicesPagination])        

    React.useEffect(() => {
        if(!loadingMoreCheckBoxDevices) return
        fetchMoreCheckBoxDevices().then((_) => {
            setLoadingMoreCheckBoxDevices(false)
        })
    }, [loadingMoreCheckBoxDevices])

    return(
        <Box m="20px">
            {groupInformation !== null && <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Header 
                    title={groupInformation.name}
                    subTitle={groupInformation.description}
                />
                    <div style={{ display: "flex" }}>
                        <AppButton
                            text="Add Devices"
                            onClick={onAddDevicesRequest}
                            backgroundColor={colors.buttonAccent.add.backgroundColor} 
                            hoverColor={colors.buttonAccent.add.hoverColor}            
                        />
                        {devicesIDSelected.length > 0 && (
                            <AppButton 
                                text="Delete Devices"
                                onClick={() => dispatchDialog({type: "open", target: GroupDialogs.REMOVE_DEVICES})}
                                backgroundColor={colors.buttonAccent.delete.backgroundColor}
                                hoverColor={colors.buttonAccent.delete.hoverColor}
                             /> 
                        )}
                        <AppButton 
                                text="Delete Group"
                                onClick={() => dispatchDialog({type: "open", target: GroupDialogs.DELETE})}
                                backgroundColor={colors.buttonAccent.delete.backgroundColor}
                                hoverColor={colors.buttonAccent.delete.hoverColor}
                        /> 
                        <AppButton
                            text="Edit Group"
                            onClick={() => dispatchDialog({type: "open", target: GroupDialogs.UPDATE})}
                            backgroundColor={colors.blueAccent[500]}
                            hoverColor={colors.blueAccent[500]}
                        />
                    </div>
            </div>}
            
            <Box m="40px 0 0 0" height="75vh">
                <DeviceList
                    isLoading={isLoadingDevices}
                    currentPage={groupDevicesPage}
                    paginationModel={groupDevicesPagination}
                    onPaginationModelChange={setGroupDevicesPagination}
                    onRowSelection={setDevicesIDSelected}
                    onRowUpdate={() => {}}
                    onRowInfoRequest={(deviceID) => navigate(paths.dashboard.devices + "/" + deviceID)}
                    rowSelectionModel={devicesIDSelected}
                    enableEdit={false}
                />
            </Box>
            
            <DeleteGroupDialog
                isOpen={dialogState.openDeleteGroupDialog}
                handleClose={() => dispatchDialog({type: "close", target: GroupDialogs.DELETE})}
                onSubmit={() => onGroupDeleteSubmit()}
                theme={theme}
            />

            <RemoveGroupDevicesDialog
                isOpen={dialogState.openRemoveGroupDevicesDialog}
                handleClose={() => dispatchDialog({type: "close", target: GroupDialogs.REMOVE_DEVICES})}
                onSubmit={() => onDevicesRemoveSubmit({devicesIDs: devicesIDSelected})}
                theme={theme}
            />

            {groupInformation !== null  && <UpdateGroupDialog
                isOpen={dialogState.openUpdateGroupDialog}
                handleClose={() => dispatchDialog({type: "close", target: GroupDialogs.UPDATE})}
                onSubmit={onGroupUpdateSubmit}
                theme={theme} 
                defaultValues={{
                    name: groupInformation.name,
                    description: groupInformation.description
                } as GroupInputUpdateDTO}
            />}
            
            <AddDevicesToGroupDialog
                isOpen={dialogState.openAddDevicesToGroupDialog}
                onSubmit={onAddDevicesSubmit}
                handleClose={() => dispatchDialog({type: "close", target: GroupDialogs.ADD_DEVICES})}
                theme = {theme}
                dialogTitle="Add Devices to Group"
                devicesInformation={checkboxListDevices}
                groupID={validatedGroupID}
                isLoadingDevices={loadingMoreCheckBoxDevices}
                resetScrollToTop={resetScrollToTop}
                onScrollReset={() => setResetScrollToTop(false)}
                onSearchInputChange={onInputValueChange}
                loadMoreDevices={() => setLoadingMoreCheckBoxDevices(true)}
            />
        </Box>
    )
}