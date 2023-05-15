import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface FormInputTextProps {
  name: string;
  label: string;
  required?: boolean;
  password?: boolean;
  sx?: object;
}

const FormInputText = ({ name, label, required, sx }: FormInputTextProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState: { touchedFields, dirtyFields, errors },
      }) => (
        <TextField
          fullWidth
          name={name}
          required={required}
          variant="filled"
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={invalid}
          helperText={error ? error.message : null}
          sx={sx}
        />
      )}
    />
  );
};

export default FormInputText;
