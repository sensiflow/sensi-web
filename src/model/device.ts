export interface Device{
    id: number,
    name: string,
    description: string,
    streamUrl: string,
    status: DeviceProcessingStateKey,
}

export enum DeviceProcessingState{
    ONLINE,
    OFFLINE,
    PAUSED
}

export type DeviceProcessingStateKey = keyof typeof DeviceProcessingState