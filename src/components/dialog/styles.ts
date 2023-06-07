import { Theme } from "@mui/material"

export const dialogSx = (theme: Theme) => { return {
    "& .MuiDialog-paper": {
      "backgroundColor": theme.palette.background.default,
      "borderRadius": "5px"
    }
}}