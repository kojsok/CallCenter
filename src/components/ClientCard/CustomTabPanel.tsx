import { Box } from "@mui/material";
import { FC } from "react";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const CustomTabPanel: FC<CustomTabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box className="flex flex-col gap-2 items-start" sx={{ px: 2, py: 5 }}>{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;