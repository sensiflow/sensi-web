import * as React from "react";
import { DeviceProcessingState } from "../../model/device";
import { Button, ButtonGroup, useMediaQuery, useTheme } from "@mui/material";
import { PlayArrow, Stop, Pause } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";

interface ProcessingStateControlsProps {
  processingState: DeviceProcessingState;
  enabled: boolean;
  onProcessingStateChange: (newProcessingState: DeviceProcessingState) => void;
}

interface ButtonConfiguration {
  processingState: DeviceProcessingState;
  label: string;
  icon: React.ReactNode;
  color: "success" | "error" | "warning";
  sx?: object;
  disabledCondition: boolean;
}

export function ProcessingStateControls(props: ProcessingStateControlsProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const yellowColor = isDarkMode ? "yellow" : "#fdd835";
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const buttonConfiguration: Array<ButtonConfiguration> = [
    {
      processingState: DeviceProcessingState.ACTIVE,
      label: "Start",
      icon: <PlayArrow />,
      color: "success",
      disabledCondition:
        props.enabled && props.processingState === DeviceProcessingState.ACTIVE,
    },
    {
      processingState: DeviceProcessingState.INACTIVE,
      label: "Stop",
      icon: <Stop />,
      color: "error",
      disabledCondition:
        props.enabled &&
        props.processingState === DeviceProcessingState.INACTIVE,
    },
    {
      processingState: DeviceProcessingState.PAUSED,
      label: "Pause",
      icon: <Pause />,
      color: "warning",
      sx: {
        borderColor: yellow[600],
        color: yellow[600],
        "&:hover": {
          borderColor: yellow[700],
          color: yellow[700],
        },
      },
      disabledCondition:
        props.enabled &&
        (props.processingState === DeviceProcessingState.PAUSED ||
          props.processingState === DeviceProcessingState.INACTIVE),
    },
  ];

  return (
    <ButtonGroup
      variant="outlined"
      disabled={!props.enabled}
      orientation={isNonMobile ? "horizontal" : "vertical"}
    >
      {buttonConfiguration.map((button) => (
        <Button
          key={button.processingState}
          onClick={() => props.onProcessingStateChange(button.processingState)}
          disabled={button.disabledCondition}
          startIcon={isNonMobile && button.icon}
          color={button.color}
          sx={button.sx}
        >
          {isNonMobile ? button.label : button.icon}
        </Button>
      ))}
    </ButtonGroup>
  );
}
