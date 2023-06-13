import {Box} from "@mui/material";
import {Theme, useTheme} from "@mui/material/styles";
import * as React from "react";
import Header from "../../../components/header/header";
import DeviceList from "../../../components/device/device-list";
import CreateDeviceDialog from "../../../components/device/dialog/create-device-dialog";
import {Device} from "../../../model/device";
import DeleteDeviceDialog from "../../../components/device/dialog/delete-device-dialog";
import UpdateDeviceDialog from "../../../components/device/dialog/update-device-dialog";
import {DeleteDeviceInputDTO, DeviceInputDTO,} from "../../../api/dto/input/device-input";
import {PaginationModel} from "../../../model/pagination-model";
import {Page} from "../../../model/page";
import UpdateDeviceUrlDialog from "../../../components/device/dialog/edit-confirm-dialog";
import {useNavigate} from "react-router-dom";
import {paths} from "../../../app-paths";
import {dtoToDevice} from "../../../api/dto/output/device-output";
import {AppButton} from "../../../components/buttons/app-button";
import {createDevice, deleteDevices, getDevices, updateDevice} from "../../../api/axios/device/api";
import {appToast, ToastType} from "../../../components/toast";
import {APIError, errorFallback} from "../../utils";
import {
  DevicesDialogReducer,
  DevicesDialogReducerAction,
  DevicesDialogReducerState,
  DevicesDialogs
} from "./devices-dialog-reducer";
import {tokens} from "../../../theme";
import {constants} from "../../../constants";
import {useCurrentUser} from "../../../logic/context/user-context";
import {UserRole} from "../../../model/roles";

export default function DevicesPage() {
  const navigate = useNavigate();
  const theme: Theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { currentUser  } = useCurrentUser()
  const userRole = currentUser.role
  const hasCreateAndUpdatePermission = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;
  const hasDeletePermission = userRole === UserRole.ADMIN

  //devices hooks
  const [paginationModel, setPaginationModel] =
      React.useState<PaginationModel>(constants.devicesPage.DEFAULT_DEVICES_PAGINATION);
  const [isLoading, setIsLoading] = React.useState(true);
  const [devices, setDevices] = React.useState<Page<Device>>(null);
  const [devicesIDSelected, setDevicesIDSelected] = React.useState<
      Array<number>
  >([]);
  const [currentDeviceBeingUpdated, setCurrentDeviceBeingUpdated] =
      React.useState<Device>(null);
  const [updatedDeviceInfo, setUpdatedDeviceInfo] =
      React.useState<DeviceInputDTO>(null);

  //Dialog reducer
  const [dialogState, dispatchDialog] : [DevicesDialogReducerState, (action: DevicesDialogReducerAction) => void]
      = React.useReducer(
      DevicesDialogReducer,
      {
        openCreateDialog: false,
        openDeleteDialog: false,
        openUpdateDialog: false,
        openUpdateDeviceUrlDialog: false
      }
  )

  const reloadDevicesPage = async () => {
    try{
      setIsLoading(true);
      const page = await getDevices(paginationModel);
      const deviceItems = page.items.map((deviceDTO) => dtoToDevice(deviceDTO));
      const deviceModelPage: Page<Device> = { ...page, items: deviceItems };
      setDevices(deviceModelPage);
      setIsLoading(false);
    }catch (e) {
      errorFallback(e, navigate)
    }
  };

  React.useEffect(() => {
    reloadDevicesPage();
  }, [paginationModel]);

  const onDeviceCreateSubmit = async (input: DeviceInputDTO) => {
    try{
      const responseOutput = await createDevice(input)
      const deviceID = responseOutput.id;
      await reloadDevicesPage();
      dispatchDialog({type: "close", target: DevicesDialogs.CREATE_DEVICE})
      navigateToDevice(deviceID);
    }catch(e){
      if(e.status === APIError.BAD_REQUEST){ appToast(ToastType.ERROR, "Invalid device input"); return }
      errorFallback(e, navigate)
    }
  }

  const onDeviceDeleteSubmit = async (input: DeleteDeviceInputDTO) => {
    try{
      await deleteDevices(input);
      await reloadDevicesPage();
      setDevicesIDSelected((previous) => {
        return previous.filter((id) => !input.deviceIDs.includes(id));
      });
      dispatchDialog({type: "close", target: DevicesDialogs.DELETE_DEVICE})
    }catch (e){
      if(e.status === APIError.NOT_FOUND) {
        reloadDevicesPage();
        appToast(ToastType.ERROR, "One of the devices was already deleted, try again")
        return
      }
      errorFallback(e, navigate)
    }
  }

  const updateDevices = async (input: DeviceInputDTO) => {
    try{
      await updateDevice(input, currentDeviceBeingUpdated.id);
      await reloadDevicesPage();
      dispatchDialog({type: "close", target: DevicesDialogs.UPDATE})
    }catch (e){
      if(e.status === APIError.NOT_FOUND) {
        reloadDevicesPage();
        appToast(ToastType.ERROR, "The device to update does not exist anymore")
        return
      }
      if(e.status === APIError.BAD_REQUEST) { appToast(ToastType.ERROR, "Invalid update input"); return }
      errorFallback(e, navigate)
    }
  };

  const onDeviceUpdateRequest = (deviceToUpdate: Device) => {
    setCurrentDeviceBeingUpdated(deviceToUpdate);
    dispatchDialog({type: "open", target: DevicesDialogs.UPDATE})
  };

  const onUpdateDialogClose = () => {
    dispatchDialog({type: "close", target: DevicesDialogs.UPDATE})
    setCurrentDeviceBeingUpdated(null);
  };

  const onDeviceUpdateSubmit = async (input: DeviceInputDTO) => {
    const currentStreamUrl = currentDeviceBeingUpdated.streamURL;
    if (currentStreamUrl !== "PAUSED" && input.streamURL !== currentStreamUrl) {
      setUpdatedDeviceInfo(input);
      dispatchDialog({type: "open", target: DevicesDialogs.UPDATE_URL})
      return;
    }
    await updateDevices(input);
    setCurrentDeviceBeingUpdated(null);
  };

  const onUpdateDeviceUrlSubmit = async (input: DeviceInputDTO) => {
    await updateDevices(input);
    setUpdatedDeviceInfo(null);
    dispatchDialog({type: "close", target: DevicesDialogs.UPDATE_URL})
    onUpdateDialogClose();
  };

  const navigateToDevice = (deviceID: number) => {
    navigate(paths.dashboard.devices + "/" + deviceID);
  };

  return (
    <Box m="20px">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header
          title="Devices"
          subTitle="Managing the organization devices"
          isLoading={isLoading}
        />
        <div style={{ display: "flex" }}>
          {devicesIDSelected.length > 0 && (
            <AppButton
              text="Delete"
              backgroundColor={colors.buttonAccent.delete.backgroundColor}
              hoverColor={colors.buttonAccent.delete.hoverColor}
              onClick={() => dispatchDialog({type: "open", target: DevicesDialogs.DELETE_DEVICE})}
            />
          )}

          {hasCreateAndUpdatePermission && <AppButton
            text="Add"
            backgroundColor={colors.buttonAccent.add.backgroundColor}
            hoverColor={colors.buttonAccent.add.hoverColor}
            onClick={() => dispatchDialog({type: "open", target: DevicesDialogs.CREATE_DEVICE})}
          />}
        </div>
      </div>

      <Box m="40px 0 0 0" height="75vh">
        <DeviceList
          isLoading={isLoading}
          currentPage={devices}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onRowSelection={setDevicesIDSelected}
          onRowUpdate={onDeviceUpdateRequest}
          onRowInfoRequest={navigateToDevice}
          rowSelectionModel={devicesIDSelected}
          hasCheckboxSelection={hasDeletePermission}
          enableEdit={hasCreateAndUpdatePermission}
        />
        <Box m="40px 0 0 0" />
      </Box>

      <CreateDeviceDialog
        isOpen={dialogState.openCreateDialog}
        handleClose={() => dispatchDialog({type: "close", target: DevicesDialogs.CREATE_DEVICE})}
        onSubmit={onDeviceCreateSubmit}
        theme={theme}
      />

      <DeleteDeviceDialog
        isOpen={dialogState.openDeleteDialog}
        handleClose={() => dispatchDialog({type: "close", target: DevicesDialogs.DELETE_DEVICE})}
        onSubmit={() => onDeviceDeleteSubmit({ deviceIDs: devicesIDSelected })}
        theme={theme}
      />

      {currentDeviceBeingUpdated !== null && (
        <UpdateDeviceDialog
          isOpen={dialogState.openUpdateDialog}
          handleClose={onUpdateDialogClose}
          onSubmit={onDeviceUpdateSubmit}
          theme={theme}
          currentDevice={currentDeviceBeingUpdated}
        />
      )}

      {currentDeviceBeingUpdated !== null && (
        <UpdateDeviceUrlDialog
          isOpen={dialogState.openUpdateDeviceUrlDialog}
          handleClose={() => {
            dispatchDialog({type: "close", target: DevicesDialogs.UPDATE_URL})
          }}
          onSubmit={() => {onUpdateDeviceUrlSubmit(updatedDeviceInfo)}}
          theme={theme}
        />
      )}
    </Box>
  );
}
