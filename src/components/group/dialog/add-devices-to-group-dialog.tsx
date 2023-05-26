import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Theme, Box } from "@mui/material";
import * as React from "react";
import { dialogSx } from "./styles";
import DevicesCheckboxList from "../devices-checkbox-list";
import { Device } from "../../../model/device";
import { SearchBar } from "../../search-bar";

interface AddDeviceToGroupDialogProps {
    theme: Theme;
    isOpen: boolean;
    dialogTitle: string;
    devices: Array<Device>;
    isLoadingDevices: boolean;
    resetScrollToTop: boolean;
    onScrollReset: () => void;
    onSearchInputChange: (input: string) => void;
    loadMoreDevices: () => void;
    handleClose: () => void;
    onSubmit: (selectedDevices: Array<Device>) => void;
}

const AddDevicesToGroupDialog = (
    { 
        theme,
        isOpen,
        dialogTitle,
        devices,
        isLoadingDevices,
        resetScrollToTop,
        onScrollReset,
        onSearchInputChange,
        loadMoreDevices,
        handleClose,
        onSubmit,
    }: AddDeviceToGroupDialogProps
) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSumit = (devices: Array<Device>) => {
    onSubmit(devices);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}
        sx={dialogSx(theme)}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <SearchBar 
              onInputChange={onSearchInputChange}
            />
            <DevicesCheckboxList 
              devices={devices}
              isLoadingDevices={isLoadingDevices}
              resetScrollToTop={resetScrollToTop}
              onScrollReset={onScrollReset}
              loadMoreDevices={loadMoreDevices}
              handleSelectedDevices={isSubmitting}
              selectedDevicesHandler={handleSumit}
            />
          </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => setIsSubmitting(true)} variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDevicesToGroupDialog;