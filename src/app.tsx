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

export  function App() {
  return ( 
    <BrowserRouter>
      <Routes>
          <Route path={paths.login} element={<Login/>} />
          <Route path={paths.dashboard.home} element={<DashboardSPA/>}>
            <Route path={paths.dashboard.home} element={<DashboardHome/>}></Route>
            <Route path={paths.dashboard.devices} element={<DevicesPage/>}></Route>
            <Route path={paths.dashboard.device} element={<DevicePage/>}></Route>
            <Route path={paths.dashboard["user-form"]} element={<CreateUserPage />}></Route>
            <Route path={paths.dashboard.users} element={<UserManagementPage/>}></Route>
          </Route>
      </Routes>  
    </BrowserRouter>
  );
}
