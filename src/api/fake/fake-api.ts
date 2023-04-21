import { Device } from "../../model/device";
import { PaginationModel } from "../../model/pagination-model";
import { DeleteDeviceInputDTO, DeviceInputDTO } from "../dto/input/device-input";
import { LoginInputDTO } from "../dto/input/login-input";
import { RegisterInputDTO } from "../dto/input/register-input";
import { AuthOutputDTO } from "../dto/output/auth-output";
import { DeviceExpandedOutputDTO, DeviceOutputDTO, DeviceSimpleOutputDTO } from "../dto/output/device-output";
import { IdOutputDTO } from "../dto/output/id-output";
import { PageOutputDTO } from "../dto/output/page-output";
import { devices, users } from "./mock-data";

/**
 * Checks if the user matches one and logs him in
 * 
 * @param {inputDTO} LoginInputDTO
 * @returns {AuthOutputDTO} 
 */
export function login(inputDTO: LoginInputDTO): AuthOutputDTO {
    const user = users.find(
        user => user.email === inputDTO.email && user.password === inputDTO.password
    );
    
    if(user) {
        console.log(`User with email ${inputDTO.email} logged in`);
        return {id: user.id}
    }

    throw new Error(`User with email ${inputDTO.email} not found`);
}

/**
 * Registers a new user if the email is not already in use
 * 
 * @param {inputDTO} RegisterInputDTO 
 * @returns {AuthOutputDTO}
 */
export function register(inputDTO: RegisterInputDTO): AuthOutputDTO {
    const user = users.find(user => user.email === inputDTO.email);
    
    if (user) {
        throw new Error(`User with email ${inputDTO.email} already exists`);
    }

    const ids = users.map(user => user.id);
    const id = Math.max(...ids) + 1;

    users.push({
        id,
        ...inputDTO
    });

    return {id: id}
}

/**
 * Creates a new device
 * @param {inputDTO} DeviceInputDTO
 * @returns {IdOutputDTO}
 */
export function createDevice(inputDTO: DeviceInputDTO): IdOutputDTO {
    const currentIds: number[] = devices.map((device) => {return device.id})
    const device: DeviceSimpleOutputDTO = {
      id: Math.max(...currentIds) + 1, 
      name: inputDTO.name,
      description: inputDTO.description,
      status: "OFFLINE",
      streamUrl: inputDTO.streamUrl,
      user: 1
    }

    devices.push(device);
    return {id: device.id}
}

/**
 * Gets all devices
 */
export function getDevices(paginationModel: PaginationModel, expandable: Boolean = false): PageOutputDTO<DeviceOutputDTO> {
    const items = devices.slice(paginationModel.pageSize * paginationModel.page, paginationModel.pageSize * (paginationModel.page + 1));
    const totalPages = paginationModel.pageSize === 0 ? 0 : Math.ceil(items.length / paginationModel.pageSize)
    return {
        totalElements: devices.length,
        totalPages: totalPages,
        isLast: totalPages === paginationModel.page,
        isFirst: paginationModel.page === 0,
        items: items
    }
}

/**
 * Deletes a device
 * @param {inputDTO} DeleteDeviceInputDTO
 * @returns {void}
 */
export function deleteDevices(inputDTO: DeleteDeviceInputDTO): void {
    const ids = inputDTO.ids.map(id => devices.find(device => device.id === id));
    if(ids.some(id => id === undefined)){ throw new Error(`Device with id ${inputDTO.ids} not found`)}
    const newDevices = devices.filter(device => !ids.includes(device));
    devices.splice(0, devices.length);
    devices.push(...newDevices);
}

/**
 * Updates a device
 * @param {inputDTO} DeviceInputDTO
 * @param {deviceID} number
 * @returns {void}
 */
export function updateDevice(inputDTO: DeviceInputDTO, deviceID: number): void {
    const updatedDevice: Device = {
      id: deviceID,  
      name: inputDTO.name,
      description: inputDTO.description,
      status: "OFFLINE",
      streamUrl: inputDTO.streamUrl
    }

    const device = devices.find(device => device.id === deviceID);
    devices.splice(devices.indexOf(device), 1, updatedDevice as DeviceSimpleOutputDTO);
}