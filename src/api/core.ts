
const contextPath = '/api/v1'
const baseUrl = 'http://localhost:8090';


const getDeviceSSEInterface = (deviceID: number, eventName: string) => {
    return new EventSource(`${baseUrl}${contextPath}/devices/${deviceID}/server-events/${eventName}`,
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