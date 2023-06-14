import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { tokens } from "../../theme";

/**
 * Creates a list of items with the possibily to select an item
 * This component includes a skeleton loader when the list is empty
 *
 * @param backgroundColor the background color of the list
 * @param selectedColor the color of the selected item
 * @param hoverColor the color of the item when the mouse is over it
 * @param deviceCount the number of items to display
 * @param list the list of items to display
 * @param icon the icon to display on the right of each item
 * @param onItemClick the function to call when an item is clicked
 * @param onIconClick the function to call when the icon is clicked
 */
export function SelectedListItem({
  backgroundColor,
  selectedColor,
  hoverColor,
  isLoading = false,
  deviceCount = 10,
  list,
  icon = <InfoIcon />,
  onItemClick = (item) => {},
  onIconClick = (id) => {},
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (selectedIndex === index) return;
    setSelectedIndex(index);
    onItemClick(list[index]);
  };

  const skeletonList = Array.from(Array(deviceCount).keys()).map(
    (value, index) => (
      <ListItem
        key={index}
        sx={{
          padding: "3px",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={34}
          sx={{
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </ListItem>
    )
  );

  const listComponent =
    list?.length === 0 ? (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={"100%"}
        height={"100%"}
      >
        <Typography variant="h3" padding="8px" sx={{ color: colors.grey[400] }}>
          No devices
        </Typography>
      </Box>
    ) : (
      list?.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            secondaryAction={
              <IconButton
                onClick={onIconClick}
                edge="end"
                aria-label="comments"
              >
                {icon}
              </IconButton>
            }
            sx={{
              "&& .Mui-selected": {
                backgroundColor: selectedColor,
              },
              "&& .Mui-selected:hover": {
                backgroundColor: hoverColor,
              },
              padding: "3px",
            }}
            key={index}
            disablePadding
          >
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText
                primaryTypographyProps={{ fontSize: "13px" }}
                id={labelId}
                primary={`${value.name}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })
    );

  return (
    <List dense sx={{ width: "100%", bgcolor: backgroundColor }}>
      {isLoading ? skeletonList : listComponent}
    </List>
  );
}
