import { Search } from "@mui/icons-material";
import { Device } from "../../model/device";
import { PaginationModel } from "../../model/pagination-model";
import { DeleteDeviceInputDTO, DeviceInputDTO } from "../dto/input/device-input";
import { GroupDevicesInputDTO } from "../dto/input/group-devices";
import { LoginInputDTO } from "../dto/input/login-input";
import { RegisterInputDTO } from "../dto/input/register-input";
import { AuthOutputDTO } from "../dto/output/auth-output";
import { DeviceExpandedOutputDTO, DeviceOutputDTO, DeviceSimpleOutputDTO } from "../dto/output/device-output";
import { DeviceGroupOutputDTO } from "../dto/output/group-output";
import { IdOutputDTO } from "../dto/output/id-output";
import { PageOutputDTO } from "../dto/output/page-output";
import { devices, users, groups } from "./mock-data";
import { GroupInputUpdateDTO } from "../dto/input/group-update-input";


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
export async function getDevices(paginationModel: PaginationModel, expandable: Boolean = false, query: {search: string} = null): Promise<PageOutputDTO<DeviceOutputDTO>> {
    const filteredItems = query?.search ? devices.filter(item => item.name.includes(query.search)) : devices;
    const items = filteredItems.slice(paginationModel.pageSize * paginationModel.page, paginationModel.pageSize * (paginationModel.page + 1));
    const totalPages = paginationModel.pageSize === 0 ? 0 : Math.ceil(filteredItems.length / paginationModel.pageSize) 
    await delay(WORK_DELAY);
    return {
        totalElements: filteredItems.length,
        totalPages: totalPages,
        isLast: totalPages === paginationModel.page + 1,
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

/**
 * Gets all groups of devices.
 * @param {paginationModel} PaginationModel
 * @returns {PageOutputDTO<DeviceGroupOutputDTO>}
 */
export async function getDevicesGroups(paginationModel: PaginationModel): Promise<PageOutputDTO<DeviceGroupOutputDTO>> {
    const items = groups.slice(paginationModel.pageSize * paginationModel.page, paginationModel.pageSize * (paginationModel.page + 1));
    const totalPages = paginationModel.pageSize === 0 ? 0 : Math.ceil(groups.length / paginationModel.pageSize)
    const groupsOutputDTO = items.map(group => {
        return {
            id: group.id,
            name: group.name,
            description: group.description
        }
    }) 
    await delay(250); 
    return {
        totalElements: groups.length,
        totalPages: totalPages,
        isLast: totalPages === paginationModel.page + 1,
        isFirst: paginationModel.page === 0,
        items: groupsOutputDTO
    } 
}

/**
 * Gets a group of devices.
 */
export async function getDevicesGroup(groupID: number): Promise<DeviceGroupOutputDTO> {
    const group = groups.find(group => group.id === groupID);
    if(group === undefined) { throw new Error(`Group with id ${groupID} not found`)}
    await delay(250);
    return {
        id: group.id,
        name: group.name,
        description: group.description
    }
}


/**
 * Gets all devices from a group.
 * @param {paginationModel} PaginationModel
 * @returns {PageOutputDTO<DeviceOutputDTO>}
 */
export async function getDevicesFromGroup(paginationModel: PaginationModel, groupID: number): Promise<PageOutputDTO<DeviceOutputDTO>> {
    const group = groups.find(group => group.id === groupID);
    const itemsIds = group.devices.slice(paginationModel.pageSize * paginationModel.page, paginationModel.pageSize * (paginationModel.page + 1));
    const devicesPromises = itemsIds.map(id => getDevice(id));
    const devices = await Promise.all(devicesPromises);
    const devicesPages = devices.length === 0 ? 1 : Math.ceil(group.devices.length / paginationModel.pageSize);
    const totalPages = paginationModel.pageSize === 0 ? 0 : devicesPages

    await delay(250); 
    return {
        totalElements: group.devices.length,
        totalPages: totalPages,
        isLast: totalPages === paginationModel.page + 1,
        isFirst: paginationModel.page === 0,
        items: devices
    } 
}

/**
 * Adds devices to the list of devices of a group.
 * @param {inputDTO} GroupDevicesInputDTO
 * @param {groupID} number the id of the group
 */
export async function addGroupDevices(inputDTO: GroupDevicesInputDTO, groupID: number){
    const group = groups.find(group => group.id === groupID);
    if(group === undefined) { throw new Error(`Group with id ${groupID} not found`)}
    console.log(inputDTO.devicesIDs);
    group.devices.push(...inputDTO.devicesIDs);
    await delay(WORK_DELAY);
}

/**
 * Removes devices from the list of devices of a group.
 */
export async function removeGroupDevices(inputDTO: GroupDevicesInputDTO, groupID: number){
    const group = groups.find(group => group.id === groupID);
    if(group === undefined) { throw new Error(`Group with id ${groupID} not found`)}
    const newDevices = group.devices.filter(deviceID => !inputDTO.devicesIDs.includes(deviceID));
    group.devices.splice(0, group.devices.length);
    group.devices.push(...newDevices);
    await delay(WORK_DELAY);
}

/**
 * Deletes a group.
 * @param {groupID} number the id of the group
 */
export async function deleteGroup(groupID: number): Promise<void> {
    const group = groups.find(group => group.id === groupID);
    if(group === undefined) { throw new Error(`Group with id ${groupID} not found`)}
    const newGroups = groups.filter(group => group.id !== groupID);
    await delay(WORK_DELAY);
    groups.splice(0, groups.length);
    groups.push(...newGroups);
}

/**
 * Updates a group.
 */
export async function updateGroup(inputDTO: GroupInputUpdateDTO, groupID: number): Promise<void> {
    const group = groups.find(group => group.id === groupID);
    if(group === undefined) { throw new Error(`Group with id ${groupID} not found`)}
    const updatedGroup = {
        id: groupID,
        name: inputDTO.name,
        description: inputDTO.description,
        devices: group.devices
    }
    await delay(WORK_DELAY);
    groups.splice(groups.indexOf(group), 1, updatedGroup);
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
