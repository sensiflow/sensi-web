import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import * as React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { tokens } from "../theme";

/**
 * This component displays a value when it exists and an error icon when it doesn't.
 *
 * The error icon displays a tooltip on hover with the reason for the error.
 *
 * @param value The value to display
 * @param toggle Whether to display the value or the error icon
 * @param reason The reason for the error
 */
const Obtainable = (props: {
  value: string | number | null;
  toggle: boolean;
  reason: string;
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  return (
    <Box width={"100px"}>
      <Typography
          color = {colors.grey[100]}
          variant={'h3'} >{props.toggle && props.value}</Typography>
      {!props.toggle && (
        <Tooltip style={{
            fontSize: "2rem"
          }}
            title={
              <Typography style={{fontSize: "0.9rem"}}>{props.reason}</Typography>
              }
            >
          <ErrorOutlineIcon color="error" />
        </Tooltip>
      )}
    </Box>
  );
};

export default Obtainable;
