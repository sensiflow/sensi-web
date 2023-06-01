import {Device, DeviceProcessingState} from "../../../model/device";
import {DeviceOutputDTO} from "./device-output";
import {User} from "../../../model/user";
import {UserRole} from "../../../model/roles";

export interface UserOutputDTO {
    id: number,
    email: string,
    firstName: string,
    lastName: string
    role: string
}

export function dtoToUser(dto: UserOutputDTO): User {
    return {
        id: dto.id,
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: UserRole[dto.role]
    }
}