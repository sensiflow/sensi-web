import * as React from "react";
import { useSSE } from "../../../logic/hooks/use-sse";
import { useLocation, useNavigate } from "react-router-dom";
import { dtoToDevice as deviceDtoToDevice } from "../../../api/dto/output/device-output";
import { Box, Divider, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { params, paths } from "../../../app-paths";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { tokens } from "../../../theme";
import {
  Device,
  DeviceProcessingState,
  DeviceProcessingStateKey,
} from "../../../model/device";
import { extractFromUri } from "../../../utils";
import * as api from "../../../api/axios/device/api";
import { useAuth } from "../../../logic/context/auth-context";
import { apiCore } from "../../../api/core";
import PeopleCount from "../../../components/people-count";
import Grid from "@mui/material/Grid";
import { Player, RTSPLinkToHLS } from "../../../components/player/player";
import DeviceProcessingStatus from "../../../components/device/processing-status/device-processing-status";
import HeaderSkeleton from "../../../components/header/header-skeleton";
import { ProcessingStateControls } from "../../../components/device/processing-state-controls";
import Header from "../../../components/header/header";
import { appToast, ToastType } from "../../../components/toast";
import { APIError, errorFallback } from "../../utils";
import {MEDIA_READ_PASSWORD, MEDIA_READ_USER, MEDIA_SERVER_SECURE} from "../../../constants";

export default function DevicePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { pathname } = useLocation();
  const ids = extractFromUri(pathname, paths.dashboard.device);
  const validatedDeviceID = parseInt(ids[params.device]);

  const [displayedDevice, setDisplayedDevice] = React.useState<Device>(null);
  const [isStateUpdatePending, setUpdatePending] =
    React.useState<boolean>(false);
  const [peopleCount, setPeopleCount] = React.useState<number>(null);

  const deviceColor = React.useRef<string>(null);
  const isNonMobile = useMediaQuery("(min-width:720px)");
  const stateSSE = React.useRef<EventSource>(null);
  const peopleCountSSE = React.useRef<EventSource>(null);

  const deviceColors = [
    colors.greenAccent[500],
    colors.redAccent[500],
    colors.blueAccent[500],
    colors.grey[500],
  ];

  const getDeviceInformation = async () => {
    try {
      setDisplayedDevice(null);
      const deviceDTO = await api.getDevice(validatedDeviceID);
      console.log(deviceDTO);
      const device = deviceDtoToDevice(deviceDTO);
      setDisplayedDevice(device);
      setUpdatePending(device.status === DeviceProcessingState.PENDING);
    } catch (e) {
      if (e.status === APIError.NOT_FOUND) {
        navigate(paths["not-found"]);
      }
      errorFallback(e, navigate);
    }
  };

  const getRandomDeviceColor = () => {
    const index = Math.floor(Math.random() * deviceColors.length);
    return deviceColors[index];
  };

  const onDeviceProcessingStateChange = async (
    newProcessingState: DeviceProcessingState
  ) => {
    const pendingDevice = {
      ...displayedDevice,
      status: DeviceProcessingState.PENDING,
    };

    const processingStateKey = DeviceProcessingState[
      newProcessingState
    ] as DeviceProcessingStateKey;

    await api.updateProcessingState(processingStateKey, validatedDeviceID);
    setDisplayedDevice(pendingDevice);
    setUpdatePending(true);
  };

  // Page load effect
  React.useEffect(() => {
    getDeviceInformation();
    deviceColor.current = getRandomDeviceColor();
  }, []);

  const sseCleanUp = (sseRef: React.MutableRefObject<EventSource>) => {
    sseRef.current?.close();
    sseRef.current = null;
  };

  // State update effect

  useSSE({
    sseProvider: () => apiCore.getDeviceStateUpdateSSE(validatedDeviceID),
    active: isStateUpdatePending,
    event: "device-state", // TODO: Constants
    eventListener: (event) => {
      // Event Handler
      const cleanedUpState = event.data.replace(/"/g, "");
      const state = cleanedUpState as DeviceProcessingStateKey;
      console.log("State update received: ", state);
      const newDevice = {
        ...displayedDevice,
        status: DeviceProcessingState[state],
      };
      setDisplayedDevice(newDevice);
    },
    errorListener: (e) => {
      // Error Handler
      if (e.type === "error") {
        // TODO: Send toast like error message
      }
      console.log("State Update SSE connection closed. Cleaning up...");
      setUpdatePending(false);
    },
    dependencies: [displayedDevice],
  });

  useSSE({
    sseProvider: () => apiCore.getDevicePeopleCountSSE(validatedDeviceID),
    active: displayedDevice?.status === DeviceProcessingState.ACTIVE,
    event: "people-count", // TODO: Constants
    eventListener: (event) => {
      // Event Handler
      const count = parseInt(event.data);
      console.log("People count update received: ", count);
      setPeopleCount(count);
    },
    errorListener: (error) => {
      // Error Handler
      if (error.type === "error") {
        // TODO: Send toast like error message
      }
      console.log("People count SSE connection closed. Cleaning up...");
      setUpdatePending(false);
    },
    dependencies: [displayedDevice],
  });

  const isLoading = displayedDevice === null;

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        mb={"20px"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          {isLoading ? (
            <>
              <Skeleton
                variant="rounded"
                sx={{ width: "100px", height: "100px" }}
              />
              <HeaderSkeleton />
              <Divider orientation="vertical" flexItem />
            </>
          ) : (
            <>
              {isNonMobile && (
                <Box
                  width="100px"
                  height="100px"
                  minWidth="50px"
                  minHeight="50px"
                  bgcolor={deviceColor.current}
                  borderRadius="10%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  boxShadow={theme.shadows[5]}
                >
                  <VideocamOutlinedIcon
                    sx={{
                      fontSize: "60px",
                      color: theme.palette.background.default,
                      strokeWidth: "10px",
                    }}
                  />
                </Box>
              )}
              <Header
                title={displayedDevice.name}
                subTitle={displayedDevice.description}
              />
              <Divider orientation="vertical" flexItem />
              <DeviceProcessingStatus
                state={displayedDevice.status}
                fontSize={isNonMobile ? "large" : "small"}
              />
            </>
          )}
        </Box>
        {!isLoading && (
          <ProcessingStateControls
            processingState={displayedDevice.status}
            enabled={displayedDevice.status !== DeviceProcessingState.PENDING}
            onProcessingStateChange={onDeviceProcessingStateChange}
          />
        )}
      </Box>
      <Divider light={theme.palette.mode === "dark"} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        mt={"20px"}
      >
        {!isLoading && (
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Player
                url={RTSPLinkToHLS(displayedDevice.processedStreamURL)}
                user={MEDIA_READ_USER}
                password={MEDIA_READ_PASSWORD}
              />
            </Grid>
            <Grid item xs={4}>
              <PeopleCount
                count={peopleCount}
                toggle={displayedDevice.status === DeviceProcessingState.ACTIVE}
                reason="Device is not active to grab its real-time metrics."
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
