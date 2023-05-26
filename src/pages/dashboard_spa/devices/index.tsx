import { Box, Button } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import * as React from "react";
import Header from "../../../components/header/Header";
import DeviceList from "../../../components/device/device-list";
import CreateDeviceDialog from "../../../components/device/dialog/create-device-dialog";
import { Device } from "../../../model/device";
import DeleteDeviceDialog from "../../../components/device/dialog/delete-device-dialog";
import UpdateDeviceDialog from "../../../components/device/dialog/update-device-dialog";
import {
  DeleteDeviceInputDTO,
  DeviceInputDTO,
} from "../../../api/dto/input/device-input";
import {
  createDevice,
  deleteDevices,
  getDevices,
  updateDevice,
} from "../../../api/fake/fake-api";
import { PaginationModel } from "../../../model/pagination-model";
import { Page } from "../../../model/page";
import UpdateDeviceUrlDialog from "../../../components/device/dialog/edit-confirm-dialog";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../app-paths";
import { dtoToDevice } from "../../../api/dto/output/device-output";
import { AppButton } from "../../../components/buttons/app-button";
import { tokens } from "../../../theme";


export default function DevicesPage() {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = React.useState<PaginationModel>(
    { pageSize: 5, page: 0 }
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openUpdateDeviceUrlDialog, setOpenUpdateDeviceUrlDialog] =
    React.useState(false);

  const [devices, setDevices] = React.useState<Page<Device>>(null);
  const [devicesIDSelected, setDevicesIDSelected] = React.useState<
    Array<number>
  >([]);
  const [currentDeviceBeingUpdated, setCurrentDeviceBeingUpdated] =
    React.useState<Device>(null);
  const [updatedDeviceInfo, setUpdatedDeviceInfo] =
    React.useState<DeviceInputDTO>(null);

  const theme: Theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const reloadDevicesPage = async () => {
    setIsLoading(true);
    const page = await getDevices(paginationModel);
    const deviceItems = page.items.map((deviceDTO) => dtoToDevice(deviceDTO));
    const deviceModelPage: Page<Device> = { ...page, items: deviceItems };
    setDevices(deviceModelPage);
    setIsLoading(false);
  };

  React.useEffect(() => {
    reloadDevicesPage();
  }, [paginationModel]);

  const onDeviceCreateSubmit = async (input: DeviceInputDTO) => {
    const responseOutput = await createDevice(input);
    const deviceID = responseOutput.id;
    reloadDevicesPage();
    setOpenCreateDialog(false);
    navigateToDevice(deviceID);
  };

  const onDeviceDeleteSubmit = async (input: DeleteDeviceInputDTO) => {
    await deleteDevices(input);
    reloadDevicesPage();
    setDevicesIDSelected((previous) => {
      return previous.filter((id) => !input.ids.includes(id));
    });
    setOpenDeleteDialog(false);
  };

  const onDeviceUpdateRequest = (deviceToUpdate: Device) => {
    setCurrentDeviceBeingUpdated(deviceToUpdate);
    setOpenUpdateDialog(true);
  };

  const navigateToDevice = (deviceID: number) => {
    navigate(paths.dashboard.devices + "/" + deviceID);
  };

  const updateDevices = async (input: DeviceInputDTO) => {
    await updateDevice(input, currentDeviceBeingUpdated.id);
    reloadDevicesPage();
    setOpenUpdateDialog(false);
  };

  const onUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setCurrentDeviceBeingUpdated(null);
  };

  const onDeviceUpdateSubmit = async (input: DeviceInputDTO) => {
    const currentStreamUrl = currentDeviceBeingUpdated.streamUrl;
    if (currentStreamUrl !== "PAUSED" && input.streamUrl !== currentStreamUrl) {
      setUpdatedDeviceInfo(input);
      setOpenUpdateDeviceUrlDialog(true);
      return;
    }
    await updateDevices(input);
    setCurrentDeviceBeingUpdated(null);
  };

  const onUpdateDeviceUrlSubmit = async (input: DeviceInputDTO) => {
    await updateDevices(input);
    setUpdatedDeviceInfo(null);
    setOpenUpdateDeviceUrlDialog(false);
    onUpdateDialogClose();
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
              onClick={() => setOpenDeleteDialog(true)}
            />
          )}

          <AppButton
            text="Add"
            backgroundColor={colors.buttonAccent.add.backgroundColor}
            hoverColor={colors.buttonAccent.add.hoverColor}
            onClick={() => setOpenCreateDialog(true)}
          />
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
          enableEdit={true}
        />
        <Box m="40px 0 0 0" />
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
        onSubmit={() => onDeviceDeleteSubmit({ ids: devicesIDSelected })}
        theme={theme}
      />

      {currentDeviceBeingUpdated !== null && (
        <UpdateDeviceDialog
          isOpen={openUpdateDialog}
          handleClose={onUpdateDialogClose}
          onSubmit={onDeviceUpdateSubmit}
          theme={theme}
          currentDevice={currentDeviceBeingUpdated}
        />
      )}

      {currentDeviceBeingUpdated !== null && (
        <UpdateDeviceUrlDialog
          isOpen={openUpdateDeviceUrlDialog}
          handleClose={() => {
            setOpenUpdateDeviceUrlDialog(false);
          }}
          onSubmit={() => {
            onUpdateDeviceUrlSubmit(updatedDeviceInfo);
          }}
          theme={theme}
        />
      )}
    </Box>
  );
}
