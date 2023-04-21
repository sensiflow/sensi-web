import * as React from "react";
import { useForm } from "react-hook-form";
import { DeviceInputDTO } from '../../../api/dto/input/device-input';
import { UpdateDeviceDialogProps } from "./device-dialog-interface";
import DeviceDialog from "./device-dialog";

const UpdateDeviceDialog = (
      { 
        isOpen, 
        handleClose, 
        currentDevice, 
        onSubmit, 
        theme,
      }: UpdateDeviceDialogProps 
  ) => {

    return (
      <DeviceDialog
        dialogTitle="Update Device"
        isOpen={isOpen}
        handleClose={handleClose}
        onSubmit={onSubmit}
        theme={theme}
        requiredTextFields={["name", "streamUrl"]}
        defaultValues={currentDevice as DeviceInputDTO}
      />
    )
  };
  
  export default UpdateDeviceDialog;