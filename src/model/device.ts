
export interface Device{
    id: number,
    name: string,
    description: string,
    stream: string,
    status: DeviceProcessingStateKey,
    user: number
}


export enum DeviceProcessingState{
    ONLINE,
    OFFLINE,
    PAUSED
}

export type DeviceProcessingStateKey = keyof typeof DeviceProcessingState