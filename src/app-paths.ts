export const params = {
    'device': 'deviceId',
    'group': 'groupId'
}

export const paths = {
    'login': '/',
    'dashboard': {
        'home': '/dashboard',
        'devices': '/dashboard/devices',
        'user-form': '/dashboard/user-form',
        'users': '/dashboard/users',
        'device': `/dashboard/devices/:${params.device}`,
        'groups': '/dashboard/groups',
        'group': `/dashboard/groups/:${params.group}`,
    },
    'not-found': '/not-found',
    'internal-error': '/internal-error'
}

