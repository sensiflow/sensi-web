export interface Device{
    id: number,
    name: string,
    description: string,
    streamUrl: string,
    status: DeviceProcessingState,
}

export enum DeviceProcessingState{
    ACTIVE,
    INACTIVE,
    PAUSED,
    PENDING
}

export type DeviceProcessingStateKey = keyof typeof DeviceProcessingState