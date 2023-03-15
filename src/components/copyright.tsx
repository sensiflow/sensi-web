import * as React from "react";
import { Typography, Link, SxProps } from "@mui/material";

//put docs link
export function Copyright(props: SxProps) {
    return (
        <Typography 
            variant="body2" 
            sx = {{ color: "text.secondary", ...props}}
            align="center"
        >
            {'Copyright © '}
            <Link 
                color="inherit" 
                href="https://mui.com/"
            > 
                Sensi
            </Link>{' '}
                {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}