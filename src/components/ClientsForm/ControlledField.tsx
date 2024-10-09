import { AddClientFormData } from "@/utils/clientsZodSchema";
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
                boxShadow: ' inset 1px 1px 3px 1px rgba(0,0,0,0.75)',
                color: 'var(--textApp)',
                fontSize: '0.8rem',
                "&.Mui-focused, &:hover:not(.Mui-focused)": {
                  '&::after': {
                    borderWidth: '2px',
                    borderColor: "var(--primary-main)"
                  }
                },

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