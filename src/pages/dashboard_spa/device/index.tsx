import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { dtoToDevice as deviceDtoToDevice } from "../../../api/dto/output/device-output";
import { Box, Divider, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { params, paths } from "../../../app-paths";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import HeaderSkeleton from "../../../components/header/header-skeleton";
import Header from "../../../components/header/header";
import { tokens } from "../../../theme";
import { Device, DeviceProcessingState } from "../../../model/device";
import { ProcessingStateControls } from "../../../components/device/processing-state-controls";
import { extractFromUri } from "../../../utils";
import {getDevice} from "../../../api/axios/device/api";
import DeviceProcessingStatus from "../../../components/device/processing-status/device-processing-status";
import {appToast, ToastType} from "../../../components/toast";
import {APIError, errorFallback} from "../../utils";

export default function DevicePage() {
  const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { pathname } = useLocation();
  const ids = extractFromUri(pathname, paths.dashboard.device)
  const validatedDeviceID = parseInt(ids[params.device]);

  //Device hooks
  const [device, setDevice] = React.useState<Device>(null);
  const isLoading = device === null;
  const isNonMobile = useMediaQuery("(min-width:720px)");
  const deviceColor = React.useRef<string>(null);

  const deviceColors = [
    colors.greenAccent[500],
    colors.redAccent[500],
    colors.blueAccent[500],
    colors.grey[500],
  ];

  const getDeviceInformation = async () => {
    try{
      const deviceDTO = await getDevice(validatedDeviceID);
      const device = deviceDtoToDevice(deviceDTO);
      setDevice(device);
    }catch (e){
      if(e.status === APIError.NOT_FOUND) { navigate(paths["not-found"]) }
      errorFallback(e, navigate)
    }
  };

  const getRandomDeviceColor = () => {
    const index = Math.floor(Math.random() * deviceColors.length);
    return deviceColors[index];
  };

  const onDeviceProcessingStateChange = (newProcessingState) => {
    const pendingDevice = {
      ...device,
      status: DeviceProcessingState.PENDING,
    };

    setDevice(pendingDevice);
    setTimeout(() => {
      const updatedDevice = {
        ...pendingDevice,
        status: newProcessingState,
      };

      setDevice(updatedDevice);
    }, 2000);
  };

  React.useEffect(() => {
    getDeviceInformation();
    deviceColor.current = getRandomDeviceColor();
  }, []);

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
                      strokeWidth: "10px"
                    }}
                  />
                </Box>
              )}
              <Header title={device.name} subTitle={device.description} />
              <Divider orientation="vertical" flexItem />
              <DeviceProcessingStatus
                state={device.status}
                fontSize={isNonMobile ? "large" : "small"}
              />
            </>
          )}
        </Box>
        {!isLoading && (
          <ProcessingStateControls
            processingState={device.status}
            enabled={device.status !== DeviceProcessingState.PENDING}
            onProcessingStateChange={onDeviceProcessingStateChange}
          />
        )}
      </Box>
      <Divider light={theme.palette.mode === "dark"} />
    </Box>
  );
}
