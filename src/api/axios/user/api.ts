import {UserOutputDTO} from "../../dto/output/user-output";
import axios from "axios";
import {UserRoleInput, UserUpdateDTO} from "../../dto/input/user-inputs";
import "../utils"

export async function getUser(id: number): Promise<UserOutputDTO> {
    const response = await axios({
        url: `/users/${id}`,
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
        url: `/users/${id}/`,
        method: 'PUT',
        data: JSON.stringify(newInfo)
    }).catchAndThrowAsProblem()
}