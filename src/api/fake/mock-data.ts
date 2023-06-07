import { UserRole } from "../../model/roles"
import {  DeviceSimpleOutputDTO } from "../dto/output/device-output"
import {DeviceGroupExpandedOutputDTO, DeviceGroupSimpleOutputDTO} from "../dto/output/group-output";

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
        "streamURL": "rtsp://stream1:5412/1",
        "processingState": "ACTIVE",
        "user": 1,
        "deviceGroupsID": [3]
      },
      {
        "id": 2,
        "name": "Outdoor Camera 1",
        "description": "Backyard",
        "streamURL": "rtsp://stream2:5412/2",
        "processingState": "INACTIVE",
        "user": 1,
        "deviceGroupsID": [2]
      },
      {
        "id": 3,
        "name": "Indoor Camera 1",
        "description": "Living room",
        "streamURL": "rtsp://stream3:5412/3",
        "processingState": "PAUSED",
        "user": 2,
        "deviceGroupsID": [1,6,8,9,20]
      },
      {
        "id": 4,
        "name": "Security Camera 2",
        "description": "Parking lot",
        "streamURL": "rtsp://stream4:5412/4",
        "processingState": "ACTIVE",
        "user": 2,
        "deviceGroupsID": [3]
      },
      {
        "id": 5,
        "name": "Outdoor Camera 2",
        "description": "Front yard",
        "streamURL": "rtsp://stream5:5412/5",
        "processingState": "INACTIVE",
        "user": 3,
        "deviceGroupsID": [2]
      },
      {
        "id": 6,
        "name": "Indoor Camera 2",
        "description": "Kitchen",
        "streamURL": "rtsp://stream6:5412/6",
        "processingState": "PAUSED",
        "user": 3,
        "deviceGroupsID": [1,6,8,9,20]
      },
      {
        "id": 7,
        "name": "Security Camera 3",
        "description": "Office entrance",
        "streamURL": "rtsp://stream7:5412/7",
        "processingState": "ACTIVE",
        "user": 1,
        "deviceGroupsID": [3]
      },
      {
        "id": 8,
        "name": "Outdoor Camera 3",
        "description": "Patio",
        "streamURL": "rtsp://stream8:5412/8",
        "processingState": "INACTIVE",
        "user": 1,
        "deviceGroupsID": [2]
      },
      {
        "id": 9,
        "name": "Indoor Camera 3",
        "description": "Bedroom",
        "streamURL": "rtsp://stream9:5412/9",
        "processingState": "PAUSED",
        "user": 2,
        "deviceGroupsID": [1,7,9,15,16,19,20]
      },
      {
        "id": 10,
        "name": "Security Camera 4",
        "description": "Back entrance",
        "streamURL": "rtsp://stream10:5412/10",
        "processingState": "ACTIVE",
        "user": 2,
        "deviceGroupsID": [3]
      },
      {
        "id": 11,
        "name": "Outdoor Camera 4",
        "description": "Garden",
        "streamURL": "rtsp://stream11:5412/11",
        "processingState": "INACTIVE",
        "user": 3,
        "deviceGroupsID": [2,12,13]
      },
      {
        "id": 12,
        "name": "Indoor Camera 4",
        "description": "Study room",
        "streamURL": "rtsp://stream12:5412/12",
        "processingState": "PAUSED",
        "user": 3,
        "deviceGroupsID": [1,7,15,16,19,20]
      },
      {
        "id": 13,
        "name": "Outdoor Camera 5",
        "description": "Driveway",
        "streamURL": "rtsp://stream14:5412/14",
        "processingState": "INACTIVE",
        "user": 1,
        "deviceGroupsID": [2,12]
      },
      {
        "id": 14,
        "name": "Indoor Camera 5",
        "description": "Conference room",
        "streamURL": "rtsp://stream15:5412/15",
        "processingState": "PAUSED",
        "user": 2,
        "deviceGroupsID": [1,6,7,10,11,15,20]
      },
      {
        "id": 15,
        "name": "Security Camera 6",
        "description": "Loading dock",
        "streamURL": "rtsp://stream16:5412/16",
        "processingState": "ACTIVE",
        "user": 2,
        "deviceGroupsID": [3]
      },
      {
        "id": 16,
        "name": "Outdoor Camera 6",
        "description": "Pool area",
        "streamURL": "rtsp://stream17:5412/17",
        "processingState": "INACTIVE",
        "user": 3,
        "deviceGroupsID": [2,12,14]
      },
      {
        "id": 17,
        "name": "Indoor Camera 6",
        "description": "Bathroom",
        "streamURL": "rtsp://stream18:5412/18",
        "processingState": "PAUSED",
        "user": 3,
        "deviceGroupsID": [1,10,11,15,16,20]
      },
      {
        "id": 18,
        "name": "Security Camera 7",
        "description": "Server room",
        "streamURL": "rtsp://stream19:5412/19",
        "processingState": "ACTIVE",
        "user": 1,
        "deviceGroupsID": [3]
      },
      {
        "id": 19,
        "name": "Outdoor Camera 7",
        "description": "Sidewalk",
        "streamURL": "rtsp://stream20:5412/20",
        "processingState": "INACTIVE",
        "user": 1,
        "deviceGroupsID": []
      },
      {
        "id": 20,
        "name": "Indoor Camera 7",
        "description": "Dining area",
        "streamURL": "rtsp://stream21:5412/21",
        "processingState": "PAUSED",
        "user": 2,
        "deviceGroupsID": [5]
      },
      {
        "id": 21,
        "name": "Security Camera 8",
        "description": "Staircase",
        "streamURL": "rtsp://stream22:5412/22",
        "processingState": "ACTIVE",
        "user": 2,
        "deviceGroupsID": [5]
      },
      {
        "id": 22,
        "name": "Outdoor Camera 8",
        "description": "Rooftop",
        "streamURL": "rtsp://stream23:5412/23",
        "processingState": "INACTIVE",
        "user": 3,
        "deviceGroupsID": [5]
      },
      {
        "id": 23,
        "name": "Indoor Camera 8",
        "description": "Lobby",
        "streamURL": "rtsp://stream24:5412/24",
        "processingState": "PAUSED",
        "user": 3,
        "deviceGroupsID": [5]
      },
      {
        "id": 24,
        "name": "Security Camera 9",
        "description": "Control room",
        "streamURL": "rtsp://stream25:5412/25",
        "processingState": "ACTIVE",
        "user": 1,
        "deviceGroupsID": [3]
      },
      {
        "id": 25,
        "name": "Outdoor Camera 9",
        "description": "Gated entrance",
        "streamURL": "rtsp://stream26:5412/26",
        "processingState": "INACTIVE",
        "user": 1,
        "deviceGroupsID": [2]
      },
      {
        "id": 26,
        "name": "Indoor Camera 9",
        "description": "Break room",
        "streamURL": "rtsp://stream27:5412/27",
        "processingState": "PAUSED",
        "user": 2,
        "deviceGroupsID": [1,10,15,16,17,20]
      },
      {
        "id": 27,
        "name": "Security Camera 10",
        "description": "Elevator",
        "streamURL": "rtsp://stream28:5412/28",
        "processingState": "ACTIVE",
        "user": 2,
        "deviceGroupsID": [5]
      },
      {
        "id": 28,
        "name": "Outdoor Camera 10",
        "description": "Playground",
        "streamURL": "rtsp://stream29:5412/29",
        "processingState": "INACTIVE",
        "user": 3,
        "deviceGroupsID": [2]
      },
      {
        "id": 29,
        "name": "Indoor Camera 10",
        "description": "Reception area",
        "streamURL": "rtsp://stream30:5412/30",
        "processingState": "PAUSED",
        "user": 3,
        "deviceGroupsID": [1,10,15,16,17,18,20]
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

