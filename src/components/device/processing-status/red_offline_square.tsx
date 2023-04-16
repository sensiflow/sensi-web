import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { tokens } from "../../../theme";


export default function RedOfflineSquare(){

    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'
    const redTone = isDarkMode ? 'red' : "#e53935"

    const squareStyle = {
        width: 12,
        height: 12,
        backgroundColor: redTone,
        boxShadow: '0 0 8px ' + redTone,
    }

    return <div style={squareStyle}></div>
}