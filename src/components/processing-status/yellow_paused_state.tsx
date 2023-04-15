import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { tokens } from '../../theme';

// Component for the PAUSED state
export default function YellowPausedRectangles(){

  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const isDarkMode = theme.palette.mode === 'dark';

  const yellowColor = isDarkMode ? 'yellow' : '#fdd835'

  const flexContainerStyle = {
    width: 12,
    height: 12,
    display: 'flex',
    justifyContent: 'space-between',
  };

  const innerRectangleStyle = {
    width: '25%',
    height: 'inherit',
    backgroundColor: yellowColor, // Yellow background color for PAUSED state
    boxShadow: '0 0 8px ' + yellowColor, // Same box shadow as the green circle
  };

  return (
    <div style={flexContainerStyle}>
      <div style={innerRectangleStyle} />
      <div style={innerRectangleStyle} />
    </div>
  );
};