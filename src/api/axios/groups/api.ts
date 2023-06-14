import {PaginationModel} from "../../../model/pagination-model";
import {PageOutputDTO} from "../../dto/output/page-output";
import {DeviceGroupOutputDTO} from "../../dto/output/group-output";
import axios from "axios";
import {DeviceOutputDTO} from "../../dto/output/device-output";
import {GroupDevicesInputDTO} from "../../dto/input/group-devices";
import {GroupInputDTO} from "../../dto/input/group-input";
import "../utils"
import {IdOutputDTO} from "../../dto/output/id-output";

export async function createDevicesGroup(inputDTO: GroupInputDTO) : Promise<IdOutputDTO>{
    const response = await axios({
        url: '/groups',
        method: 'POST',
        data: JSON.stringify(inputDTO)
    }).logErrorAndRethrow()
    return response.data
}

export async function getDevicesGroups(
    paginationModel: PaginationModel,
    expandable: Boolean=false
): Promise<PageOutputDTO<DeviceGroupOutputDTO>> {
    const response = await axios({
        url: `/groups?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}&expanded=${expandable}`,
        method: 'GET',
    }).logErrorAndRethrow()
    return response.data
}

export async function getDevicesGroup(groupID: number, expandable: boolean = false): Promise<DeviceGroupOutputDTO> {
    const response = await axios({
        url: `/groups/${groupID}?&expanded=${expandable}`,
        method: 'GET',
    }).logErrorAndRethrow()
    return response.data
}

export async function getDevicesFromGroup(paginationModel: PaginationModel, groupID: number): Promise<PageOutputDTO<DeviceOutputDTO>> {
    const response = await axios({
        url: `/groups/${groupID}/devices?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}`,
        method: 'GET',
    }).logErrorAndRethrow()
    return response.data
}

export async function addGroupDevices(inputDTO: GroupDevicesInputDTO, groupID: number){
    const response = await axios({
        url: `/groups/${groupID}/devices`,
        method: 'POST',
        data: JSON.stringify(inputDTO)
    }).logErrorAndRethrow()
    return response.data
}

export async function removeGroupDevices(inputDTO: GroupDevicesInputDTO, groupID: number) : Promise<void>{
    const ids = inputDTO.deviceIDs.join(",")
    await axios({
        url: `/groups/${groupID}/devices?deviceIDs=${ids}`,
        method: 'DELETE'
    }).logErrorAndRethrow()
}

export async function deleteGroup(groupID: number): Promise<void> {
    await axios({
        url: `/groups/${groupID}`,
        method: 'DELETE',
    }).logErrorAndRethrow()
}

export async function updateGroup(inputDTO: GroupInputDTO, groupID: number): Promise<void> {
    await axios({
        url: `/groups/${groupID}`,
        method: 'PUT',
        data: JSON.stringify(inputDTO)
    }).logErrorAndRethrow()
}