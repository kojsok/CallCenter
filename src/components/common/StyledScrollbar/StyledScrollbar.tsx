import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface StyledScrollBarProps {
  children: ReactNode
}

const StyledScrollBar: FC<StyledScrollBarProps> = ({ children }) => {
  return (
    <Box sx={
      {
        overflow: 'auto',
        "&::-webkit-scrollbar-track": {
          backgroundColor: 'transparent',
          transition: "background-color 0.3s linear"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: 'transparent',
          transition: "background-color 0.3s linear"
        },
        "&:hover::-webkit-scrollbar-track": {
          borderRadius: '5px',
          backgroundColor: '#25366247'
        },
        "&:hover::-webkit-scrollbar-thumb": {
          borderRadius: '5px',
          backgroundColor: "var(--primary-light)",
          cursor: "grabbing",
        },
        "&::-webkit-scrollbar": {
          width: '6px'
        }
      }
    }>
      {children}
    </Box>
  );
}

export default StyledScrollBar;