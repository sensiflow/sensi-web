import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { tokens } from "../../../theme";

export default function RedOfflineSquare({
  fontSize,
}: {
  fontSize: "small" | "medium" | "large";
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const redTone = isDarkMode ? "red" : "#e53935";

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

  const squareStyle = {
    ...sizeStyle,
    backgroundColor: redTone,
    boxShadow: "0 0 8px " + redTone,
  };

  return <div style={squareStyle}></div>;
}
