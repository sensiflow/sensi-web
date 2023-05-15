import * as React from "react";
import { useLocation } from "react-router-dom";
import { getDevice } from "../../../api/fake/fake-api";
import { dtoToDevice as deviceDtoToDevice } from "../../../api/dto/output/device-output";
import { Box, Divider, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { params } from "../../../app-paths";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import HeaderSkeleton from "../../../components/header/HeaderSkeleton";
import Header from "../../../components/header/Header";
import { tokens } from "../../../theme";
import { Device, DeviceProcessingState } from "../../../model/device";
import DeviceProcessingStatus from "../../../components/device/processing-status/DeviceProcessingStatus";
import { ProcessingStateControls } from "../../../components/device/ProcessingStateControls";

export default function DevicePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { state } = useLocation();
  const { [params.device]: id } = state;
  const validatedDeviceID = parseInt(id);

  const [device, setDevice] = React.useState<Device>(null);
  const isNonMobile = useMediaQuery("(min-width:720px)");

  const deviceColors = [
    colors.greenAccent[500],
    colors.redAccent[500],
    colors.blueAccent[500],
    colors.grey[500],
  ];
  const deviceColor = React.useRef<string>(null);

  const isLoading = device === null;

  const getDeviceInformation = async () => {
    const deviceDTO = await getDevice(validatedDeviceID);
    const device = deviceDtoToDevice(deviceDTO);
    setDevice(device);
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
                      strokeWidth: "10px",
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
