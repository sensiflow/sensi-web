import * as React from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { ThemeProvider} from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import Topbar from './global/topbar';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './global/sidebar';



export default function DashboardSPA() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <DashboardSidebar/>
          <main className='content'>
            <Topbar/>
            <Outlet/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}