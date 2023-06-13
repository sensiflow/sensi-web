import * as React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardSPA from "./pages/dashboard_spa/dashboardspa";
import DevicesPage from "./pages/dashboard_spa/devices";
import DashboardHome from "./pages/dashboard_spa/home";

import Login from "./pages/auth/login";
import {paths} from "./app-paths";
import DevicePage from "./pages/dashboard_spa/device";
import CreateUserPage from "./pages/dashboard_spa/user-form";
import UserManagementPage from "./pages/dashboard_spa/user-management";
import GroupsPage from "./pages/dashboard_spa/groups";
import GroupPage from "./pages/dashboard_spa/group";
import {CurrentUserProvider} from "./logic/context/user-context";
import {UserRole} from "./model/roles";
import {AuthProvider} from "./logic/context/auth-context";
import {ProtectedRoute} from "./components/protected-route";
import {NotFoundPage} from "./pages/dashboard_spa/error";
import { ErrorBoundary } from "react-error-boundary";
import {ToastContainer} from "react-toastify";
import {InternalErrorPage} from "./pages/dashboard_spa/error/internal-error-page";

export function App() {
    return (
        <>
            <ErrorBoundary fallback={<InternalErrorPage/>}>
                <CurrentUserProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Router/>
                        </BrowserRouter>
                    </AuthProvider>
                </CurrentUserProvider>
            </ErrorBoundary>
            <ToastContainer/>
        </>
    );
}

function Router(){
    return(
            <Routes>
                <Route path={paths.login} element={<Login/>}/>
                <Route path={paths.dashboard.home} element={<ProtectedRoute element=<DashboardSPA/> />}>
                    <Route path={paths.dashboard.home} element={<ProtectedRoute element=<DashboardHome/> />}></Route>
                    <Route path={paths.dashboard.devices} element={<ProtectedRoute element=<DevicesPage/> />}></Route>
                    <Route path={paths.dashboard.device} element={<ProtectedRoute element=<DevicePage/> />}></Route>
                    <Route path={paths.dashboard["user-form"]} element={<ProtectedRoute element=<CreateUserPage/> />}></Route>
                    <Route path={paths.dashboard.groups} element={<ProtectedRoute element=<GroupsPage/> />}></Route>
                    <Route path={paths.dashboard.group} element={<ProtectedRoute element=<GroupPage/> />}></Route>
                    <Route path={paths.dashboard.users} element={<ProtectedRoute element=<UserManagementPage/> allowedRoles={[UserRole.MODERATOR,UserRole.ADMIN]} />}></Route>
                </Route>
                <Route path="*" element={<Navigate to={paths["not-found"]} replace={true} />}/>
                <Route path={paths["not-found"]} element={<NotFoundPage/>}/>
                <Route path={paths["internal-error"]} element={<InternalErrorPage/>}/>
            </Routes>
    )
}