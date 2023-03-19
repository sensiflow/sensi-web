import * as React from "react";
import { Typography, Link, SxProps } from "@mui/material";

/**
 * A component that displays the copyright text
 * TODO: change the link to the mkdocs.
 * @param props style to apply to the component
 */
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