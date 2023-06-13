import { Box } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";
import Typography from "@mui/material/Typography";
import * as React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import { InfoBox } from "../../../components/dashboard/info-box";
import { LineChart } from "../../../components/charts/line-chart";
import { Grid, GridItem } from "../../../components/grid";
import PeopleIcon from "@mui/icons-material/People";
import { SelectedListItem } from "../../../components/lists/selected-list-item";
import { Player, RTSPLinkToHLS } from "../../../components/player/player";
import {MEDIA_READ_PASSWORD, MEDIA_READ_USER, MEDIA_SERVER_SECURE} from "../../../constants";

import { Player } from "../../../components/player/player";
import { getDevices } from "../../../api/axios/device/api";
import { constants } from "../../../constants";
import { Device, DeviceProcessingState } from "../../../model/device";
import { dtoToDevice } from "../../../api/dto/output/device-output";
import PeopleCount from "../../../components/people-count";
import Obtainable from "../../../components/obtainable";

//Temporary memory data
let base = +new Date(2000, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];

let data = [Math.round(Math.random() * 20)];

for (let i = 1; i < 200; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
  data.push(Math.round(Math.random() * 20));
}

const useStyles = (theme: Theme) => {
  const colors = tokens(theme.palette.mode);

  return {
    gridItem: {
      bgcolor: colors.primary[400],
      borderRadius: "5px",
      boxShadow: "0px 0px 0px 4px" + colors.primary[600],
    },
  };
};

export default function DashboardHome() {
  const theme: Theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const classes = useStyles(theme);

  const [selectedDevice, setDeviceSelected] = React.useState<Device>(null);
  const [deviceList, setDeviceList] = React.useState<Array<Device>>([]);
  const [deviceCount, setDeviceCount] = React.useState<number>(null);

  const handleListItemClick = (item: Device) => {
    setDeviceSelected(item);
  };

  const reloadDevices = async () => {
    const devicesDTOPage = await getDevices(
      constants.homePage.DEFAULT_DEVICES_CHANNELS_PAGINATION,
      false
    ); // get the top 10 devices
    setDeviceCount(devicesDTOPage.totalElements);
    const devices = devicesDTOPage.items.map((dto) => {
      return dtoToDevice(dto);
    });
    setDeviceList(devices);
    setDeviceSelected(devices[0]);
  };

  React.useEffect(() => {
    reloadDevices();
  }, []);

  return (
    <Grid
      gap="12px"
      sx={{
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <GridItem column={"span 6"} row={"span 20"} sx={classes.gridItem}>
        <Box height="100%" display="flex" justifyContent="center">
            <Player
                url={RTSPLinkToHLS(selectedDevice.processedStreamURL)}
                user={MEDIA_READ_USER}
                password={MEDIA_READ_PASSWORD}
            />
        </Box>
      </GridItem>

      <GridItem column={"span 3"} row={"span 20"} sx={classes.gridItem}>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h3"
            padding="8px"
            sx={{ color: colors.grey[400] }}
          >
            Top 10 Devices
          </Typography>
        </Box>

        <SelectedListItem
          backgroundColor={colors.primary[400]}
          selectedColor={colors.grey[400]}
          hoverColor={colors.grey[500]}
          deviceCount={10}
          list={deviceList}
          onItemClick={(device) => {
            handleListItemClick(device);
          }}
          onIconClick={() => console.log("icon clicked")}
        />
      </GridItem>

      <GridItem column={"span 3"} row={"span 4"} sx={classes.gridItem}>
        <InfoBox
          title="Devices:"
          content={
            <Obtainable
              value={deviceCount}
              toggle={deviceCount !== null}
              reason="Could not obtain device count"
            />
          }
          icon={<VideocamIcon />}
        />
      </GridItem>

      <GridItem column={"span 3"} row={"span 4"} sx={classes.gridItem}>
        <InfoBox
          title="Current People Detected:"
          content={
            <PeopleCount
              deviceID={selectedDevice?.id}
              toggle={selectedDevice?.status === DeviceProcessingState.ACTIVE}
              reason="Device must be active to obtain it's real time metrics"
            />
          }
          icon={<PeopleIcon />}
        />
      </GridItem>

      <GridItem
        column={"span 9"}
        row={"span 27"}
        sx={{
          bgcolor: colors.primary[400],
          borderRadius: "5px",
          boxShadow: "0px 0px 0px 5px" + colors.primary[600],
        }}
      >
        <LineChart
          xdata={date}
          ydata={data}
          chartName="People over time"
          dataName="Data"
          EChartsProps={{
            style: { height: "100%", width: "100%", borderRadius: "5px" },
            theme: theme.palette.mode,
          }}
        />
      </GridItem>
    </Grid>
  );
}
