import { DeleteDeviceInputDTO } from "../dto/input/device-input";
import { DeviceOutputDTO } from "../dto/output/device-output";
import { devices, users, groups } from "./mock-data";

const WORK_DELAY = 250;


/**
 *  Gets a device by id
 *  @param {deviceID} number
 *  @param {expandable} Boolean
 *  @returns {DeviceOutputDTO}
 */

/**
 * Deletes a device
 * @param {inputDTO} DeleteDeviceInputDTO
 * @returns {void}
 */
export async function deleteDevices(inputDTO: DeleteDeviceInputDTO): Promise<void> {
    const ids = inputDTO.ids.map(id => devices.find(device => device.id === id));
    if(ids.some(id => id === undefined)){ throw new Error(`Device with id ${inputDTO.ids} not found`)}
    const newDevices = devices.filter(device => !ids.includes(device));
    await delay(WORK_DELAY);
    devices.splice(0, devices.length);
    devices.push(...newDevices);
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
