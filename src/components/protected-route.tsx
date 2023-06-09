import * as React from "react"
import { Route, Navigate } from "react-router-dom"
import { UserRole } from "../model/roles"
import {paths} from "../app-paths";
import {useAuth} from "../logic/context/auth-context";

interface ProtectedRouteProps {
    allowedRoles?: UserRole[]
    element: JSX.Element
}

/**
 * A component that only displays the given element if the user has one of the specified roles
 *
 * If the user is not logged in, the route is not accessible
 * If no roles are specified, the route is accessible to all users
 * @param allowedRoles the roles that are allowed to access the route
 * @param element the element to render if the user is allowed to access the route
 */
export function ProtectedRoute({
    allowedRoles,
    element
    } : ProtectedRouteProps ): JSX.Element {
    const { login, logout, isLoggedIn, user  } = useAuth()

    const isAllowed = () => {
        if (!isLoggedIn) {
            return false
        }
        if (allowedRoles === undefined) {
            return true
        }

        return allowedRoles.includes(UserRole[user.role])
    }

    return (
        isAllowed() ? element : <Navigate to={paths.login} replace={true}/>
    )


}