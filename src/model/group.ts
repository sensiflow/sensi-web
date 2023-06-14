import { Device } from "./device";

export interface DevicesGroup {
    id: number,
    name: string,
    description: string
}

export const NameConstraints =
    {
        required: 'Name is required',
        minLength: {
            value: 3,
            message: 'Name must be at least 3 characters long'
        },
        maxLength: {
            value: 35,
            message: 'Name must be at most 35 characters long'
        }
    }

export const DescriptionConstraints =
    {
        maxLength: {
            value: 100,
            message: 'Description must be at most 100 characters long'
        }
    }