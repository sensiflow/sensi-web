import { Box, TextField, Button, Grid, Link, Skeleton } from "@mui/material";
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Typography from "@mui/material/Typography";

interface InfoBoxProps {
  title: string;
  content: React.ReactElement;
  icon: React.ReactElement;
  toggle?: boolean;
  reason?: string;
}

/**
 * Creates a component that displays a title, value, and icon
 * This component includes a skeleton loader when the value is null or undefined
 *
 * @param title The title of the info box
 * @param value The value of the info box
 * @param icon The icon of the info box
 */
export function InfoBox({ title, content, icon }: InfoBoxProps) {
  const theme: Theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const newIcon = React.cloneElement(icon, {
    sx: {
      fontSize: "36px",
      marginBottom: "5px",
      color: colors.grey[100],
    },
    color: colors.grey[100],
  });

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      color="white"
      width="100%"
      height="100%"
      padding="10px"
    >
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontSize={24}
        sx={{
          marginBottom: "5px",
        }}
      >
        {title}
      </Typography>
      {content === undefined || content === null ? (
        <Skeleton variant="rectangular" width={54} height={35} />
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          padding="10px"
        >
          {content}
          {newIcon}
        </Box>
      )}
    </Box>
  );
}
