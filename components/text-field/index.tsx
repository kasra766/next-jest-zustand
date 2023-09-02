"use client";
import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export function FormField<T extends FieldValues>(
  props: TextFieldProps & UseControllerProps<T>,
) {
  const {
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    ...textFieldProps
  } = props;
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue, shouldUnregister });
  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      value={value}
      name={name}
      {...textFieldProps}
      {...(error && { error: true, helperText: error.message })}
    />
  );
}
