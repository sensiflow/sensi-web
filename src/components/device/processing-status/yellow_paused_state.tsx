import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { tokens } from "../../../theme";

// Component for the PAUSED state
export default function YellowPausedRectangles({
  fontSize,
}: {
  fontSize: "small" | "medium" | "large";
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const yellowColor = isDarkMode ? "yellow" : "#fdd835";

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

  const flexContainerStyle = {
    ...sizeStyle,
    display: "flex",
    justifyContent: "space-between",
  };

  const innerRectangleStyle = {
    width: "25%",
    height: "inherit",
    backgroundColor: yellowColor, // Yellow background color for PAUSED state
    boxShadow: "0 0 8px " + yellowColor, // Same box shadow as the green circle
  };

  return (
    <div style={flexContainerStyle}>
      <div style={innerRectangleStyle} />
      <div style={innerRectangleStyle} />
    </div>
  );
}
