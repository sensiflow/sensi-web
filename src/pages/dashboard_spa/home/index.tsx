import {  Box } from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import { tokens } from "../../../theme";
import Typography from '@mui/material/Typography';
import * as React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import { InfoBox } from "../../../components/dashboard/info-box";
import { LineChart } from "../../../components/charts/line-chart";
import { Grid, GridItem } from "../../../components/grid";
import PeopleIcon from '@mui/icons-material/People';
import { SelectedListItem } from "../../../components/lists/selected-list-item";
import { Player, RTSPLinkToHLS } from "../../../components/player/player";
import {MEDIA_READ_PASSWORD, MEDIA_READ_USER, MEDIA_SERVER_SECURE} from "../../../constants";


//Temporary memory data
let base = +new Date(2000, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];

let data = [Math.round(Math.random() * 20)];

for (let i = 1; i < 200; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round(Math.random() * 20  ));
}


function getDevices(){

    return [
        {
            id: "1",
            name: "Device 1",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "rtsp://user:user@192.168.1.185:8554/webcam",
        },  
        {
            id: "2",
            name: "livingRoom camera",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
        },
        {
            id: "3",
            name: "Test Device 3",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "http://freja.hiof.no:1935/rtplive/_definst_/hessdalen03.stream/playlist.m3u8",
        },
        {
            id: "4",
            name: "Movie",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
        },
        {
            id: "2",
            name: "Second movie",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
        },
        {
            id: "3",
            name: "testDevice 6",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "rtsp://teste/teste",
        },
        {
            id: "4",
            name: "testDevice 7",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "rtsp://teste/teste",
        },
        {
            id: "2",
            name: "testDevice 8",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "rtsp://teste/teste",
        },
        {
            id: "3",
            name: "testDevice 9",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "rtsp://teste/teste",
        },
        {
            id: "2",
            name: "testDevice 10",
            description : "This is a device",
            status: "ONLINE",
            streamUrl : "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
        },
    ]       
}

const useStyles = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    return {
        gridItem :{
            bgcolor: colors.primary[400],
            borderRadius: "5px",
            boxShadow: "0px 0px 0px 4px" + colors.primary[600],
        }
    }
}



export default function DashboardHome(){
    const theme: Theme = useTheme()
    
    const colors = tokens(theme.palette.mode);
    const classes = useStyles(theme)

    const [deviceCount, setDeviceCount] = React.useState(null)
    const [selectedVideoURL, setVideoURL] = React.useState("")
    const [userCount, setUserCount] = React.useState(null)
    const [deviceList, setDeviceList] = React.useState([])

    const handleListItemClick = (item) => {
          const streamUrl = RTSPLinkToHLS(item.streamUrl)
          setVideoURL(streamUrl)
      };

    React.useEffect( () => {
        //get fake devices
        setTimeout(function() {
            const devices = getDevices() // get the top 10 devices
            setDeviceList(devices)
            setDeviceCount(40)
            setUserCount(4)
            const streamUrl = RTSPLinkToHLS(devices[0].streamUrl)
            setVideoURL(streamUrl)
        }, 4000);
        
    }, [])

    return (
        <Grid
            gap="12px"
            sx={{
                padding: "5px",
                borderRadius: "10px",
            }}
        >

            <GridItem
                column= {"span 6"}
                row={"span 20"}
                sx={classes.gridItem}
            >
                <Box 
                    height="100%"
                    display="flex"
                    justifyContent="center"
                >
                    <Player 
                        url={selectedVideoURL}
                        user={MEDIA_READ_USER}
                        password={MEDIA_READ_PASSWORD}
                    />
                </Box>
            </GridItem>



            <GridItem
                column= {"span 3"}
                row={"span 20"}
                sx={classes.gridItem}
            >
                <Box 
                    display="flex"
                    justifyContent="center"
                >
                    <Typography
                        variant="h3"
                        padding="8px"
                        sx={{color: colors.grey[400]}}
                    >
                        Top 10 Devices
                    </Typography>
                </Box>  

                
                <SelectedListItem
                    backgroundColor={colors.primary[400]}
                    selectedColor={colors.grey[400]}
                    hoverColor={colors.grey[500]}
                    deviceCount={10}
                    list={deviceList}
                    onItemClick = {(device) => {
                        handleListItemClick(device)
                    }}

                    onIconClick={() => console.log("icon clicked")}
                />
        
            </GridItem>

            <GridItem
                column= {"span 3"}
                row={"span 4"}
                sx={classes.gridItem}
            >
                <InfoBox title="Devices:" value={deviceCount} icon={<VideocamIcon/>}/>                
            </GridItem>
            
            <GridItem
                column= {"span 3"}
                row={"span 4"}
                sx={classes.gridItem}
            >
                <InfoBox title="Current People Detected:" value={userCount} icon={<PeopleIcon/>}/>                   
            </GridItem>

            <GridItem
                column= {"span 9"}
                row={"span 27"}
                sx={{
                    bgcolor: colors.primary[400],
                    borderRadius: "5px",
                    boxShadow: "0px 0px 0px 5px" + colors.primary[600],
                }}
            >
                <LineChart
                    xdata={date}
                    ydata={data}
                    chartName="People over time"
                    dataName="Data"
                    EChartsProps={{
                        style: { height: '100%', width: '100%', borderRadius: '5px' },
                        theme : theme.palette.mode
                    }}
                />
            </GridItem>

            
        </Grid>



        
    )
}
