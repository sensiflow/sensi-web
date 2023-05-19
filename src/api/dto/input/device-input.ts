export interface DeviceInputDTO {
    name: string;
    description: string;
    streamUrl: string;
}

export interface DeleteDeviceInputDTO {
    ids: number[]
}
  