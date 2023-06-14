import * as React from "react";
import {ColorModeContext, tokens, useMode} from "../../../theme";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {paths} from "../../../app-paths";
import {AppButton} from "../../../components/buttons/app-button";

export function NotFoundPage(){
    const [theme, colorMode] = useMode();
    const navigate = useNavigate();
    const color= tokens(theme.palette.mode)
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className="content">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }} >
                            <Typography style={ {fontSize: "10rem"} }
                                        variant="h1" component="h2" gutterBottom>
                                404
                            </Typography>
                            <Typography style={ {fontSize: "2rem"} }
                                variant="h5" component="h2" gutterBottom>
                                Page not found
                            </Typography>
                            <Typography style={ {fontSize: "1rem"}}
                                variant="body2" gutterBottom>
                                The page you are looking for might have been removed had its name changed or is temporarily
                                unavailable.
                            </Typography>
                            <AppButton
                                text={"Home page"}
                                backgroundColor={color.buttonAccent.add.backgroundColor}
                                hoverColor={color.buttonAccent.add.hoverColor}
                                onClick={() => navigate(paths.dashboard.home) }
                            />
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}