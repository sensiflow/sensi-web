import { Box, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { DevicesGroup } from "../../model/group";
import { tokens } from "../../theme";
import { Device } from "../../model/device";
import Header from "../header/header";
import DeviceBox from "./device-box";
import DividerBtn from "../search-more-divider";
import { AppButton } from "../buttons/app-button";
import { GroupDevicesInputDTO } from "../../api/dto/input/group-devices";
import AddDevicesToGroupDialog from "../group/dialog/add-devices-to-group-dialog";
import { useNavigate } from "react-router-dom";
import { paths } from "../../app-paths";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface GroupListProps{
    isLoading: boolean
    groups: Array<DevicesGroup>
    groupDevices: {groupID: number, devices: Array<Device>}[]
}

export default function GroupList(
    {
      isLoading,
      groups,
      groupDevices
    }: GroupListProps
){  
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const dividerColor = colors.greenAccent[500]
    const deviceColors = [
        colors.greenAccent[500],
        colors.redAccent[500],
        colors.blueAccent[500],
        colors.grey[500],
    ];
    
    const getRandomDeviceColor = () => {
        const index = Math.floor(Math.random() * deviceColors.length);
        return deviceColors[index];
    };

    const deviceBoxMetrics = {
        width: 280, 
        height: 190
    }

    const onAddDevicesToGroupButtonClick = (groupID: number) => {
        navigate(paths.dashboard.groups + "/" + groupID)
    }

    const navigateToGroup = (groupID: number) => {
        navigate(paths.dashboard.groups + "/" + groupID)
    }
    return (
            <> { !isLoading &&
                groups?.map((group) => {
                    const devicesGroup = groupDevices?.find((groupDevice) => {
                        return groupDevice.groupID === group.id
                    })

                    const devices = devicesGroup?.devices
                    const devicesIsEmpty = devices?.length === 0
                    return <Box 
                        key={`group ${group.id}`}
                        m= "20px"
                        width="100%"
                    >           
                        <Header 
                            onHeaderClick={() => {
                                navigateToGroup(group.id)
                            }}
                            title={group.name} 
                            subTitle={group.description}
                        />

                        <Box 
                            key={`${group.id} devices`}
                            display= 'flex'
                            justifyContent= {devicesIsEmpty ? 'center' : 'flex-start'}
                            alignItems= {devicesIsEmpty ? 'center' : 'start'}
                            gap= '10px'
                        >
                        {
                            devicesIsEmpty ?
                            <Box 
                                display= 'flex'
                                height={deviceBoxMetrics.height}
                                justifyContent= 'center'
                                alignItems= 'center'
                            >
                                <AppButton
                                    text="Add Devices"
                                    backgroundColor={colors.buttonAccent.add.backgroundColor}
                                    hoverColor={colors.buttonAccent.add.hoverColor}
                                    onClick={() => onAddDevicesToGroupButtonClick(group.id)}
                                />
                            </Box> :
                            devices?.map((device: Device) => {
                                return <DeviceBox
                                    key={device.id}
                                    device={device}
                                    boxMetrics={deviceBoxMetrics}
                                    boxShadowColor={getRandomDeviceColor()}
                                />
                            })
                        } 
                        </Box>
                        
                        <DividerBtn
                            keyID={group.id}
                            text="More Info"
                            btnIcon={<NavigateNextIcon sx={{color:dividerColor}}/>}
                            dividerColor={dividerColor}
                            hideShowMoreButton={devicesIsEmpty}
                            onShowMore={() => {
                                navigateToGroup(group.id)
                            }}
                        />
                    </Box>
                })
            }</>
    )
}

