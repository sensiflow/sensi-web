import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';

interface DropDownMenuProps{
  label: string,
  defaultValue?: string,
  values: string[],
  onValueChange: (value: string) => void
}

/**
 * Component for a dropdown menu with a label and a list of values
 * @param label - label of the dropdown menu
 * @param values - list of values
 * @param onValueChange - function to be called when a value is selected
 */
export function DropDownMenu({ label, defaultValue , values, onValueChange } : DropDownMenuProps){
  const [selectedValue, setSelectedValue] = React.useState( defaultValue || '')
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onValueChange(event.target.value);
  };


  return (
    <FormControl sx={{minWidth: 120, marginTop:"16px" }} error= {selectedValue == ''}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedValue}
          label={label}
          onChange={handleChange}
        >
          {values.map((it) => <MenuItem key={it} value={it}>{it}</MenuItem>)}
        </Select>
      </FormControl>
      )
}