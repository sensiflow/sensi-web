import {LoginInputDTO} from "../../dto/input/login-input";
import {AuthOutputDTO, RegisterOutputDTO} from "../../dto/output/auth-output";
import axios from "axios";
import {RegisterInputDTO} from "../../dto/input/register-input";
import "../utils"

export async function login(inputDTO: LoginInputDTO): Promise<AuthOutputDTO>{
    const response = await axios({
        url: '/users/login',
        method: 'POST',
        data: JSON.stringify(inputDTO)
    }).catchAndThrowAsProblem()

    return response.data
}

export async function logout(): Promise<void>{
    await axios({
        url: '/users/logout',
        method: 'POST'
    }).catchAndThrowAsProblem()
}

export async function register(inputDTO: RegisterInputDTO): Promise<RegisterOutputDTO> {
    const response = await axios({
        url: '/users',
        method: 'POST',
        data: JSON.stringify(inputDTO)
    }).catchAndThrowAsProblem()

    return response.data
}