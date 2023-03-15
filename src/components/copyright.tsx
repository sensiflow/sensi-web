import * as React from "react";
import { Typography, Link } from "@mui/material";

//put docs link
export function Copyright(props: any) {
    return (
        <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" {...props}
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