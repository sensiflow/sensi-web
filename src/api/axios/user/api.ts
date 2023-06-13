import {UserOutputDTO} from "../../dto/output/user-output";
import axios from "axios";
import {UserRoleInput, UserUpdateDTO} from "../../dto/input/user-inputs";
import "../utils"
import {PaginationModel} from "../../../model/pagination-model";
import {PageOutputDTO} from "../../dto/output/page-output";
import {User} from "../../../model/user";

export async function getUser(id: number): Promise<UserOutputDTO> {
    const response = await axios({
        url: `/users/${id}`,
        method: 'GET',
    }).catchAndThrowAsProblem()

    return response.data
}

export async function getMyUser(): Promise<UserOutputDTO> {
    const response = await axios({
        url: `/users/myinfo`,
        method: 'GET',
    }).catchAndThrowAsProblem()

    return response.data
}

export async function updateUserRole(id: number, role: UserRoleInput): Promise<void> {
    await axios({
        url: `/users/${id}/role`,
        method: 'PUT',
        data: JSON.stringify(role)
    }).catchAndThrowAsProblem()
}

export async function updateUser(id: number, newInfo: UserUpdateDTO): Promise<void> {
    await axios({
        url: `/users/${id}`,
        method: 'PUT',
        data: JSON.stringify(newInfo)
    }).catchAndThrowAsProblem()
}


/**
 * Gets all users
 * @param {paginationModel} PaginationModel
 */
export async function getUsers(paginationModel: PaginationModel): Promise<PageOutputDTO<User>> {
    const response = await axios({
        url: `/users?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}`,
        method: 'GET',
    }).catchAndThrowAsProblem()
    return response.data
}

/**
 * Deletes a user given an id
 */
export async function deleteUser(id: number): Promise<void> {
    await axios({
        url: `/users/${id}`,
        method: 'DELETE',
    }).catchAndThrowAsProblem()
}