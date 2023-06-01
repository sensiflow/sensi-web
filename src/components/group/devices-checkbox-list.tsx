import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Checkbox, useTheme } from '@mui/material';
import { debounce } from 'lodash';

import { tokens } from '../../theme';
import { Device } from '../../model/device';
import { constants } from '../../constants';
import { DeviceInformation } from '../../pages/dashboard_spa/group';


interface DevicesCheckboxListProps {
  devices: Array<DeviceInformation>;
  groupID: number;
  isLoadingDevices: boolean;
  resetScrollToTop: boolean;
  handleSelectedDevices: boolean;
  onScrollReset: () => void;
  loadMoreDevices: () => void;
  selectedDevicesHandler: (selectedDevices: Array<Device>) => void;
}

export default function DevicesCheckboxList(
  { 
    devices,
    groupID,
    isLoadingDevices,
    resetScrollToTop,
    handleSelectedDevices,
    onScrollReset,
    loadMoreDevices,
    selectedDevicesHandler
  }: DevicesCheckboxListProps 
){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [checked, setChecked] = React.useState<Array<Device>>([]);
  const elementEvent = React.useRef(null)

  const getCheckedDeviceIndex = (device: Device) => {
    return checked.findIndex((checkedDevice)=> device.id === checkedDevice.id)
  }

  const handleToggle = (value: Device) => () => {
    const currentIndex = getCheckedDeviceIndex(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  //Set an event listener on the checkbox list to detect when the scroll reaches the bottom in order to load more devices.
  React.useEffect(() => {
    const handleScroll = debounce(event => {
        const isBottom = elementEvent.current?.clientHeight + event.target.scrollTop + 1 >= event.target.scrollHeight;
        if(!isLoadingDevices && isBottom){
          loadMoreDevices()
        }
    }, constants.devicesCheckBoxList.scrollDebounceTime)
    
    elementEvent.current?.addEventListener('scroll', handleScroll, true);

    return () => {
       elementEvent.current?.removeEventListener('scroll', handleScroll);
    }
  }, [])

  //Resets the page to the top when the condition is met
  React.useEffect(() => {
    if(elementEvent.current && resetScrollToTop){
      elementEvent.current.scrollTop = 0
      onScrollReset()
    }
  }, [resetScrollToTop])

  // Handles the selected devices when the condition is met
  React.useEffect(() => {
    if(handleSelectedDevices){
      selectedDevicesHandler(checked)
    }
  }, [handleSelectedDevices])

  return (
    <List
      ref={elementEvent}
      sx={{
        width: '100%',
        maxWidth: constants.devicesCheckBoxList.maxWidth,
        minWidth: constants.devicesCheckBoxList.minWidth,
        bgcolor: '#2f3748',
        position: 'relative',
        overflow: 'auto',
        maxHeight: constants.devicesCheckBoxList.maxHeight,
        minHeight: constants.devicesCheckBoxList.minHeight,
        "&::-webkit-scrollbar": {
          width: '0' //Hide scrollbar
        }
      }}
    >
      {devices.map((item) => (
          <ListItem 
            key={`item-${item.device.name}`}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(item.device)}
                checked={getCheckedDeviceIndex(item.device) !== -1}
                disabled={item.groupsID.includes(groupID)}
                inputProps={{ 'aria-labelledby':  `checkbox-list-secondary-label-${item.device.name}` }}
              />
            }
            sx={{
              "& .MuiCheckbox-root.Mui-checked": {
                color: colors.greenAccent[500],
              },
            }}
          >
            <ListItemText 
              primary={item.device.name}
              sx={{
                marginRight: '250px'
              }}
            />
          </ListItem>
        ))}
    </List>
  );
}

