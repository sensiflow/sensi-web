
export enum UserRole {
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN'
}

/**
 * Gets the hierarchy of roles for a given role
 * @param role Role to get the hierarchy for
 * @returns Array of roles in the hierarchy
 */
export function getRoleHierarchy(role: UserRole): UserRole[] {
    switch (role) {
      case UserRole.USER:
        return [UserRole.USER];
      case UserRole.MODERATOR:
        return [UserRole.USER, UserRole.MODERATOR];
      case UserRole.ADMIN:
        return [UserRole.USER, UserRole.MODERATOR, UserRole.ADMIN];
    }
}

export function getRolesBellow(role: UserRole): UserRole[] {
    return getRoleHierarchy(role).filter(r => r !== role);
}

const permissionMap = {  //endpoint on api
    [UserRole.USER]: {
        'users:read': true,
        'users:register': false,
        'users:update_role': false,
        'users:update_info': true,
        'users:delete': false
    },
    [UserRole.MODERATOR]: {
        'users:read': true,
        'users:register': true,
        'users:update_role': false,
        'users:update_info': true,
        'users:delete': false
    },
    [UserRole.ADMIN]: {
        'users:read': true,
        'users:register': true,
        'users:update_role': true,
        'users:update_info': true,
        'users:delete': true
    }        
}

/**
 * Verifies if a role has a given permission
 * @param role role to check permissions for
 * @param permission the permission to check, e.g. 'users:read', TODO: add reference for example permissions
 * @returns true if the role has the permission, false otherwise
 */
export function checkRolePermission(role : UserRole, permission: string) : Boolean {
    const userRolePermissions = permissionMap[role];
    if (!userRolePermissions) {
      return false;
    }
    const permissionRequired = userRolePermissions[permission];
    if (!permissionRequired) {
      return false;
    }
    return permissionRequired;
}