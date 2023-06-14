import { Button } from "@mui/material"
import * as React from "react"

interface AddButtonProps{
    text: string,
    backgroundColor: string,
    hoverColor: string,
    onClick: () => void
}

export function AppButton(
    {   
        text,
        backgroundColor,
        hoverColor,
        onClick
    }: AddButtonProps
){
    return (
        <Button
            variant="contained"
            sx={{
              margin: "10px",
              width: "150px",
              height: "60px",
              color: "white",
              "fontSize": "15px",
              backgroundColor: backgroundColor,
              ":hover": {
                backgroundColor: hoverColor,
              },
              "boxShadow": "0px 8px 15px " + hoverColor,
              "textTransform": "capitalize"
            }}
            onClick={onClick}
          >
            {text}
          </Button>
    )
}

