import { Device, DeviceProcessingState } from "../../model/device"
import { Page } from "../../model/page"

export const users = [
    {   
        'firstName': 'Roxi',
        'lastName': 'Hill',
        'email': 'roxihi2441@etondy.com',
        'password': 'KswODO' 
    },
    {   
        'firstName': 'Kanos',
        'lastName': 'Kent',
        'email': 'kanos98903@necktai.com',
        'password': 'CZwTuo'
    },
    {   
        'firstName': 'Nathan',
        'lastName': 'Miller',
        'email': 'nathan5423@devour.com',
        'password': 'tFSDJm'
    }
]

export const devices: Page<Device> = {
    totalPages: 1,
    totalElements: 3,
    isLast: true,
    isFirst: true,
    items: [
        {
            id: 1,
            name: "Device 1",
            description: "Description 1",
            stream: "Stream 1",
            status: "ONLINE",
            user: 1
        },
        {
            id: 2,
            name: "Device 1",
            description: "Description 1",
            stream: "Stream 1",
            status: "ONLINE",
            user: 1
        },
        {
            id: 3,
            name: "Device 1",
            description: "Description 1",
            stream: "Stream 1",
            status: "PAUSED",
            user: 1
        },
        {
            id: 4,
            name: "Device 1",
            description: "Description 1",
            stream: "Stream 1",
            status: "OFFLINE",
            user: 1
        },
        {
            id: 5,
            name: "Device 1",
            description: "Description 1",
            stream: "Stream 1",
            status: "PAUSED",
            user: 1
        },
        {
            id: 6,
            name: "Device 1",
            description: "Description 1",
            stream: "Stream 1",
            status: "ONLINE",
            user: 1
        }
    ]
}
        
