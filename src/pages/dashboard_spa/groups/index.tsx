import * as React from "react";
import { DevicesGroup } from "../../../model/group";
import GroupList from "../../../components/groups/group-list";
import { Box, useTheme } from "@mui/material";
import useWindowSize from "../../../logic/hooks/use-window-size";
import { dtoToDevice } from "../../../api/dto/output/device-output";
import {createDevicesGroup, getDevicesFromGroup, getDevicesGroups} from "../../../api/axios/groups/api";
import {AppButton} from "../../../components/buttons/app-button";
import {tokens} from "../../../theme";
import { CreateGroupDialog } from "../../../components/groups/dialog/create-group-dialog";
import {GroupInputDTO} from "../../../api/dto/input/group-input";
import {GroupsDialogReducer, GroupsDialogReducerAction, GroupsDialogReducerState, GroupsDialogs} from "./groups-dialog-reducer";
import {APIError, errorFallback} from "../../utils";
import {debounce} from "lodash";
import {useNavigate} from "react-router-dom";
import {appToast, ToastType} from "../../../components/toast";
import { constants } from "../../../constants";
import {PaginationModel} from "../../../model/pagination-model";
import {UserRole} from "../../../model/roles";
import {useAuth} from "../../../logic/context/auth-context";

export default function GroupsPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate()

    const windowSize = useWindowSize()
    const numberOfDevicesRatio = 0.0026041667

    const { user } = useAuth()
    const userRole = user.role;
    const hasCreatePermission = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;

    // Groups hooks
    const [isPageLoading, setIsPageLoading] = React.useState(false)
    const [loadingMoreGroups, setLoadingMoreGroups] = React.useState(false)
    const groupPaginationModel =
        React.useRef<PaginationModel>(constants.groupsPage.DEFAULT_GROUP_DEVICES_PAGINATION)
    const [groups, setGroups] = React.useState<Array<DevicesGroup>>([])
    const isLastGroupPage = React.useRef<Boolean>(false)

    // Group's devices hooks
    const initialNumberOfDevices = Math.floor(windowSize.width * numberOfDevicesRatio)
    const devicesPaginationModel = React.useRef<PaginationModel>({pageSize: initialNumberOfDevices, page: 0})
    const [groupDevices, setGroupDevices] = React.useState([])


    // Dialog reducer
    const [dialogState, dispatchDialog] : [GroupsDialogReducerState, (action: GroupsDialogReducerAction) => void]
        = React.useReducer(
        GroupsDialogReducer,
        {
            openCreateGroupDialog: false
        }
    )

    React.useEffect(() => {
        const handleScroll = debounce(event => {
            const isBottom =
                windowSize.height + event.target.scrollTop + 1 >=
                event.target.scrollHeight - constants.groupsPage.SCROLL_HEIGHT_OFFSET;

            if(!loadingMoreGroups && !isLastGroupPage.current && isBottom){
                setLoadingMoreGroups(true)
            }
        }, constants.groupsPage.SCROLL_DEBOUNCE_MS)
        
        window?.addEventListener('scroll', handleScroll, true);

        fetchPageInformation().then((_) => {
            setIsPageLoading(false)
        })

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])


    const fetchPageInformation = async () => {
        try{
            setIsPageLoading(true)
            const devicesGroupsDTOPage =
                await getDevicesGroups(groupPaginationModel.current)
            isLastGroupPage.current = devicesGroupsDTOPage.isLast
            const devicesListPromises = devicesGroupsDTOPage.items.map(async (group) => {
                const groupDevices = await getDevicesFromGroup(devicesPaginationModel.current, group.id)
                console.log(groupDevices)
                return {
                    groupID: group.id,
                    devices: groupDevices.items.map((deviceDTO) => dtoToDevice(deviceDTO))
                }
            })

            const groupDevices = await Promise.all(devicesListPromises)
            setGroups(devicesGroupsDTOPage.items)
            setGroupDevices(groupDevices)
        }catch (e) {
            errorFallback(e, navigate)
        }

    }

    const fetchMoreGroups = async () => {
        try{
            const newModel =
                { ...groupPaginationModel.current, page: groupPaginationModel.current.page + 1 }
            const devicesGroupsDTOPage = await getDevicesGroups(newModel)
            isLastGroupPage.current = devicesGroupsDTOPage.isLast
            groupPaginationModel.current = newModel
            setGroups((previous) => {
                const newGroups = [...previous, ...devicesGroupsDTOPage.items]
                updateGroupDevices(newGroups, devicesPaginationModel.current)
                return newGroups
            })
        }catch (e){
            errorFallback(e, navigate)
        }

    }

    const updateGroupDevices = async (groups, paginationModel) => {
        try{
            const devicesListPromises = groups.map(async (group) => {
                const groupDevices = await getDevicesFromGroup(paginationModel, group.id)
                return {
                    groupID: group.id,
                    devices: groupDevices.items.map((deviceDTO) => dtoToDevice(deviceDTO))
                }
            })
            const groupDevices = await Promise.all(devicesListPromises)
            setGroupDevices(groupDevices)
        } catch (e) {
            errorFallback(e, navigate)
        }
    }

    const onGroupCreateSubmit = async (inputDTO: GroupInputDTO) => {
        try{
            await createDevicesGroup(inputDTO)
            await fetchPageInformation()
            setIsPageLoading(false)
            dispatchDialog({type: "close", target: GroupsDialogs.CREATE})
        }catch (e){
            if(e.status === APIError.BAD_REQUEST) { appToast(ToastType.ERROR, "Invalid group input"); return }
            errorFallback(e, navigate)
        }
    }

    React.useEffect(() => {
        if(!loadingMoreGroups) return
        fetchMoreGroups().then((_) => {
            setLoadingMoreGroups(false)
        })
    }, [loadingMoreGroups])

    React.useEffect(() => {
        const numberOfDevices = Math.floor(windowSize.width * numberOfDevicesRatio)
        if(numberOfDevices !== devicesPaginationModel.current.pageSize){
            const newModel =
                { ...devicesPaginationModel.current, pageSize: numberOfDevices }
            updateGroupDevices(groups, newModel)
            devicesPaginationModel.current = newModel

        }   
    }, [windowSize])

    return(
        <Box m="20px">
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end"
                }}
            >
                {hasCreatePermission && <AppButton
                    text={"Add a group"}
                    backgroundColor={colors.buttonAccent.add.backgroundColor}
                    hoverColor={colors.buttonAccent.add.hoverColor}
                    onClick={() => dispatchDialog({type: "open", target: GroupsDialogs.CREATE})}
                />}
            </div>

            <GroupList
                isLoading={isPageLoading}
                groups={groups}
                groupDevices={groupDevices}
            />

            <CreateGroupDialog
                dialogTitle={"Create a new group"}
                isOpen={dialogState.openCreateGroupDialog}
                handleClose={() => dispatchDialog({type: "close", target: GroupsDialogs.CREATE})}
                onSubmit={(inputDTO: GroupInputDTO) => onGroupCreateSubmit(inputDTO)
                }
                theme={theme}
            />
        </Box>
    )
}