import { GridPaginationModel, GridColDef, DataGrid } from "@mui/x-data-grid"
import { Device, DeviceProcessingState } from "../../model/device"
import { Page } from "../../model/page"
import * as React from "react"
import GreenOnlineCircle from "./processing-status/green_online_circle"
import RedOfflineSquare from "./processing-status/red_offline_square"
import YellowPausedRectangles from "./processing-status/yellow_paused_state"

interface DeviceListProps{
    devicesPage: Page<Device>,
    paginationModel: GridPaginationModel,
    onPaginationModelChange: (GridPaginationModel) => void
  }
  
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

export default function DeviceList(
      {
        devicesPage,
        paginationModel,
        onPaginationModelChange
      }: DeviceListProps
  ){
      const devices: Array<Device> = devicesPage.items
      const columnNames: GridColDef<Device>[] = deviceColumnDefinition
  
      return <DataGrid
        autoHeight
        checkboxSelection
        density="comfortable"
        editMode="cell"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange} 
        columns={columnNames} 
        rows={devices}
      />
      
  }