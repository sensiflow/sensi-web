import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import * as React from "react";
import ReactPlayer from "react-player";
import { tokens } from "../../theme";
import ReplayIcon from '@mui/icons-material/Replay';
import {HLS_PORT, RTSP_PORT, RTSPS_PORT} from "../../constants";
import { Base64 } from  'js-base64';
import ReplayIcon from "@mui/icons-material/Replay";

export interface PlayerProps {
    url: string,
    user: string,
    password: string
}

//TODO: receber portos de rtsp e hls como variaveis de ambiente ou ir buscar a um ficheiro de configuracao / api
/**
 * The given url must be a valid RTSP link hosted on the server capable of converting RTSP to HLS
 * @param url RTSP link to convert to HLS
 */
export function RTSPLinkToHLS(url) {
    //check if url is valid
    if(url.includes("rtsps://"))
        return url.replace("rtsps://","https://").replace(`:${RTSPS_PORT}`,`:${HLS_PORT}`) + "/stream.m3u8"
    if(url.includes("rtsp://"))
        return url.replace("rtsp://","http://").replace(`:${RTSP_PORT}`,`:${HLS_PORT}`) + "/stream.m3u8"
}

const PLAYER_NETWORK_ERROR = "networkError";

/**
 * Creates a player that is reactive to the given url
 * Has a backdrop for when the video is loading
 * Has a retry button when the video fails to load, or when the video times out
 * 
 * @param props : url must be a valid hls link
 * @returns 
 */
export function Player(props: PlayerProps) {
    const theme: Theme = useTheme()
    const colors = tokens(theme.palette.mode);
    const playerRef = React.useRef<ReactPlayer | null>(null)

    const [videoBackDropOpen, setVideoBackDropOpen] = React.useState(true)
    const [hasTimedOut, setHasTimedOut] = React.useState(false)
    const [hasPaused, setHasPaused] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    //Used to reload player
    const [playerKey, setPlayerKey] = React.useState(1)
    
    const resetPlayer = () => {
        setPlayerKey(Math.random());
    }

    React.useEffect(() => {
        //Reset state
        setVideoBackDropOpen(true)
        setHasTimedOut(false)
        setHasPaused(false)
        
    }, [props.url,playerKey])

    const onError = (error,data,hl,hls) => {
        if(data) {  //TODO: serve error message
            if(data.fatal) {
                setErrorMessage(data.message)
            }

            if(data.type == PLAYER_NETWORK_ERROR) {
                setHasTimedOut(true)
            }
        }
    }


    const onReady = () => {
        setVideoBackDropOpen(false)
    }

    const onBuffer = () => {
        console.log('onBuffer')
    }

    const onBufferEnd = () => {
        console.log('onBufferEnd')
    }

    const onPlay = () => {
        if(!hasPaused) return
        const currRef = playerRef.current
        console.log("jumping")
        currRef.seekTo(currRef.getDuration() - 1, 'seconds')

        console.log('onPlay')
        setHasPaused(false)
    }

    const onPause = () => {
        setHasPaused(true)
        console.log('onPause')
    }

    const onStart = () => {
        console.log('onStart')
    }
    //TODO: para o relatorio por um diagrama como o do android, com os estados do player
    // e quando intervimos com o player (ex: quando se muda de pagina , ou quando este carrega pela primeira vez)

  const backDropCursor = hasTimedOut ? "pointer" : "default";

    return (
        <Box
            sx={{
                height: "100%",
                position: "relative",
                backgroundColor: colors.primary[400],
                width:640,
                zIndex: 0,
            }}
        >   
            {/* Backdrop for when video loading */}
            
            <Backdrop
                sx={{ 
                    position: "absolute",
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    cursor: backDropCursor,
                    }}
                onClick={() => {
                        if(hasTimedOut){
                            console.log("retrying")
                            console.log(playerKey)
                            resetPlayer()
                            console.log(playerKey)
                        }
                }}
                open={videoBackDropOpen == true}
            >
                {
                    hasTimedOut ?
                    <ReplayIcon
                        fontSize="large"
                        color="inherit" />
                    :
                    <CircularProgress color="inherit" />
                }
                
            </Backdrop>
        
            <ReactPlayer
                key={playerKey} //Used to reload player
                ref={(player) => {
                    playerRef.current = player
                }}
                width='100%'
                height='480px'
                playing = {true}
                onError={ (error,data,hl,hls) => {
                    onError(error,data,hl,hls)
                    }
                }
                onStart={onStart}
                onPlay={onPlay}
                onPause={onPause}
                onReady={onReady}

                onBuffer={onBuffer}
                onBufferEnd={onBufferEnd}

                volume = {0}
                url= {props.url}
                config={{
                    file: {
                        attributes: {
                            controlsList:
                                "nofullscreen nodownload noremoteplayback noplaybackrate",
                        },
                        forceHLS: true,
                        hlsOptions: {
                            debug: true,
                            xhrSetup: function (xhr, url) {
                                xhr.open("GET", url, true)
                                xhr.setRequestHeader(
                                    "Authorization",
                                    "Basic " + Base64.encode(props.user + ":" + props.password) //encodes to base64
                                );
                            }
                        }
                    }
                }}
            />
        </Box>
    )
}
