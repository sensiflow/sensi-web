import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordTextFieldProps {
  label: string,
  constraints: UseFormRegisterReturn,
  error: boolean,
  helperText: any
}
  
/**
 * Component that renders a password text field with a toggle button to show the password
 */
export function PasswordTextField(
  {
    label,
    constraints,
    error,
    helperText
  } : PasswordTextFieldProps){

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (

    <TextField
      required
      label={label}
      fullWidth
      InputProps={{ 
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      type={showPassword ? "text" : "password"}
      margin="normal"
      {...constraints}
      error={error}
      helperText={helperText}
      color='secondary'
    />
  )
}