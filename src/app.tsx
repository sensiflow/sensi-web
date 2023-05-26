import * as React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardSPA from "./pages/dashboard_spa/dashboardspa";
import DevicesPage from "./pages/dashboard_spa/devices";

import Login from "./pages/auth/login";
import { paths } from "./app-paths";
import DevicePage from "./pages/dashboard_spa/device";
import CreateUserPage from "./pages/dashboard_spa/user-form";
import GroupsPage from "./pages/dashboard_spa/groups/groups";
import GroupPage from "./pages/dashboard_spa/group/group";

export  function App() {
  return ( 
    <BrowserRouter>
      <Routes>
          <Route path={paths.login} element={<Login/>} />
          <Route path={paths.dashboard.home} element={<DashboardSPA/>}>
            <Route path={paths.dashboard.devices} element={<DevicesPage/>}></Route>
            <Route path={paths.dashboard.device} element={<DevicePage/>}></Route>
            <Route path={paths.dashboard["user-form"]} element={<CreateUserPage />}></Route>
            <Route path={paths.dashboard.groups} element={<GroupsPage/>}></Route>
            <Route path={paths.dashboard.group} element={<GroupPage/>}></Route>
          </Route>
      </Routes>  
    </BrowserRouter>
  );
}
