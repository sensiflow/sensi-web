import * as React from "react";
import { Box, Tooltip } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PeopleCount = (props: {
  count: number;
  toggle: boolean;
  reason: string;
}) => {
  return (
    <Box width={"100px"}>
      <h1>People Count: {props.toggle && props.count}</h1>
      {!props.toggle && (
        <Tooltip title={props.reason}>
          <ErrorOutlineIcon color="error" />
        </Tooltip>
      )}
    </Box>
  );
};

export default PeopleCount;
