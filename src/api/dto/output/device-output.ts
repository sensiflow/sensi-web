import { Device, DeviceProcessingState, DeviceProcessingStateKey } from "../../../model/device"
import { UserOutputDTO } from "./user-output"

export interface DeviceOutputDTO{
    id: number,
    name: string,
    description: string,
    streamUrl: string,
    status: DeviceProcessingStateKey,
}

export interface DeviceSimpleOutputDTO extends DeviceOutputDTO{
    user: number
    //TODO device group id
}

export interface DeviceExpandedOutputDTO extends DeviceOutputDTO{
    user: UserOutputDTO
}

export function dtoToDevice(dto: DeviceOutputDTO): Device {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        streamUrl: dto.streamUrl,
        status: DeviceProcessingState[dto.status]
    }
}