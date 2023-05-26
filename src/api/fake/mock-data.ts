import { UserRole } from "../../model/roles"
import {  DeviceSimpleOutputDTO } from "../dto/output/device-output"

export const users  = [
    {   
        'id': 1,
        'firstName': 'Roxi',
        'lastName': 'Hill',
        'email': 'roxihi2441@etondy.com',
        'password': 'KswODO',
        'role': UserRole.ADMIN
    },
    {   
        'id': 2,
        'firstName': 'Kanos',
        'lastName': 'Kent',
        'email': 'kanos98903@necktai.com',
        'password': 'CZwTuo',
        'role': UserRole.USER
    },
    {   
        'id': 3,
        'firstName': 'Nathan',
        'lastName': 'Miller',
        'email': 'nathan5423@devour.com',
        'password': 'tFSDJm',
        'role': UserRole.MODERATOR
    },
    {
        'id': 4,
        'firstName': 'Liam',
        'lastName': 'Smith',
        'email': 'admin@gmail.com',
        'password': 'admin',
        'role': UserRole.MODERATOR
    },
    {
        'id': 5,
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'johndoe@email.com',
        'password': 'johndoe',
        'role': UserRole.ADMIN
    }
]

export const devices: Array<DeviceSimpleOutputDTO> = [
    {
        id: 1,
        name: "Device 1",
        description: "Description 1",
        streamUrl: "Stream 1",
        status: "ACTIVE",
        user: 1
    },
    {
        id: 2,
        name: "Device 2",
        description: "Description 2",
        streamUrl: "Stream 2",
        status: "PENDING",
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
        status: "PENDING",
        user: 1
    },
    {
        id: 10,
        name: "Device 10",
        description: "Description 10",
        streamUrl: "Stream 10",
        status: "INACTIVE",
        user: 1
    },
    {
        id: 20,
        name: "Device 20",
        description: "Description 20",
        streamUrl: "Stream 20",
        status: "ACTIVE",
        user: 1
    },
    {
        id: 21,
        name: "Device 21",
        description: "Description 21",
        streamUrl: "Stream 21",
        status: "ACTIVE",
        user: 1
    },
    {
        id: 22,
        name: "Device 22",
        description: "Description 22",
        streamUrl: "Stream 22",
        status: "ACTIVE",
        user: 1
    },
    {
        id: 23,
        name: "Device 23",
        description: "Description 23",
        streamUrl: "Stream 23",
        status: "PAUSED",
        user: 1
    },
    {
        id: 24,
        name: "Device 24",
        description: "Description 24",
        streamUrl: "Stream 24",
        status: "INACTIVE",
        user: 1
    },
    {
        id: 25,
        name: "Device 25",
        description: "Description 25",
        streamUrl: "Stream 25",
        status: "PENDING",
        user: 1
    },
]
    
