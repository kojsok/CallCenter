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
          variant="outlined"
          margin="normal"
          fullWidth
        >{fieldProps.children}</TextField>
      )}
    />
  );
}

export default ControlledField;