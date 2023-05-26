export const params = {
    'device': 'deviceId',
    'group': 'groupId'
}

export const paths = {
    'login': '/',
    'register': '/register',
    'dashboard': {
        'home': '/dashboard',
        'devices': '/dashboard/devices',
        'user-form': '/dashboard/user-form',
        'device': `/dashboard/devices/:${params.device}`,
        'groups': '/dashboard/groups',
        'group': `/dashboard/groups/:${params.group}`,
    }
}

