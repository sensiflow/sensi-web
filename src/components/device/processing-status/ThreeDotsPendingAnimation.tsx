import * as React from "react";
import { CircularProgress, makeStyles, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { tokens } from "../../../theme";

const ThreeDotsPendingAnimation = ({
  fontSize,
}: {
  fontSize: "small" | "medium" | "large";
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let sizeStyle;
  switch (fontSize) {
    case "small":
      sizeStyle = {
        width: 8,
        height: 8,
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
        width: 16,
        height: 16,
      };
  }

  const dotStyle = {
    ...sizeStyle,
    borderRadius: "50%",
    backgroundColor: colors.greenAccent[500],
    animation: "bounce 1s infinite",
    margin: "0 4px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "@keyframes bounce": {
          "0%": {
            transform: "scale(0.2)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.2)",
          },
        },
      }}
    >
      <Box
        sx={{
          ...dotStyle,
          animationDelay: "0.2s",
        }}
      />
      <Box
        sx={{
          ...dotStyle,
          animationDelay: "0.4s",
        }}
      />
      <Box
        sx={{
          ...dotStyle,
          animationDelay: "0.6s",
        }}
      />
    </Box>
  );
};
export default ThreeDotsPendingAnimation;
