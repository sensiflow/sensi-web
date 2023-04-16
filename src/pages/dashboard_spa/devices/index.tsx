import { Box, Button } from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import { GridPaginationModel } from "@mui/x-data-grid";
import { devices as mockDevices } from "../../../api/fake/mock-data";
import * as React from 'react';
import Header from "../../../components/Header";
import DeviceList from "../../../components/device/device-list";
import CreateDeviceDialog from "../../../components/device/create-device-dialog";
import { DeviceInput } from "../../../components/device/create-device-dialog";
import { Device } from "../../../model/device";
import { Page } from "../../../model/page";




export default function DevicesPage(){
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({pageSize: 5, page: 0})
    const [openDialog, setOpenDialog] = React.useState(false);
    const [devices, setDevices] = React.useState(mockDevices)
    
    const theme: Theme = useTheme()
    const hoverColor = theme.palette.mode === 'dark' ? '#09A065' : '#0BC87E'
    
    return (
    <Box m="20px">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
        <Header title="Devices" subtitle="Managing the organization devices"/>

        <Button variant="contained" sx={{
          "width":"150px",
          "height":"60px", 
          "color":"white", 
          "font-size":"15px",
          "backgroundColor":"#2EE59D", 
          ":hover": {
              "backgroundColor": hoverColor,
            },
          "box-shadow": "0px 8px 15px " + hoverColor}}
          onClick={() => setOpenDialog(true)}
          >
          Add
        </Button>
      </div>
      <Box m="40px 0 0 0" height="75vh">
          <DeviceList
            devicesPage={devices}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
      </Box>
      <CreateDeviceDialog
        isOpen={openDialog}
        handleClose={() => setOpenDialog(false)}
        onSubmit={(input: DeviceInput) => {
          const device: Device = {
            id: devices.items.length + 1,
            name: input.name,
            description: input.description,
            status: "OFFLINE",
            stream: input.streamUrl,
            user: 1
          }

          setDevices((previous) => {
            return {
              totalPages: previous.totalPages,
              totalElements: previous.totalElements + 1,
              isLast: true,
              isFirst: true,
              items: [...previous.items, device],
            }
          })
          setOpenDialog(false)
        }}
        theme={theme}
      />
    </Box>
    )
}

