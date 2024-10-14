import { Button, useMediaQuery } from "@mui/material";
import DesktopFilter from "./DesktopFilter";
import { FilterItem } from "@/Pages/Clients";
import { FC } from "react";
import MobileFilter from "./MobileFilter";
import { useDispatch } from "react-redux";
import { setActiveComponent } from "@/store/clientsSlices/switcherSlice";

interface ClientsFilterProps {
  filterInner: FilterItem[]
}

const ClientsFilter: FC<ClientsFilterProps> = ({ filterInner }) => {
  const matches = useMediaQuery('(min-width:1200px)')
  const dispatch = useDispatch()

  //вызываем форму создания клиента. 3-му блоку назначается состояние 'add-form'
  const handleClick = () => {
    dispatch(setActiveComponent('add-form'))
  }
  return (
    <>
      <Button
        onClick={handleClick}
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

    </>
  );
}

export default ClientsFilter;