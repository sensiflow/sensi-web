import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { devices } from "../../../api/fake/mock-data";
import * as React from 'react';
import { Device, DeviceProcessingState } from "../../../model/device";
import { Page } from "../../../model/page";
import Header from "../../../components/Header";
import GreenOnlineCircle from "../../../components/processing-status/green_online_circle";
import RedOfflineSquare from "../../../components/processing-status/red_offline_square";
import YellowPausedRectangles from "../../../components/processing-status/yellow_paused_state";


// Function to return component based on onlineability
const getDeviceStatusComponent = (state) => {
    switch (state) {
      case DeviceProcessingState.ONLINE:
        return <GreenOnlineCircle />;
      case DeviceProcessingState.OFFLINE:
        return <RedOfflineSquare />;
      case DeviceProcessingState.PAUSED:
        return <YellowPausedRectangles/>;
      default:
        return null; // Return null for unknown states or handle error case TODO
    }
  };

const deviceColumnDefinition: GridColDef<Device>[] = [
    { field: 'name', headerName: 'Name', editable: true, flex: 1},
    { field: 'description', headerName: 'Description', editable: true, flex: 1},
    { field: 'stream', headerName: "Stream", flex: 1},
    { 
        field: 'status', 
        headerName: "Processing Status", 
        flex: 2,
        renderCell: ({row: {status}}) => getDeviceStatusComponent(DeviceProcessingState[status]),
        align: 'center',
        headerAlign: 'center'
    }
  ];
  

export default function Devices(){
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({pageSize: 5, page: 0})
    return DevicesStateless(devices, paginationModel, (newModel) => setPaginationModel(newModel) )
}

function DevicesStateless(
    devicesPage: Page<Device>, 
    paginationModel: GridPaginationModel,
    onPaginationModelChange: (GridPaginationModel) => void
){

    const devices: Array<Device> = devicesPage.items
    const columnNames: GridColDef<Device>[] = deviceColumnDefinition

    return <Box m="20px">
        <Header title="Devices" subtitle="Managing the organization devices"/>
        <Box m="40px 0 0 0" height="75vh">
            <DataGrid
            autoHeight
            checkboxSelection
            density="comfortable"
            editMode="cell"
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange} 
            columns={columnNames} 
            rows={devices}
            />
        </Box>
    </Box> 
    
}