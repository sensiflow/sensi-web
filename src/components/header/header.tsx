import * as React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import HeaderSkeleton from "./header-skeleton";


const SUBTITLE_MAX_LENGTH = 42;

const Header = ({
                  title,
                  subTitle,
                  noSubTitleText,
                  isLoading,
                  onHeaderClick,
                }: {
  title: string;
  subTitle: string;
  noSubTitleText?: string;
  isLoading?: boolean;
  onHeaderClick?: () => void;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubTitle = (subTitle) => {
    if (!subTitle || subTitle.length == 0)
      return noSubTitleText ?? "No description";

    if (subTitle.length > SUBTITLE_MAX_LENGTH)
      return subTitle.slice(0, SUBTITLE_MAX_LENGTH) + "...";

    return subTitle;
  };

  const cursor = onHeaderClick ? "pointer" : "default";
  return !isLoading ? (
      <Box
          mb="20px"
          sx={{
            cursor: cursor,
            width: "fit-content",
          }}
          onClick={onHeaderClick}
      >
        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {handleSubTitle(subTitle)}
        </Typography>
      </Box>
  ) : (
      <HeaderSkeleton />
  );
};

export default Header;
