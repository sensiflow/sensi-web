import {PageOutputDTO} from "./page-output";
import {DeviceSimpleOutputDTO} from "./device-output";

export interface DeviceGroupOutputDTO {
    id: number,
    name: string,
    description: string
}

export interface DeviceGroupSimpleOutputDTO extends DeviceGroupOutputDTO{}

export interface DeviceGroupExpandedOutputDTO extends DeviceGroupOutputDTO{
    devices: PageOutputDTO<DeviceSimpleOutputDTO>
}