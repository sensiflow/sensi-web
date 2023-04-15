import * as React from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { ThemeProvider} from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import Topbar from './global/topbar';
import { Outlet, Route, Routes } from 'react-router-dom';
import Sidebar from './global/sidebar';
import { Home } from '../home';
import Devices from './devices';
import { paths } from '../../app-paths';



export default function DashboardSPA() {

  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar/>
      <div className='content'>
        <Topbar/>
        <Outlet/>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}