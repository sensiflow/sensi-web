import * as React from "react";
import { Box, Skeleton } from "@mui/material";

const HeaderSkeleton = () => {
  return (
    <Box mb="30px">
      <Skeleton variant="text" sx={{ width: "200px", height: "50px" }} />
      <Skeleton variant="text" sx={{ width: "400px", height: "50px" }} />
    </Box>
  );
};

export default HeaderSkeleton;
