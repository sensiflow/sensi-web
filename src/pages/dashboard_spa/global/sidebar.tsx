import * as React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { paths } from "../../../app-paths";
import { ISideBarData, sidebarEventName } from "../../../logic/events/sidebar-resize"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import DevicesIcon from '@mui/icons-material/Devices';
import GroupIcon from '@mui/icons-material/Group';
import {useCurrentUser} from "../../../logic/context/user-context";
import {getRoleHierarchy, getRolesBellow, UserRole} from "../../../model/roles";

const SIDEBAR_TRANSITION_DURATION = 300;

/**
 * Event that is dispatched when the sidebar is resized
 */
const sidebarEvent : CustomEvent<ISideBarData> = new CustomEvent(
  sidebarEventName,
  {
      detail : {
          delay : SIDEBAR_TRANSITION_DURATION
      },
      bubbles: true,
  }
);

interface ItemProps {
    title: string;
    to: string;
    icon: React.ReactNode;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item = ({ title, to, icon, selected, setSelected } : ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const DashboardSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { currentUser  } = useCurrentUser()

  const SwitchIsCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    document.dispatchEvent(sidebarEvent)
  };

const userRole = currentUser.role

const isUserMgmtVisible = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;

const roleColor = colors.greenAccent[500] //TODO: change color based on role

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={SwitchIsCollapsed}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                    Management
                </Typography>
                <IconButton onClick={SwitchIsCollapsed}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                    {`${currentUser.firstName} ${currentUser.lastName}`}
                </Typography>
                <Typography variant="h5" color={roleColor}>
                    {currentUser.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to={paths.dashboard.home}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage devices"
              to={paths.dashboard.devices}
              icon={<VideoCameraFrontIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage groups"
              to={paths.dashboard.groups}
              icon={<DevicesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {isUserMgmtVisible &&
            <Item
               title="Manage users"
               to={paths.dashboard.users}
               icon={<GroupIcon />}
               selected={selected}
               setSelected={setSelected}
            />
            }
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default DashboardSidebar;