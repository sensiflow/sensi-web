import { Box, useTheme } from "@mui/material";
import * as React from "react";
import Header from "../../../components/header/Header";

import { useLocation, useNavigate } from "react-router-dom";
import { deleteGroup, getDevices, getDevicesFromGroup, getDevicesGroup, updateGroup, addGroupDevices, removeGroupDevices } from "../../../api/fake/fake-api";
import { extractFromUri } from "../../../utils";
import { params, paths } from "../../../app-paths";
import { PaginationModel } from "../../../model/pagination-model";
import { Device } from "../../../model/device";
import { dtoToDevice } from "../../../api/dto/output/device-output";
import { AppButton } from "../../../components/buttons/app-button";
import { tokens } from "../../../theme";
import { GroupDevicesInputDTO } from "../../../api/dto/input/group-devices";
import AddDevicesToGroupDialog from "../../../components/group/dialog/add-devices-to-group-dialog";
import DeviceList from "../../../components/device/device-list";
import { Page } from "../../../model/page";
import DeleteGroupDialog from "../../../components/group/dialog/delete-group-dialog";
import UpdateGroupDialog from "../../../components/group/dialog/update-group";
import { GroupInputUpdateDTO } from "../../../api/dto/input/group-update-input";
import { DevicesGroup } from "../../../model/group";
import DeleteGroupDevicesDialog from "../../../components/group/dialog/delete-devices-dialog";

export default function GroupPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { pathname} = useLocation();
    const ids = extractFromUri(pathname, paths.dashboard.group)
    const validatedGroupID = parseInt(ids[params.group]);
    const [groupInfo, setGroupInfo] = React.useState<DevicesGroup>(null)
    const [isLoadingDevices, setIsLoadingDevices] = React.useState(false)

    const [groupDevicesPages, setGroupDevicesPages] = React.useState<Page<Device>>(null)

    const checkboxListPagination = React.useRef<PaginationModel>({pageSize: 10, page: 0})
    const [groupDevicesPagination, setGroupDevicesPagination] = React.useState<PaginationModel>({pageSize: 5, page: 0})

    const [checkboxListDevices, setCheckboxListDevices] = React.useState<Array<Device>>([])
    const [loadingMoreCheckBoxDevices, setLoadingMoreCheckBoxDevices] = React.useState(false)
    const isLastCheckBoxPage = React.useRef<Boolean>(false)

    const [openAddDevicesToGroupDialog, setOpenAddDevicesToGroupDialog] = React.useState(false)
    const [openDeleteGroupDialog, setOpenDeleteGroupDialog] = React.useState(false)
    const [openDeleteGroupDevicesDialog, setOpenDeleteGroupDevicesDialog] = React.useState(false)
    const [openUpdateGroupDialog, setOpenUpdateGroupDialog] = React.useState(false)
    const [resetScrollToTop, setResetScrollToTop] = React.useState(false)
    const searchQuery = React.useRef(null)

    const [devicesIDSelected, setDevicesIDSelected] = React.useState<
        Array<number>
    >([]);

    const fetchGroupDevices = async () => {
        console.log("FETCHING GROUP DEVICES....")
        setIsLoadingDevices(true)
        const devicesDTOPage = await getDevicesFromGroup(groupDevicesPagination, validatedGroupID)
        const devicesItems = devicesDTOPage.items.map((deviceDTO) => dtoToDevice(deviceDTO))
        const deviceModelPage: Page<Device> = { ...devicesDTOPage, items: devicesItems };
        setGroupDevicesPages(deviceModelPage)
        setIsLoadingDevices(false);
    }

    const fetchCheckboxListDevices = async () => {
        checkboxListPagination.current = {pageSize: 10, page: 0}
        const devicesDTOPage = await getDevices(checkboxListPagination.current)
        isLastCheckBoxPage.current = devicesDTOPage.isLast
        const devices = devicesDTOPage.items.map((deviceDTO) => dtoToDevice(deviceDTO))
        //TODO: disable already added devices
        setCheckboxListDevices(devices)
    }  
    
    const fetchMoreCheckBoxDevices = async () => { 
        if(isLastCheckBoxPage.current) return
        const newModel = {...checkboxListPagination.current, page: checkboxListPagination.current.page + 1}
        const devicesDTOPage = await getDevices(newModel, false, searchQuery.current)
        isLastCheckBoxPage.current = devicesDTOPage.isLast
        checkboxListPagination.current = newModel
        const devices = devicesDTOPage.items.map((deviceDTO) => dtoToDevice(deviceDTO))
        setCheckboxListDevices([...checkboxListDevices, ...devices])
    }

    const onCheckBoxListSearch = async (inputValue: string) => {
        const query = {search: inputValue}
        searchQuery.current = query
        checkboxListPagination.current = {pageSize: 10, page: 0}
        const devicesDTOPage = await getDevices(checkboxListPagination.current, false , query)
        isLastCheckBoxPage.current = devicesDTOPage.isLast
        const devices = devicesDTOPage.items.map((deviceDTO) => dtoToDevice(deviceDTO))
        setCheckboxListDevices(devices)
    }
    
    const onCheckBoxListSubmit = async (selectedDevices: Array<Device>) => {
        const newDevices = selectedDevices.map((device) => device.id)
        const groupDevicesUpdateInput: GroupDevicesInputDTO = {devicesIDs: newDevices}
        await addGroupDevices(groupDevicesUpdateInput, validatedGroupID)
        fetchGroupDevices()
        setOpenAddDevicesToGroupDialog(false)
    }

    const onAddDevicesToGroupBtnClick = () => {
        fetchCheckboxListDevices()
        setOpenAddDevicesToGroupDialog(true)
    }

    const onGroupUpdateSubmit = async (input: GroupInputUpdateDTO) => {
        await updateGroup(input, validatedGroupID)
        setGroupInfo({id: validatedGroupID, ...input})
        setOpenUpdateGroupDialog(false)
    }
    const onGroupDeleteSubmit = async () => {
        await deleteGroup(validatedGroupID)
        setOpenDeleteGroupDialog(false)
        navigate(paths.dashboard.groups)
    }

    const onDevicesDeleteSubmit = async (input: GroupDevicesInputDTO) => {
        await removeGroupDevices(input, validatedGroupID);
        fetchGroupDevices();
        setDevicesIDSelected((previous) => {
          return previous.filter((id) => !input.devicesIDs.includes(id));
        });
        setOpenDeleteGroupDevicesDialog(false);
      };

    const navigateToDevice = (deviceID: number) => {
        navigate(paths.dashboard.devices + "/" + deviceID);
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


    const getGroupInfo = async () => {
        const groupDTO = await getDevicesGroup(validatedGroupID)
        setGroupInfo(groupDTO as DevicesGroup)
    }

    React.useEffect(() => {
        getGroupInfo()
    }, [])
    
    React.useEffect(() => {
        fetchGroupDevices()
    }, [groupDevicesPagination])        

    React.useEffect(() => {
        if(!loadingMoreCheckBoxDevices) return
        fetchMoreCheckBoxDevices().then((_) => {
            setLoadingMoreCheckBoxDevices(false)
        })
    }, [loadingMoreCheckBoxDevices])

    return(
        <Box m="20px">
            {groupInfo !== null && <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Header 
                    title={groupInfo.name}
                    subTitle={groupInfo.description}
                />
                    <div style={{ display: "flex" }}>
                        <AppButton
                            text="Add Devices"
                            onClick={onAddDevicesToGroupBtnClick} 
                            backgroundColor={colors.buttonAccent.add.backgroundColor} 
                            hoverColor={colors.buttonAccent.add.hoverColor}            
                        />
                        {devicesIDSelected.length > 0 && (
                            <AppButton 
                                text="Delete Devices"
                                onClick={() => setOpenDeleteGroupDevicesDialog(true)}
                                backgroundColor={colors.buttonAccent.delete.backgroundColor}
                                hoverColor={colors.buttonAccent.delete.hoverColor}
                             /> 
                        )}
                        <AppButton 
                                text="Delete Group"
                                onClick={() => setOpenDeleteGroupDialog(true)}
                                backgroundColor={colors.buttonAccent.delete.backgroundColor}
                                hoverColor={colors.buttonAccent.delete.hoverColor}
                        /> 
                        <AppButton
                            text="Edit Group"
                            onClick={() => setOpenUpdateGroupDialog(true)}
                            backgroundColor={colors.blueAccent[500]}
                            hoverColor={colors.blueAccent[500]}
                        />
                    </div>
            </div>}
            
            <Box m="40px 0 0 0" height="75vh">
                <DeviceList
                    isLoading={isLoadingDevices}
                    devicesPage={groupDevicesPages}
                    paginationModel={groupDevicesPagination}
                    onPaginationModelChange={setGroupDevicesPagination}
                    onRowSelection={setDevicesIDSelected}
                    onRowUpdate={() => {}}
                    onRowInfoRequest={navigateToDevice}
                    rowSelectionModel={devicesIDSelected}
                    enableEdit={false}
                />
            </Box>
            
            <DeleteGroupDialog
                isOpen={openDeleteGroupDialog}
                handleClose={() => setOpenDeleteGroupDialog(false)}
                onSubmit={() => onGroupDeleteSubmit()}
                theme={theme}
            />

            <DeleteGroupDevicesDialog
                isOpen={openDeleteGroupDevicesDialog}
                handleClose={() => setOpenDeleteGroupDevicesDialog(false)}
                onSubmit={() => onDevicesDeleteSubmit({devicesIDs: devicesIDSelected})}
                theme={theme}
            />

            {groupInfo !== null  && <UpdateGroupDialog
                isOpen={openUpdateGroupDialog}
                handleClose={() => setOpenUpdateGroupDialog(false)}
                onSubmit={onGroupUpdateSubmit}
                theme={theme} 
                defaultValues={{
                    name: groupInfo.name,
                    description: groupInfo.description
                } as GroupInputUpdateDTO}
            />}
            
            <AddDevicesToGroupDialog
                isOpen={openAddDevicesToGroupDialog}
                onSubmit={onCheckBoxListSubmit}
                handleClose={() => setOpenAddDevicesToGroupDialog(false)}
                theme = {theme}
                dialogTitle="Add Devices to Group"
                devices={checkboxListDevices}
                isLoadingDevices={loadingMoreCheckBoxDevices}
                resetScrollToTop={resetScrollToTop}
                onScrollReset={() => setResetScrollToTop(false)}
                onSearchInputChange={onInputValueChange}
                loadMoreDevices={() => setLoadingMoreCheckBoxDevices(true)}
            />
        </Box>
    )
}