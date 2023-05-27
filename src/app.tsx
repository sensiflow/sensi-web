import * as React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardSPA from "./pages/dashboard_spa/dashboardspa";
import DevicesPage from "./pages/dashboard_spa/devices";
import DashboardHome from "./pages/dashboard_spa/home";

import Login from "./pages/auth/login";
import { paths } from "./app-paths";
import DevicePage from "./pages/dashboard_spa/device";
import CreateUserPage from "./pages/dashboard_spa/user-form";
import UserManagementPage from "./pages/dashboard_spa/user-management";
import GroupsPage from "./pages/dashboard_spa/groups/groups";
import GroupPage from "./pages/dashboard_spa/group/group";
import { CurrentUserProvider } from "./logic/context/user-context";
import { CookiesProvider } from "react-cookie";

export function App() {

  
  return ( 
  <CookiesProvider>
    <CurrentUserProvider>
      <BrowserRouter>
        <Routes>
            <Route path={paths.login} element={<Login/>} />
            <Route path={paths.dashboard.home} element={<DashboardSPA/>}>
              <Route path={paths.dashboard.home} element={<DashboardHome/>}></Route>
              <Route path={paths.dashboard.devices} element={<DevicesPage/>}></Route>
              <Route path={paths.dashboard.device} element={<DevicePage/>}></Route>
              <Route path={paths.dashboard["user-form"]} element={<CreateUserPage />}></Route>
              <Route path={paths.dashboard.groups} element={<GroupsPage/>}></Route>
              <Route path={paths.dashboard.group} element={<GroupPage/>}></Route>
              <Route path={paths.dashboard.users} element={<UserManagementPage/>}></Route>
            </Route>
        </Routes>  
      </BrowserRouter>
    </CurrentUserProvider>
  </CookiesProvider>
  );
}
