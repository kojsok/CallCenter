import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

interface ControlledFieldProps<T extends FieldValues> {
  controllerProps: UseControllerProps<T>;
  fieldProps: TextFieldProps & { children?: React.ReactNode };
}

// Компонент-обертка для Controller и TextField, предназначенный для инкапсуляции оформления и логики управления полями формы.
// Он принимает свойства `controllerProps` для настройки Controller из react-hook-form 
// и `fieldProps` для настройки TextField из Material-UI.

const ControlledField = <T extends FieldValues>(props: ControlledFieldProps<T>) => {
  const { controllerProps, fieldProps } = props
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <TextField
          {...field}
          variant='standard'
          // margin="normal"
          fullWidth
          slotProps={{
            input: {
              sx: {
                color: 'var(--textApp)',
                fontSize: '0.8rem',
                borderRadius: '5px',
                "&.Mui-focused": {
                  '&::after': {
                    borderColor: "var(--primary-main)"
                  }
                },
                '&:hover:not(.Mui-focused)': {
                  opacity: 0.8
                }
              }
            },
            htmlInput: {
              sx: {
                p: '10px 10px',
                backgroundColor: 'var(--secondaryBg05)'
              }
            },
            inputLabel: {
              shrink: true,
              sx: {
                "&.Mui-focused": {
                  color: "var(--primary-main)"
                },
                top: '-7px',
                fontSize: '1.2rem',
                color: "var(--text-second)"
              }
            },
            select: {
              sx: {
                color: 'var(--textApp)',
                "& .MuiSelect-icon": {
                  color: 'var(--light)'
                }
              },
              MenuProps: {
                sx: {
                  "& .MuiMenu-paper": {
                    backgroundColor: "var(--secondaryBg05)",
                    color: "var(--textApp)",
                    backdropFilter: 'blur(10px)',
                  }
                }
              }
            }
          }}
          {...fieldProps}
        >{fieldProps.children}</TextField>
      )}
    />
  );
}

export default ControlledField;