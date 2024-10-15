import { AddClientFormData } from "@/utils/schemasTypes";
import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, UseControllerProps } from "react-hook-form";

interface ControlledFieldProps {
  controllerProps: UseControllerProps<AddClientFormData>,
  fieldProps: TextFieldProps & { children?: React.ReactNode[] }
}

// Компонент-обертка для Controller и TextField, предназначенный для инкапсуляции оформления и логики управления полями формы.
// Он принимает свойства `controllerProps` для настройки Controller из react-hook-form 
// и `fieldProps` для настройки TextField из Material-UI.

const ControlledField: FC<ControlledFieldProps> = ({ controllerProps, fieldProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <TextField
          {...field}
          {...fieldProps}
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
        >{fieldProps.children}</TextField>
      )}
    />
  );
}

export default ControlledField;