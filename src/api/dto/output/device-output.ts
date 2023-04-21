import { UserOutputDTO } from "./user-output"

export interface DeviceOutputDTO{
    id: number,
    name: string,
    description: string,
    streamUrl: string,
    status: string,
}

export interface DeviceSimpleOutputDTO extends DeviceOutputDTO{
    user: number
    //TODO device group id
}

export interface DeviceExpandedOutputDTO extends DeviceOutputDTO{
    user: UserOutputDTO
}