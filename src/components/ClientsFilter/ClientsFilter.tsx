import { Box, Button, useMediaQuery } from "@mui/material";
import DesktopFilter from "./DesktopFilter";
import { FilterItem } from "@/Pages/Clients";
import { FC } from "react";
import MobileFilter from "./MobileFilter";

interface ClientsFilterProps {
  filterInner: FilterItem[]
}

const ClientsFilter: FC<ClientsFilterProps> = ({ filterInner }) => {
  const matches = useMediaQuery('(min-width:1200px)')
  return (
    <Box className="
       
      flex 
      gap-5 
      xs:col-span-2
      xs:flex-row 
      lg:flex-col 
      lg:row-start-1 
      lg:row-end-3 
      lg:col-span-1 
      lg:p-8 
      lg:border-r-2
      lg:border-primary-light">
      <Button
        variant="contained"
        sx={{
          textTransform: "capitalize", borderRadius: '10px', py: {
            xs: "5px", lg: "10px"
          }
        }}
        className="bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110">
        Add New Client
      </Button>
      {
        matches ? <DesktopFilter filterInner={filterInner} /> : <MobileFilter filterInner={filterInner} />
      }

    </Box>
  );
}

export default ClientsFilter;