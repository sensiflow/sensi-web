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


const WORK_DELAY = 250;

/**
 * Checks if the user matches one and logs him in
 * 
 * @param {inputDTO} LoginInputDTO
 * @returns {AuthOutputDTO} 
 */
export async function login(inputDTO: LoginInputDTO): Promise<AuthOutputDTO> {
    const user = users.find(
        user => user.email === inputDTO.email && user.password === inputDTO.password
    );

    await delay(WORK_DELAY);
    
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
export async function register(inputDTO: RegisterInputDTO): Promise<AuthOutputDTO> {
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

    await delay(WORK_DELAY);

    return {id: id}
}

/**
 * Creates a new device
 * @param {inputDTO} DeviceInputDTO
 * @returns {IdOutputDTO}
 */
export async function createDevice(inputDTO: DeviceInputDTO): Promise<IdOutputDTO> {
    const currentIds: number[] = devices.map((device) => {return device.id})
    const device: DeviceSimpleOutputDTO = {
      id: Math.max(...currentIds) + 1, 
      name: inputDTO.name,
      description: inputDTO.description,
      status: "INACTIVE",
      streamUrl: inputDTO.streamUrl,
      user: 1
    }
    await delay(WORK_DELAY);
    devices.push(device)
    
    return {id: device.id}
}

/**
 *  Gets a device by id
 *  @param {deviceID} number
 *  @param {expandable} Boolean
 *  @returns {DeviceOutputDTO}
 */
export async function getDevice(deviceID: number, expandable: Boolean = false): Promise<DeviceOutputDTO> {
    const device = devices.find(device => device.id === deviceID);
    if(device === undefined) { throw new Error(`Device with id ${deviceID} not found`)}

    if(expandable) {
        const expandedDevice: DeviceExpandedOutputDTO = {
            ...device,
            user: users.find(user => user.id === device.user)
        }
        return expandedDevice;
    }

    await delay(WORK_DELAY);

    return device;
}

/**
 * Gets all devices
 */
export async function getDevices(paginationModel: PaginationModel, expandable: Boolean = false): Promise<PageOutputDTO<DeviceOutputDTO>> {
    const items = devices.slice(paginationModel.pageSize * paginationModel.page, paginationModel.pageSize * (paginationModel.page + 1));
    const totalPages = paginationModel.pageSize === 0 ? 0 : Math.ceil(items.length / paginationModel.pageSize)
    await delay(WORK_DELAY);
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
export async function deleteDevices(inputDTO: DeleteDeviceInputDTO): Promise<void> {
    const ids = inputDTO.ids.map(id => devices.find(device => device.id === id));
    if(ids.some(id => id === undefined)){ throw new Error(`Device with id ${inputDTO.ids} not found`)}
    const newDevices = devices.filter(device => !ids.includes(device));
    await delay(WORK_DELAY);
    devices.splice(0, devices.length);
    devices.push(...newDevices);
}

/**
 * Updates a device
 * @param {inputDTO} DeviceInputDTO
 * @param {deviceID} number
 * @returns {void}
 */
export async function updateDevice(inputDTO: DeviceInputDTO, deviceID: number): Promise<void> {
    const updatedDevice: DeviceSimpleOutputDTO = {
      id: deviceID,  
      name: inputDTO.name,
      description: inputDTO.description,
      status: "INACTIVE",
      streamUrl: inputDTO.streamUrl,
      user: 1
    }
    await delay(WORK_DELAY);
    const device = devices.find(device => device.id === deviceID);
    devices.splice(devices.indexOf(device), 1, updatedDevice as DeviceSimpleOutputDTO);
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));