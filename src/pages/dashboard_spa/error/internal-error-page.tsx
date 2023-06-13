import {ColorModeContext, tokens, useMode} from "../../../theme";
import {useNavigate} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {paths} from "../../../app-paths";
import * as React from "react";
import {AppButton} from "../../../components/buttons/app-button";

export function InternalErrorPage(){
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
                                500
                            </Typography>
                            <Typography style={ {fontSize: "2rem"} }
                                        variant="h5" component="h2" gutterBottom>
                                Internal Error
                            </Typography>
                            <Typography style={ {fontSize: "1rem"}}
                                        variant="body2" gutterBottom>
                                Something wrong occurred. Please be patient or try again later.
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