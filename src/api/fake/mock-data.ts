import { Device, DeviceProcessingState } from "../../model/device"
import { Page } from "../../model/page"
import { DeviceOutputDTO, DeviceSimpleOutputDTO } from "../dto/output/device-output"

export const users = [
    {   
        'id': 1,
        'firstName': 'Roxi',
        'lastName': 'Hill',
        'email': 'roxihi2441@etondy.com',
        'password': 'KswODO' 
    },
    {   
        'id': 2,
        'firstName': 'Kanos',
        'lastName': 'Kent',
        'email': 'kanos98903@necktai.com',
        'password': 'CZwTuo'
    },
    {   
        'id': 3,
        'firstName': 'Nathan',
        'lastName': 'Miller',
        'email': 'nathan5423@devour.com',
        'password': 'tFSDJm'
    }
]

export const devices: Array<DeviceSimpleOutputDTO> = [
    {
        id: 1,
        name: "Device 1",
        description: "Description 1",
        streamUrl: "Stream 1",
        status: "ONLINE",
        user: 1
    },
    {
        id: 2,
        name: "Device 2",
        description: "Description 2",
        streamUrl: "Stream 2",
        status: "ONLINE",
        user: 1
    },
    {
        id: 5,
        name: "Device 5",
        description: "Description 5",
        streamUrl: "Stream 5",
        status: "PAUSED",
        user: 1
    },
    {
        id: 7,
        name: "Device 7",
        description: "Description 7",
        streamUrl: "Stream 7",
        status: "OFFLINE",
        user: 1
    },
    {
        id: 10,
        name: "Device 10",
        description: "Description 10",
        streamUrl: "Stream 10",
        status: "PAUSED",
        user: 1
    },
    {
        id: 20,
        name: "Device 20",
        description: "Description 20",
        streamUrl: "Stream 20",
        status: "ONLINE",
        user: 1
    }
]
    
