import * as React from "react";
import { PaginationModel } from "../../../model/pagination-model";
import { DevicesGroup } from "../../../model/group";
import GroupList from "../../../components/groups/group-list";
import { Box } from "@mui/material";
import useWindowSize from "../../../logic/hooks/use-window-size";
import { dtoToDevice } from "../../../api/dto/output/device-output";
import { debounce } from "lodash";
import {getDevicesFromGroup, getDevicesGroups} from "../../../api/axios/groups/api";

export default function GroupsPage() {

    const windowSize = useWindowSize()
    const numberOfDevicesRatio = 0.0026041667
    const [isPageLoading, setIsPageLoading] = React.useState(false)

    const [loadingMoreGroups, setLoadingMoreGroups] = React.useState(false)

    const [groups, setGroups] = React.useState<Array<DevicesGroup>>([])
    const [groupDevices, setGroupDevices] = React.useState([])

    const groupPaginationModel = React.useRef<PaginationModel>({pageSize: 5, page: 0})
    const initialNumberOfDevices = Math.floor(windowSize.width * numberOfDevicesRatio)
    const devicesPaginationModel = React.useRef<PaginationModel>({pageSize: initialNumberOfDevices, page: 0})
    const isLastGroupPage = React.useRef<Boolean>(false)


    React.useEffect(() => {
        const handleScroll = debounce(event => {
            const isBottom = windowSize.height + event.target.scrollTop + 1 >= event.target.scrollHeight - 120;
            if(!loadingMoreGroups && !isLastGroupPage.current && isBottom){
                setLoadingMoreGroups(true)
            }
        }, 20)
        
        window?.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])


    const fetchPageInformation = async () => {
        setIsPageLoading(true)
        const devicesGroupsDTOPage = await getDevicesGroups(groupPaginationModel.current)
        isLastGroupPage.current = devicesGroupsDTOPage.isLast
        const devicesListPromises = devicesGroupsDTOPage.items.map(async (group) => {
            const groupDevices = await getDevicesFromGroup(devicesPaginationModel.current, group.id)
            return {
                groupID: group.id,
                devices: groupDevices.items.map((deviceDTO) => dtoToDevice(deviceDTO))
            }
        })

        const groupDevices = await Promise.all(devicesListPromises)
        setGroups(devicesGroupsDTOPage.items)
        setGroupDevices(groupDevices) 
    }

    React.useEffect(() => {
        fetchPageInformation().then((_) => {
            setIsPageLoading(false)
        })
    }, [])

    const fetchMoreGroups = async () => {
        const newModel = { ...groupPaginationModel.current, page: groupPaginationModel.current.page + 1 }
        const devicesGroupsDTOPage = await getDevicesGroups(newModel)
        isLastGroupPage.current = devicesGroupsDTOPage.isLast
        groupPaginationModel.current = newModel
        setGroups((previous) => {
            const newGroups = [...previous, ...devicesGroupsDTOPage.items]
            updateGroupDevices(newGroups, devicesPaginationModel.current)
            return newGroups
        })
    }

    const updateGroupDevices = async (groups, paginationModel) => {
        const devicesListPromises = groups.map(async (group) => {
            const groupDevices = await getDevicesFromGroup(paginationModel, group.id)
            return {
                groupID: group.id,
                devices: groupDevices.items.map((deviceDTO) => dtoToDevice(deviceDTO))
            }
        })
        const groupDevices = await Promise.all(devicesListPromises)
        setGroupDevices(groupDevices) 
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
            const newModel = { ...devicesPaginationModel.current, pageSize: numberOfDevices }
            updateGroupDevices(groups, newModel)
            devicesPaginationModel.current = newModel

        }   
    }, [windowSize])

    return(
        <Box m="20px">
            <GroupList
                isLoading={isPageLoading}
                groups={groups}
                groupDevices={groupDevices}
            />
        </Box>
    )
}