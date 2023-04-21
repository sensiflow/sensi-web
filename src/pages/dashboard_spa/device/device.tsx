import * as React from "react";
import { useLocation } from "react-router-dom";
import { getDevice } from "../../../api/fake/fake-api";
import { DeviceOutputDTO } from "../../../api/dto/output/device-output";
import { CircularProgress } from "@mui/material";
import { params } from "../../../app-paths";

export default function DevicePage() {
    const {state} = useLocation();
    const { [params.device]: id } = state;
    const validatedDeviceID = parseInt(id);

    const [device, setDevice] = React.useState<DeviceOutputDTO>(null)

    const getDeviceInformation = async () => {
        const device = await getDevice(validatedDeviceID)
        setDevice(device)
    }

    React.useEffect(() => {
        getDeviceInformation()
    }, [device])

    return(
        <div>
            {
                device === null ? <CircularProgress color="success"/> : <div>
                    <div> 
                        Device: 
                    </div>
                    <div>
                        Name: {device.name}
                    </div>
                    <div>
                        Description: {device.description}
                    </div>
                    <div>
                        Device URL: {device.streamUrl}
                    </div>
                </div>
            }
        </div>
    )
}