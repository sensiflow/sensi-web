import { GridPaginationModel, GridColDef, DataGrid } from "@mui/x-data-grid";
import { Device } from "../../model/device";
import * as React from "react";
import { IconButton, LinearProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeviceProcessingStatus from "./processing-status/device-processing-status";
import { DataGridListProps } from "../lists/data-grid-list";

interface DeviceListProps extends DataGridListProps<Device> {
  onRowSelection: (newSelection) => void;
  onRowUpdate: (deviceToUpdate: Device) => void;
  onRowInfoRequest: (deviceID: number) => void;
  rowSelectionModel: Array<number>;
  enableEdit: boolean;
}

interface OptionsColumnHandlers {
  onRowUpdate: (deviceToUpdate: Device) => void;
  onRowInfoRequest: (deviceID: number) => void;
}

const deviceColumnDefinition: (
  handlers: OptionsColumnHandlers,
  enableEdit: boolean
) => GridColDef<Device>[] = (handlers, enableEdit) => {
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
      renderCell: (grid) => gridRowOptions(handlers, grid.row, enableEdit),
      flex: 0.7,
      align: "center",
    },
  ];
};

const gridRowOptions = (handlers: OptionsColumnHandlers, row: Device, enableEdit: boolean) => {
  return (
    <div>
      {
        enableEdit && <IconButton
          onClick={() => {
            handlers.onRowUpdate(row);
          }}
        >
          <EditIcon/>
        </IconButton>
      }

      <IconButton
        onClick={() => {
          handlers.onRowInfoRequest(row.id);
        }}
      >
          <InfoIcon/>
      </IconButton>
    </div>
  );
};

export default function DeviceList({
  isLoading,
  currentPage,
  paginationModel,
  onPaginationModelChange,
  onRowSelection,
  onRowUpdate,
  onRowInfoRequest,
  rowSelectionModel,
  enableEdit,
}: DeviceListProps) {
  const theme = useTheme();
  const devices: Array<Device> = currentPage?.items;
  const columnNames: GridColDef<Device>[] = deviceColumnDefinition(
      {
      onRowUpdate,
      onRowInfoRequest,
      },
      enableEdit
  );

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
      pageSizeOptions={[5, 10, 15, 20]}
      paginationModel={paginationModel as GridPaginationModel}
      onPaginationModelChange={onPaginationModelChange}
      rowCount={currentPage?.totalElements ?? 0}
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
