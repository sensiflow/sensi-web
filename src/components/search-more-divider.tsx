import { Button, Divider, useTheme } from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DevicesGroup } from "../model/group"
import * as React from "react"
import { tokens } from "../theme";

interface DividerBtnProps {
    keyID: any
    text: string
    btnIcon: any
    dividerColor: string
    hideShowMoreButton: boolean
    onShowMore: () => void
}

export default function DividerBtn(
    {
        keyID,
        text,
        btnIcon,
        dividerColor,
        hideShowMoreButton: devicesIsEmpty,
        onShowMore
    }: DividerBtnProps
){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return (
        <Divider 
            key={keyID}
            children={
                !devicesIsEmpty ?
                    <Button 
                        onClick={onShowMore}
                        variant="text"
                        sx={{
                            "color":dividerColor,
                            "textTransform": "capitalize",
                            ":hover": {
                                "backgroundColor": colors.primary[400]
                            }
                    }}>
                        {text}
                        {btnIcon}
                    </Button> : null
            } 
            sx={{
                display: "flex",
                alignItems: "space-evenly",
                width: "100%", 
                marginTop: "20px"
            }}
        />
    )
}