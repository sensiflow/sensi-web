import * as React from "react"
import { Box, Paper, useTheme } from "@mui/material"
import { Device } from "../../model/device"
import { tokens } from "../../theme"
import { useNavigate } from "react-router-dom"
import { paths } from "../../app-paths"
import DeviceProcessingStatus from "../device/processing-status/device-processing-status"

interface DeviceBoxProps {
    device: Device
    boxMetrics: {width: number, height: number}
    boxShadowColor: string
}

export default function DeviceBox(
    {
        device,
        boxMetrics,
        boxShadowColor
    }: DeviceBoxProps
){  
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const paperRef = React.useRef<HTMLDivElement>(null)

    const paper = 
    <Paper 
        key={device.id}
        ref={paperRef}
        elevation={3}
        children={
            <div style={{"display": "flex", "flexDirection": "column"}}>
                <div style={{
                    flex: "0 0 35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    padding: "0px 0.5rem"
                }}>
                    <DeviceProcessingStatus state={device.status}/>
                </div>
                <div style={{
                    flex: "1 1 120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}>
                    {device.name}
                </div>
            </div>
        }
        sx={{
            marginTop: "10px",
            marginRight: "10px",
            position: "relative",
            width: boxMetrics.width,
            height: boxMetrics.height,
            padding: "0px -5rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            "@keyframes expand": {
                from: {
                left: "0px",
                top: "0px"
                },
                to: {
                left: "10px",
                top: "-10px",
                }
            },
            "@keyframes contract": {
                from: {
                    left: "10px",
                    top: "-10px"
                },
                to: {
                    left: "0px",
                    top: "0px"
                }
            }
        }}
    />

    return (
        <Box
            onMouseEnter={(event) => {
                paperRef.current.style.cursor = "pointer"
                paperRef.current.style.animation = "expand 0.2s ease-out forwards"
                paperRef.current.style.boxShadow = `-5px 5px 0px 0px ${boxShadowColor}`
            }}
            onMouseLeave={(event) => {
                paperRef.current.style.animation = "contract 0.2s ease-out forwards"
                paperRef.current.style.boxShadow = "none"
            }}
            onClick={(event) => {
                navigate(paths.dashboard.devices + "/" + device.id);
            }}  
        >
            {paper}
        </Box>    
    )
}
