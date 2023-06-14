import { Theme } from "@mui/material";
import { DeviceInputDTO } from "../../../api/dto/input/device-input";
import { Device } from "../../../model/device";
import { DialogProps } from "../../dialog/dialog-interface";

export interface DeviceDialogProps extends DialogProps<DeviceInputDTO> {}

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
    onSubmit: (mouseEvent) => void;
}

export interface UpdateDeviceUrlDialogProps extends Omit<DeviceDialogProps,DialogPropsOmitted> {
    onSubmit: (mouseEvent) => void;
}

