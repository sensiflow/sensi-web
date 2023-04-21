import { Box, Button } from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import * as React from 'react';
import Header from "../../../components/Header";
import DeviceList from "../../../components/device/device-list";
import CreateDeviceDialog from "../../../components/device/dialog/create-device-dialog";
import { Device } from "../../../model/device";
import DeleteDeviceDialog from "../../../components/device/dialog/delete-device-dialog";
import UpdateDeviceDialog from "../../../components/device/dialog/update-device-dialog";
import { DeleteDeviceInputDTO, DeviceInputDTO } from "../../../api/dto/input/device-input";
import { createDevice, deleteDevices, getDevices, updateDevice } from "../../../api/fake/fake-api";
import { PaginationModel } from "../../../model/pagination-model";
import { Page } from "../../../model/page";

export default function DevicesPage(){
    const [paginationModel, setPaginationModel] = React.useState<PaginationModel>({pageSize: 5, page: 0})
    const [isLoading, setIsLoading] = React.useState(true)

    const [openCreateDialog, setOpenCreateDialog] = React.useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false)

    const [devices, setDevices] = React.useState<Page<Device>>(null)
    const [devicesIDSelected, setDevicesIDSelected] = React.useState<Array<number>>([])
    const [currentDeviceBeingUpdated, setCurrentDeviceBeingUpdated] = React.useState<Device>(null)

    const theme: Theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'

    const addHoverColor = isDarkMode ? '#09A065' : '#0BC87E'
    const redTone = isDarkMode ? 'red' : "#e53935"
    const deleteHoverColor = isDarkMode ? '#E53935' : '#F44336'

    const reloadDevicesPage = async () => {
      setIsLoading(true)
      const page = await getDevices(paginationModel)
      setDevices(page as Page<Device>)
      setIsLoading(false)
    } 

    React.useEffect(() => {
      reloadDevicesPage()
    }, [paginationModel])

    const onDeviceCreateSubmit = async (input: DeviceInputDTO) => {
      await createDevice(input)
      reloadDevicesPage()
      setOpenCreateDialog(false)
      //navigate to device page
    }

    const onDeviceDeleteSubmit = async (input: DeleteDeviceInputDTO) => {
      await deleteDevices(input)
      reloadDevicesPage()
      setDevicesIDSelected((previous) => {
        return previous.filter((id) => !input.ids.includes(id))
      })
      setOpenDeleteDialog(false)
    }

    const onDeviceUpdateRequest = (deviceToUpdate: Device) => {
      setCurrentDeviceBeingUpdated(deviceToUpdate)
      setOpenUpdateDialog(true)
    }

    const onDeviceUpdateSubmit = async (input: DeviceInputDTO) => {
      //TODO: alert user that changing the streamUrl shuts down the processing
      await updateDevice(input, currentDeviceBeingUpdated.id)
      reloadDevicesPage()
      setOpenUpdateDialog(false)
    }

    return (
    <Box m="20px">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
        <Header title="Devices" subtitle="Managing the organization devices"/>

        <div style={{display: 'flex', margin: '0px 0px 20px, 20px'}}>
          {devicesIDSelected.length > 0 && <Button variant="contained" sx={{
            "width":"150px",
            "height":"60px", 
            "color":"white", 
            "fontSize":"15px",
            "backgroundColor": redTone, 
            ":hover": {
                "backgroundColor": deleteHoverColor,
              },
            "boxShadow": "0px 8px 15px " + deleteHoverColor,
            "margin-right": "30px",
          }}
            onClick={() => setOpenDeleteDialog(true)}
            >
            Delete
          </Button>}

          <Button variant="contained" sx={{
            "width":"150px",
            "height":"60px", 
            "color":"white", 
            "font-size":"15px",
            "backgroundColor":"#2EE59D", 
            ":hover": {
                "backgroundColor": addHoverColor,
              },
            "box-shadow": "0px 8px 15px " + addHoverColor}}
            onClick={() => setOpenCreateDialog(true)}
            >
            Add
          </Button>
        </div>
      </div>
      
        <Box m="40px 0 0 0" height="75vh">
          <DeviceList
            isLoading={isLoading}
            devicesPage={devices}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowSelection={setDevicesIDSelected}
            onRowUpdate={onDeviceUpdateRequest}
            rowSelectionModel={devicesIDSelected}
          />
        </Box>

      <CreateDeviceDialog
        isOpen={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
        onSubmit={onDeviceCreateSubmit}
        theme={theme}
      />

      <DeleteDeviceDialog
        isOpen={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        onSubmit={() => onDeviceDeleteSubmit({ids: devicesIDSelected})}
        theme={theme}      
      />

      {
        currentDeviceBeingUpdated !== null && <UpdateDeviceDialog
          isOpen={openUpdateDialog}
          handleClose={() => { 
            setOpenUpdateDialog(false)
            setCurrentDeviceBeingUpdated(null) 
          }}
          onSubmit={onDeviceUpdateSubmit}
          theme={theme} 
          currentDevice={currentDeviceBeingUpdated}      
        /> 
      }
    </Box>
    
    )
}

