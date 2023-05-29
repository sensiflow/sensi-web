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
        "id": 1,
        "name": "Security Camera 1",
        "description": "Main entrance",
        "streamUrl": "rtsp://stream1:5412/1",
        "status": "ACTIVE",
        "user": 1
      },
      {
        "id": 2,
        "name": "Outdoor Camera 1",
        "description": "Backyard",
        "streamUrl": "rtsp://stream2:5412/2",
        "status": "INACTIVE",
        "user": 1
      },
      {
        "id": 3,
        "name": "Indoor Camera 1",
        "description": "Living room",
        "streamUrl": "rtsp://stream3:5412/3",
        "status": "PAUSED",
        "user": 2
      },
      {
        "id": 4,
        "name": "Security Camera 2",
        "description": "Parking lot",
        "streamUrl": "rtsp://stream4:5412/4",
        "status": "ACTIVE",
        "user": 2
      },
      {
        "id": 5,
        "name": "Outdoor Camera 2",
        "description": "Front yard",
        "streamUrl": "rtsp://stream5:5412/5",
        "status": "INACTIVE",
        "user": 3
      },
      {
        "id": 6,
        "name": "Indoor Camera 2",
        "description": "Kitchen",
        "streamUrl": "rtsp://stream6:5412/6",
        "status": "PAUSED",
        "user": 3
      },
      {
        "id": 7,
        "name": "Security Camera 3",
        "description": "Office entrance",
        "streamUrl": "rtsp://stream7:5412/7",
        "status": "ACTIVE",
        "user": 1
      },
      {
        "id": 8,
        "name": "Outdoor Camera 3",
        "description": "Patio",
        "streamUrl": "rtsp://stream8:5412/8",
        "status": "INACTIVE",
        "user": 1
      },
      {
        "id": 9,
        "name": "Indoor Camera 3",
        "description": "Bedroom",
        "streamUrl": "rtsp://stream9:5412/9",
        "status": "PAUSED",
        "user": 2
      },
      {
        "id": 10,
        "name": "Security Camera 4",
        "description": "Back entrance",
        "streamUrl": "rtsp://stream10:5412/10",
        "status": "ACTIVE",
        "user": 2
      },
      {
        "id": 11,
        "name": "Outdoor Camera 4",
        "description": "Garden",
        "streamUrl": "rtsp://stream11:5412/11",
        "status": "INACTIVE",
        "user": 3
      },
      {
        "id": 12,
        "name": "Indoor Camera 4",
        "description": "Study room",
        "streamUrl": "rtsp://stream12:5412/12",
        "status": "PAUSED",
        "user": 3
      },
      {
        "id": 13,
        "name": "Outdoor Camera 5",
        "description": "Driveway",
        "streamUrl": "rtsp://stream14:5412/14",
        "status": "INACTIVE",
        "user": 1
      },
      {
        "id": 14,
        "name": "Indoor Camera 5",
        "description": "Conference room",
        "streamUrl": "rtsp://stream15:5412/15",
        "status": "PAUSED",
        "user": 2
      },
      {
        "id": 15,
        "name": "Security Camera 6",
        "description": "Loading dock",
        "streamUrl": "rtsp://stream16:5412/16",
        "status": "ACTIVE",
        "user": 2
      },
      {
        "id": 16,
        "name": "Outdoor Camera 6",
        "description": "Pool area",
        "streamUrl": "rtsp://stream17:5412/17",
        "status": "INACTIVE",
        "user": 3
      },
      {
        "id": 17,
        "name": "Indoor Camera 6",
        "description": "Bathroom",
        "streamUrl": "rtsp://stream18:5412/18",
        "status": "PAUSED",
        "user": 3
      },
      {
        "id": 18,
        "name": "Security Camera 7",
        "description": "Server room",
        "streamUrl": "rtsp://stream19:5412/19",
        "status": "ACTIVE",
        "user": 1
      },
      {
        "id": 19,
        "name": "Outdoor Camera 7",
        "description": "Sidewalk",
        "streamUrl": "rtsp://stream20:5412/20",
        "status": "INACTIVE",
        "user": 1
      },
      {
        "id": 20,
        "name": "Indoor Camera 7",
        "description": "Dining area",
        "streamUrl": "rtsp://stream21:5412/21",
        "status": "PAUSED",
        "user": 2
      },
      {
        "id": 21,
        "name": "Security Camera 8",
        "description": "Staircase",
        "streamUrl": "rtsp://stream22:5412/22",
        "status": "ACTIVE",
        "user": 2
      },
      {
        "id": 22,
        "name": "Outdoor Camera 8",
        "description": "Rooftop",
        "streamUrl": "rtsp://stream23:5412/23",
        "status": "INACTIVE",
        "user": 3
      },
      {
        "id": 23,
        "name": "Indoor Camera 8",
        "description": "Lobby",
        "streamUrl": "rtsp://stream24:5412/24",
        "status": "PAUSED",
        "user": 3
      },
      {
        "id": 24,
        "name": "Security Camera 9",
        "description": "Control room",
        "streamUrl": "rtsp://stream25:5412/25",
        "status": "ACTIVE",
        "user": 1
      },
      {
        "id": 25,
        "name": "Outdoor Camera 9",
        "description": "Gated entrance",
        "streamUrl": "rtsp://stream26:5412/26",
        "status": "INACTIVE",
        "user": 1
      },
      {
        "id": 26,
        "name": "Indoor Camera 9",
        "description": "Break room",
        "streamUrl": "rtsp://stream27:5412/27",
        "status": "PAUSED",
        "user": 2
      },
      {
        "id": 27,
        "name": "Security Camera 10",
        "description": "Elevator",
        "streamUrl": "rtsp://stream28:5412/28",
        "status": "ACTIVE",
        "user": 2
      },
      {
        "id": 28,
        "name": "Outdoor Camera 10",
        "description": "Playground",
        "streamUrl": "rtsp://stream29:5412/29",
        "status": "INACTIVE",
        "user": 3
      },
      {
        "id": 29,
        "name": "Indoor Camera 10",
        "description": "Reception area",
        "streamUrl": "rtsp://stream30:5412/30",
        "status": "PAUSED",
        "user": 3
      }
]

export const groups = [
    {
      id: 1,
      name: "Indoor",
      description: "Indoor cameras",
      devices: [3, 6, 9, 12, 14, 17, 26, 29]
    },
    {
      id: 2,
      name: "Outdoor",
      description: "Outdoor cameras",
      devices: [2, 5, 8, 11, 13, 16, 25, 28]
    },
    {
      id: 3,
      name: "Security",
      description: "Security Cameras",
      devices: [1, 4, 7, 10, 15, 18, 24]
    },
    {
      id: 4,
      name: "Sidewalk",
      description: "Sidewalk Cameras",
      devices: []
    },
    {
      id: 5,
      name: "Hotel Areas",
      description: "Main areas of the hotel cameras",
      devices: [20, 21, 22, 23, 27]
    },
    {
      id: 6,
      name: "Gym",
      description: "Main areas of the hotel cameras",
      devices: [3, 6, 14]
    },
    {
      id: 7,
      name: "Restaurant",
      description: "Main areas of the hotel cameras",
      devices: [9, 12, 14]
    },
    {
      id: 8,
      name: "Cafeteria",
      description: "Main areas of the hotel cameras",
      devices: [6]
    },
    {
      id: 9,
      name: "Hall",
      description: "Main areas of the hotel cameras",
      devices: [6, 9]
    },
    {
      id: 10,
      name: "Bar",
      description: "Main areas of the hotel cameras",
      devices: [14, 17, 26, 29]
    },
    {
      id: 11,
      name: "Garage",
      description: "Main areas of the hotel cameras",
      devices: [14, 17]
    },
    {
      id: 12,
      name: "Parking Lot",
      description: "Main areas of the hotel cameras",
      devices: [11, 13, 16]
    },
    {
      id: 13,
      name: "Terrace",
      description: "Main areas of the hotel cameras",
      devices: [11]
    },
    {
      id: 14,
      name: "Pool",
      description: "Main areas of the hotel cameras",
      devices: [16]
    },
    {
      id: 15,
      name: "Bar 2",
      description: "Main areas of the hotel cameras",
      devices: [9, 12, 14, 17, 26, 29]
    },
    {
      id: 16,
      name: "Club House",
      description: "Main areas of the hotel cameras",
      devices: [9, 12, 17, 26, 29]
    },
    {
      id: 17,
      name: "Game Room",
      description: "Main areas of the hotel cameras",
      devices: [26, 29]
    },
    {
      id: 18,
      name: "Reception",
      description: "Main areas of the hotel cameras",
      devices: [29]
    },
    {
      id: 19,
      name: "Storage Room",
      description: "Main areas of the hotel cameras",
      devices: [9, 12]
    },
    {
      id: 20,
      name: "Spa",
      description: "Main areas of the hotel cameras",
      devices: [3, 6, 9, 12, 14, 17, 26, 29]
    }
]

