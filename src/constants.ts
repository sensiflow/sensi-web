export const constants = {
    search:{
        debounceTime: 500,
    },
    devicesCheckBoxList:{
        maxWidth: 600,
        minWidth: 500,
        maxHeight: 300,
        minHeight: 300,
        backgroundColor: '#2f3748', //change to theme 
        scrollDebounceTime: 20
    },
    cookie: {
        USE_COOKIE_CHECK_INTERVAL : 5000
    },

    groupPage: {
      DEFAULT_CHECKBOX_LIST_PAGINATION: {pageSize: 10, page: 0},
      DEFAULT_GROUP_DEVICES_PAGINATION: {pageSize: 5, page: 0}
    },
    devicesPage: {
        DEFAULT_DEVICES_PAGINATION: { pageSize: 5, page: 0 }
    },

    groupsPage:{
        DEFAULT_GROUP_DEVICES_PAGINATION: {pageSize: 5, page: 0},
        SCROLL_HEIGHT_OFFSET: 120,
        SCROLL_DEBOUNCE_MS: 20
    },
    homePage:{
        DEFAULT_DEVICES_CHANNELS_PAGINATION: {pageSize: 10, page: 0},
    },
    usersPage:{
        DEFAULT_USERS_PAGINATION: {pageSize: 5, page: 0}
    }
}

export const API_URL = process.env.API_URL || "http://localhost:8080/api/v1"
export const RTSP_PORT = process.env.RTSP_PORT || "8554"
export const HLS_PORT = process.env.HLS_PORT || "8888"
export const RTSPS_PORT = process.env.RTSPS_PORT || "8322"
export const MEDIA_READ_USER = process.env.MEDIA_READ_USER || undefined
export const MEDIA_READ_PASSWORD = process.env.MEDIA_READ_PASSWORD || undefined
