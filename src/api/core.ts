import {API_URL} from "../constants";


const getDeviceSSEInterface = (deviceID: number, eventName: string) => {
    return new EventSource(`${API_URL}devices/${deviceID}/server-events/${eventName}`,
    {withCredentials: true});
}


export const apiCore = {

    getDeviceStateUpdateSSE:  (deviceID: number) => {
        return getDeviceSSEInterface(deviceID, 'processing-state');
    },
    
    getDevicePeopleCountSSE: (deviceID: number) => {
        return getDeviceSSEInterface(deviceID, 'people-count');
    }

}