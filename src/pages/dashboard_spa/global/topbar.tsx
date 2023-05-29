import * as React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import {
  LightModeOutlined,
  SettingsOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import { UserMenu } from "./user-menu";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);



  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <UserMenu/>
      </Box>
    </Box>
      
  );
};

export default Topbar;
