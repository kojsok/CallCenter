import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";

const StyledCardLink: FC<ButtonProps> = ({ children, sx, ...other }) => {
  return (
    <Button

      color="inherit"
      LinkComponent={'a'}
      sx={{
        width: '100%',
        justifyContent: 'flex-start',
        textTransform: 'lowercase',
        borderBottom: '2px solid var(--primary-light)',
        borderRadius: 'unset',
        transition: 'border-color 0.4s ease, color 0.4s ease',
        ...sx
      }}
      className="hover:text-primary-main hover:border-primary-main"
      {...other}
    >
      {children}
    </Button>
  );
}

export default StyledCardLink;