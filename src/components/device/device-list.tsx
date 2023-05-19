import { GridPaginationModel, GridColDef, DataGrid } from "@mui/x-data-grid";
import { Device, DeviceProcessingState } from "../../model/device";
import { Page } from "../../model/page";
import * as React from "react";
import GreenOnlineCircle from "./processing-status/green_online_circle";
import RedOfflineSquare from "./processing-status/red_offline_square";
import YellowPausedRectangles from "./processing-status/yellow_paused_state";
import { IconButton, LinearProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { PaginationModel } from "../../model/pagination-model";
import DeviceProcessingStatus from "./processing-status/DeviceProcessingStatus";

interface DeviceListProps {
  isLoading: boolean;
  devicesPage: Page<Device>;
  paginationModel: PaginationModel;
  onPaginationModelChange: (GridPaginationModel) => void;
  onRowSelection: (newSelection) => void;
  onRowUpdate: (deviceToUpdate: Device) => void;
  onRowInfoRequest: (deviceID: number) => void;
  rowSelectionModel: Array<number>;
}

interface OptionsColumnHandlers {
  onRowUpdate: (deviceToUpdate: Device) => void;
  onRowInfoRequest: (deviceID: number) => void;
}

const deviceColumnDefinition: (
  handlers: OptionsColumnHandlers
) => GridColDef<Device>[] = (handlers) => {
  return [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "streamUrl", headerName: "Stream", flex: 1 },
    {
      field: "status",
      headerName: "Processing Status",
      flex: 2,
      renderCell: ({ row: { status } }) => (
        <DeviceProcessingStatus state={status} />
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: " ",
      headerName: " ",
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      renderCell: (grid) => gridRowOptions(handlers, grid.row),
      flex: 0.7,
      align: "center",
    },
  ];
};

const gridRowOptions = (handlers: OptionsColumnHandlers, row: Device) => {
  return (
    <div>
      <IconButton
        children={<EditIcon />}
        onClick={() => {
          handlers.onRowUpdate(row);
        }}
      />
      <IconButton
        children={<InfoIcon />}
        onClick={() => {
          handlers.onRowInfoRequest(row.id);
        }}
      />
    </div>
  );
};

export default function DeviceList({
  isLoading,
  devicesPage,
  paginationModel,
  onPaginationModelChange,
  onRowSelection,
  onRowUpdate,
  onRowInfoRequest,
  rowSelectionModel,
}: DeviceListProps) {
  const theme = useTheme();
  const devices: Array<Device> = devicesPage?.items;
  const columnNames: GridColDef<Device>[] = deviceColumnDefinition({
    onRowUpdate,
    onRowInfoRequest,
  });

  return (
    <DataGrid
      paginationMode="server"
      keepNonExistentRowsSelected
      autoHeight
      density="comfortable"
      checkboxSelection
      disableRowSelectionOnClick
      loading={isLoading}
      slots={{
        loadingOverlay: LinearProgress,
      }}
      editMode="cell"
      pageSizeOptions={[5, 10, 20]}
      paginationModel={paginationModel as GridPaginationModel}
      onPaginationModelChange={onPaginationModelChange}
      rowCount={devicesPage?.totalElements ?? 0}
      columns={columnNames}
      rows={devices ?? []}
      onRowSelectionModelChange={(newSelection) => {
        onRowSelection(newSelection);
      }}
      rowSelectionModel={rowSelectionModel}
      sx={{
        "& .MuiCheckbox-root.Mui-checked": {
          color: tokens(theme.palette.mode).greenAccent[500],
        },
      }}
    />
  );
}
