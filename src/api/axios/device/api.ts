import {PaginationModel} from "../../../model/pagination-model";
import {PageOutputDTO} from "../../dto/output/page-output";
import {DeviceOutputDTO} from "../../dto/output/device-output";
import axios from "axios";
import {DeleteDeviceInputDTO, DeviceInputDTO} from "../../dto/input/device-input";
import {IdOutputDTO} from "../../dto/output/id-output";
import "../utils"
import { DeviceProcessingStateKey } from "../../../model/device";

export async function getDevices(
    paginationModel: PaginationModel,
    expandable = false,
    query: {search: string} = null
): Promise<PageOutputDTO<DeviceOutputDTO>> {
    const baseRequestURL =
        `/devices?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}&expanded=${expandable}`
    const requestURL = query !== null ? baseRequestURL + `&search=${query.search}` : baseRequestURL
    const response = await axios({
        url: requestURL,
        method: 'GET'
    }).logErrorAndRethrow()
    return response.data
}

export async function createDevice(inputDTO: DeviceInputDTO): Promise<IdOutputDTO> {
    const response = await axios({
        url: '/devices',
        method: 'POST',
        data: JSON.stringify(inputDTO)
    }).logErrorAndRethrow()
    return response.data
}

export async function getDevice(deviceID: number, expandable = false): Promise<DeviceOutputDTO> {
    const response = await axios({
        url: `/devices/${deviceID}?expanded=${expandable}`,
        method: 'GET',
    }).logErrorAndRethrow()
    return response.data
}

export async function updateDevice(inputDTO: DeviceInputDTO, deviceID: number): Promise<void> {
    await axios({
        url: `/devices/${deviceID}`,
        method: 'PUT',
        data: JSON.stringify(inputDTO)
    }).logErrorAndRethrow()
}

export async function updateProcessingState(newProcessingState: DeviceProcessingStateKey, deviceID: number): Promise<void> {
    await axios({
        url: `/devices/${deviceID}/processing-state`,
        method: 'PUT',
        data: JSON.stringify({state: newProcessingState})
    }).logErrorAndRethrow()
}

export async function deleteDevices(inputDTO: DeleteDeviceInputDTO): Promise<void> {
    const ids = inputDTO.deviceIDs.join(",")
    await axios({
        url: `/devices?deviceIDs=${ids}`,
        method: 'DELETE',
    }).logErrorAndRethrow()
}