import { Theme } from "@mui/material";
import { DeviceInputDTO } from "../../../api/dto/input/device-input";
import { Device } from "../../../model/device";
import { UseFormReturn } from "react-hook-form";

export interface DeviceDialogProps {
    isOpen: boolean
    handleClose: () => void
    onSubmit: (deviceInput: DeviceInputDTO) => void
    theme: Theme
}

export interface UpdateDeviceDialogProps extends DeviceDialogProps {
    currentDevice: Device;
}

export interface DeviceFormDialogProps extends DeviceDialogProps {
    dialogTitle: string
    requiredTextFields: string[]
    defaultValues: DeviceInputDTO
}

type DialogPropsOmitted = 'onSubmit';
export interface DeleteDeviceDialogProps extends Omit<DeviceDialogProps,DialogPropsOmitted>{
    onSubmit: (devicesID) => void;
}

