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
import {
  MEDIA_READ_PASSWORD,
  MEDIA_READ_USER
} from "../../../constants";
import { getDevices, getDeviceMetrics } from "../../../api/axios/device/api";
import { constants } from "../../../constants";
import { Device, DeviceProcessingState } from "../../../model/device";
import { dtoToDevice } from "../../../api/dto/output/device-output";
import PeopleCount from "../../../components/people-count";
import Obtainable from "../../../components/obtainable";
import { dtoToMetric } from "../../../api/dto/output/device-metric-output-dto";
import { DeviceMetric } from "../../../model/metric";

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

function getMetricXAxisLabel(metrics: Array<DeviceMetric>) {
  const xAxisLabels = [];
  
  metrics.forEach((metric) => {
    const startDate = metric.startTime;
    const endDate = metric.endTime;
        if(startDate === undefined || startDate === null || endDate === null || endDate === undefined) return;
    const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    const xAxisLabelsCount = Math.floor(seconds);
    for (let i = 0; i < xAxisLabelsCount; i++) {
      const date = new Date(startDate.getTime() + i * 1000);
      xAxisLabels.push(date);
    }
  });
  
 return xAxisLabels;
}

function getMetricYAxisLabel(metrics: Array<DeviceMetric>) {
    const yAxisLabels = [];
    metrics.forEach((metric) => {
      const startDate = metric.startTime;
        const endDate = metric.endTime;
        if(startDate === undefined || startDate === null || endDate === null || endDate === undefined) return;
        const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        const xAxisLabelsCount = Math.floor(seconds);
        for (let i = 0; i < xAxisLabelsCount; i++) {
           yAxisLabels.push(metric.peopleCount)
        }
    });
    return yAxisLabels;
}

export default function DashboardHome() {
  const theme: Theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const classes = useStyles(theme);

  const [selectedDevice, setDeviceSelected] = React.useState<Device>(null);
  const [deviceList, setDeviceList] = React.useState<Array<Device>>(null);
  const [deviceCount, setDeviceCount] = React.useState<number>(null);
  const [metrics, setMetrics] = React.useState<Array<DeviceMetric>>([]);

  const handleListItemClick = (item: Device) => {
    setDeviceSelected(item);
  };

  const handleDateString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    return date.toLocaleString(undefined, options)?.replace(",", "");
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

  const grabMetrics = async (deviceID: number) => {
    const metricsDTOPage = await getDeviceMetrics(deviceID, {
      page: 0,
      pageSize: 50,
    });
    console.log(metricsDTOPage);
    const metrics = metricsDTOPage.items.map((dto) => dtoToMetric(dto));
    setMetrics(metrics);
  };

  React.useEffect(() => {
    reloadDevices();
  }, []);

  React.useEffect(() => {
    if (selectedDevice) {
      grabMetrics(selectedDevice.id);
    }
  }, [selectedDevice]);

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
            url={
              selectedDevice?.processedStreamURL
                ? RTSPLinkToHLS(selectedDevice.processedStreamURL)
                : null
            }
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
            Top 10 devices
          </Typography>
        </Box>

        <SelectedListItem
          backgroundColor={colors.primary[400]}
          selectedColor={colors.grey[400]}
          hoverColor={colors.grey[500]}
          deviceCount={10}
          isLoading={deviceList === null}
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

      {selectedDevice && (
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
            xdata={getMetricXAxisLabel(metrics)}
            ydata={getMetricYAxisLabel(metrics)}
            chartName={`People over time for ${selectedDevice?.name ?? ""}`}
            dataName="People"
            EChartsProps={{
              style: { height: "100%", width: "100%", borderRadius: "5px" },
              theme: theme.palette.mode,
            }}
          />
        </GridItem>
      )}
    </Grid>
  );
}
