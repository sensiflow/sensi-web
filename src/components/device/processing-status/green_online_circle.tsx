import { green } from "@mui/material/colors";
import { Theme, useTheme } from "@mui/material/styles";
import * as React from "react";

// GreenOnline circle component with inline style
export default function GreenOnlineCircle({
  fontSize,
}: {
  fontSize: "small" | "medium" | "large";
}) {
  const theme: Theme = useTheme();
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const greenTone = isDarkMode ? "green" : "#4caf50";

  let sizeStyle;

  switch (fontSize) {
    case "small":
      sizeStyle = {
        width: 12,
        height: 12,
      };
      break;
    case "medium":
      sizeStyle = {
        width: 16,
        height: 16,
      };
      break;
    case "large":
      sizeStyle = {
        width: 20,
        height: 20,
      };
  }

  const circleStyle = {
    ...sizeStyle,
    borderRadius: "50%",
    backgroundColor: greenTone, // Hardcoded color for online status
    boxShadow: "0 0 8px " + greenTone, // Hardcoded box shadow for online status
  };

  return <div style={circleStyle} />;
}
