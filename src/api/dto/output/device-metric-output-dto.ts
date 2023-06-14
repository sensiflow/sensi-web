import { DeviceMetric } from "../../../model/metric"

export interface DeviceMetricOutputDTO{
    deviceID: number
    startTime: number
    endTime: number
    peopleCount: number
}

export function dtoToMetric(dto: DeviceMetricOutputDTO): DeviceMetric {
    return {
        deviceID: dto.deviceID,
        startTime: new Date(dto.startTime),
        endTime: dto.endTime !== null ? new Date(dto.endTime) : null,
        peopleCount: dto.peopleCount
    }
}