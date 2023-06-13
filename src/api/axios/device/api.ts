import {PaginationModel} from "../../../model/pagination-model";
import {PageOutputDTO} from "../../dto/output/page-output";
import {DeviceOutputDTO} from "../../dto/output/device-output";
import axios from "axios";
import {DeviceInputDTO} from "../../dto/input/device-input";
import {IdOutputDTO} from "../../dto/output/id-output";
import "../utils"
import { DeviceProcessingStateKey } from "../../../model/device";

export async function getDevices(
    paginationModel: PaginationModel,
    expandable = false,
    query: {search: string} = null
): Promise<PageOutputDTO<DeviceOutputDTO>> {
    const response = await axios({
        url: `/devices?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}&expanded=${expandable}`,
        method: 'GET'
    }).catchAndThrowAsProblem()
    return response.data
}

export async function createDevice(inputDTO: DeviceInputDTO): Promise<IdOutputDTO> {
    const response = await axios({
        url: '/devices',
        method: 'POST',
        data: JSON.stringify(inputDTO)
    }).catchAndThrowAsProblem()
    return response.data
}

export async function getDevice(deviceID: number, expandable = false): Promise<DeviceOutputDTO> {
    const response = await axios({
        url: `/devices/${deviceID}?expanded=${expandable}`,
        method: 'GET',
    }).catchAndThrowAsProblem()
    return response.data
}

export async function updateDevice(inputDTO: DeviceInputDTO, deviceID: number): Promise<void> {
    await axios({
        url: `/devices/${deviceID}`,
        method: 'PUT',
        data: JSON.stringify(inputDTO)
    }).catchAndThrowAsProblem()
}

export async function updateProcessingState(newProcessingState: DeviceProcessingStateKey, deviceID: number): Promise<void> {
    await axios({
        url: `/devices/${deviceID}/processing-state`,
        method: 'PUT',
        data: JSON.stringify({state: newProcessingState})
    }).catchAndThrowAsProblem()
}