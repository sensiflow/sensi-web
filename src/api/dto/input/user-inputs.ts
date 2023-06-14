
export interface UserUpdateDTO {
    firstName?: string;
    lastName?: string;
    password?: string;
}

export interface PasswordUpdateDTO {
    password: string;
    repeatPassword: string;
}

export interface UserInfoUpdateDTO {
    firstName?: string;
    lastName?: string;
}

export interface UserRoleInput {
    role: string;
}