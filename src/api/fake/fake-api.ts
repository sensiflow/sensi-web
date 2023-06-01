import { PaginationModel } from "../../model/pagination-model";
import { User } from "../../model/user";
import { DeleteDeviceInputDTO } from "../dto/input/device-input";
import { DeviceOutputDTO } from "../dto/output/device-output";
import { PageOutputDTO } from "../dto/output/page-output";
import { devices, users, groups } from "./mock-data";

const WORK_DELAY = 250;

/**
 * Gets all users
 * @param {paginationModel} PaginationModel
 */
export async function getUsers(paginationModel: PaginationModel): Promise<PageOutputDTO<User>> {
    const allUsers = users.map(user => { return {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role}});
    const items = allUsers.slice(paginationModel.pageSize * paginationModel.page, paginationModel.pageSize * (paginationModel.page + 1));
    const totalPages = paginationModel.pageSize === 0 ? 0 : Math.ceil(items.length / paginationModel.pageSize)
    await delay(WORK_DELAY);
    return {
        totalElements: allUsers.length,
        totalPages: totalPages,
        isLast: totalPages === paginationModel.page,
        isFirst: paginationModel.page === 0,
        items: items
    }
}

/**
 * Deletes a user given an id
 */
export async function deleteUser(id: number): Promise<void> {
    const ids = users.map(user => user.id);
    const index = ids.indexOf(id);
    if(index === -1) { throw new Error(`User with id ${id} not found`)}
    users.splice(index, 1);

    await delay(WORK_DELAY);
}

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
