import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import {useState} from "react";


const ITEM_HEIGHT = 48;

interface DropMenuProps {
    options: MenuOption[];
    icon: React.ReactNode;
}

export function ThreeDotMenu({
    options
}: { options: MenuOption[] }) {
  return (
    <DropMenu options={options} icon={<MoreVertIcon />} />
  );
}

export interface MenuOption {
    label: string;
    handler : () => void;
} 

export function DropMenu({
    options, icon
}: DropMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        if(selectedOption){
            selectedOption.handler()
            handleClose()
            setSelectedOption(null)
        }
    }, [selectedOption])

    return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={(e) => {
              e.preventDefault()
              setSelectedOption(option)
          }}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
);
}