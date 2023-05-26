
import { Box, useTheme } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Device } from "../../model/device";
import { tokens } from "../../theme";
import DeviceBox from "../groups/device-box";
import DividerBtn from "../search-more-divider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface GroupDeviceListProps{
    isLoadingMoreDevices: boolean
    devices: Array<Device>;
    isPageFull: boolean
    isLastPage: Boolean
    loadMoreDevices: () => void
}

export default function GroupDeviceList(
    {   
        loadMoreDevices,
        isLoadingMoreDevices,
        isPageFull,
        isLastPage,
        devices
    }: GroupDeviceListProps
){  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const dividerColor = colors.greenAccent[500]
    //TODO: CHANGE TO CONSTANTS
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

    //TODO: CHANGE TO CONSTANTS
    const deviceBoxMetrics = {
        width: 280, 
        height: 190
    }

    return (
            <> {
                <Box 
                    m= "20px"
                    width="100%"
                >           
                    <Box 
                        marginTop='40px'
                        display= 'flex'
                        justifyContent= 'center'
                        alignItems= 'center'
                        flexWrap= 'wrap'
                        gap= '10px'
                    >
                        {
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
                    {isPageFull && !isLastPage && <DividerBtn
                        keyID={'page-'}
                        text={'Show More'}
                        btnIcon={<ExpandMoreIcon sx={{color:dividerColor}}/>}
                        dividerColor={dividerColor}
                        hideShowMoreButton={false}
                        onShowMore={loadMoreDevices}
                    />}
                </Box>
            }</>
    )
}