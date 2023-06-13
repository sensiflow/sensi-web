export interface Device{
    id: number,
    name: string,
    description: string,
    streamURL: string,
    status: DeviceProcessingState,
}

export enum DeviceProcessingState{
    ACTIVE,
    INACTIVE,
    PAUSED,
    PENDING
}

const RTSPRegex = /(rtsp|rtsps):\/\/(?:([^\s@\/]+?)[@])?([^\s\/:]+)(?:[:]([0-9]+))?(?:(\/[^\s?#]+)?(?<!\/)([?][^\s#]+)?)/
export const NameConstraints =
    {
        required: 'Name is required',
        minLength: {
            value: 3,
            message: 'Name must be at least 3 characters long'
        },
        maxLength: {
            value: 35,
            message: 'Name must be at most 35 characters long'
        }
    }

export const DescriptionConstraints =
    {
        maxLength: {
            value: 100,
            message: 'Description must be at most 100 characters long'
        }
    }

export const StreamURLConstraints = {
    pattern : {
        value: RTSPRegex,
        message: 'URL has the wrong format, it must follow a valid RTSP URL format'
    }
}

export type DeviceProcessingStateKey = keyof typeof DeviceProcessingState

