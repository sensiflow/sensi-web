import * as React from "react";
import {useSSE} from "../../../logic/hooks/use-sse";
import {useLocation, useNavigate} from "react-router-dom";
import {dtoToDevice as deviceDtoToDevice} from "../../../api/dto/output/device-output";
import {Box, Divider, Skeleton, useMediaQuery, useTheme} from "@mui/material";
import {params, paths} from "../../../app-paths";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import {tokens} from "../../../theme";
import PeopleIcon from "@mui/icons-material/People";
import {Device, DeviceProcessingState, DeviceProcessingStateKey,} from "../../../model/device";
import {extractFromUri} from "../../../utils";
import * as api from "../../../api/axios/device/api";
import {getDevice} from "../../../api/axios/device/api";
import {apiCore} from "../../../api/core";
import PeopleCount from "../../../components/people-count";
import Grid from "@mui/material/Grid";
import {Player, RTSPLinkToHLS} from "../../../components/player/player";
import DeviceProcessingStatus from "../../../components/device/processing-status/device-processing-status";
import HeaderSkeleton from "../../../components/header/header-skeleton";
import {ProcessingStateControls} from "../../../components/device/processing-state-controls";
import Header from "../../../components/header/header";
import {APIError, errorFallback} from "../../utils";
import {InfoBox} from "../../../components/dashboard/info-box";
import {MEDIA_READ_PASSWORD, MEDIA_READ_USER} from "../../../constants";

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

  const deviceColor = React.useRef<string>(null);
  const isNonMobile = useMediaQuery("(min-width:720px)");

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

      if(DeviceProcessingState[state] !== DeviceProcessingState.PENDING){
          getDevice(validatedDeviceID).then((deviceDTO) => {
              const newDevice = deviceDtoToDevice(deviceDTO);
              setDisplayedDevice(newDevice);
          })
      }
    },
    errorListener: (e) => {
      // Error Handler
      if (e.type === "error") {
        // TODO: Send toast like error message
      }
      console.log("State Update SSE connection closed. Cleaning up...");
      setUpdatePending(false);
    },
    dependencies: [isStateUpdatePending],
  });

  const isLoading = displayedDevice === null;

  const streamURL =  displayedDevice?.status == DeviceProcessingState.ACTIVE ? displayedDevice?.processedStreamURL : null

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
              <Player//TODO: quando a stream volta, tenho q clicar para voltar a carregar FIX
                url={streamURL ? RTSPLinkToHLS(streamURL) : null}
                user={MEDIA_READ_USER}
                password={MEDIA_READ_PASSWORD}
              />
            </Grid>
            <Grid item xs={4}>
              <InfoBox
                title="Current People Detected:"
                content={
                  <PeopleCount
                    deviceID={validatedDeviceID}
                    toggle={
                      displayedDevice?.status === DeviceProcessingState.ACTIVE
                    }
                    reason="Device must be active to obtain it's real time metrics"
                  />
                }
                icon={<PeopleIcon />}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
