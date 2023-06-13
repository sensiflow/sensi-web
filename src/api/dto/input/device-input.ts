export interface DeviceInputDTO {
    name: string;
    description: string;
    streamURL: string;
}

export interface DeleteDeviceInputDTO {
    deviceIDs: Array<number>
}
  