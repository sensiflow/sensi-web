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

    usersPage:{
        DEFAULT_USERS_PAGINATION: {pageSize: 5, page: 0}
    }
}