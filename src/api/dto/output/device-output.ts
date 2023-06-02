import { Device, DeviceProcessingState, DeviceProcessingStateKey } from "../../../model/device"
import { UserOutputDTO } from "./user-output"
import {DeviceGroupSimpleOutputDTO} from "./group-output";

export interface DeviceOutputDTO{
    id: number,
    name: string,
    description: string,
    streamURL   : string,
    processingState: DeviceProcessingStateKey,
}

export interface DeviceSimpleOutputDTO extends DeviceOutputDTO{
    user: number
    deviceGroupsID: number[]
}

export interface DeviceExpandedOutputDTO extends DeviceOutputDTO{
    user: UserOutputDTO
    deviceGroups: DeviceGroupSimpleOutputDTO[]
}

export function dtoToDevice(dto: DeviceOutputDTO): Device {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        streamURL: dto.streamURL,
        status: DeviceProcessingState[dto.processingState]
    }
}