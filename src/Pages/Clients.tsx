import ClientsFilter from "@/components/ClientsFilter/ClientsFilter";
import ClientList from "@/components/ClientsList/ClientList";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Box, Container } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
// import ClientCard from "@/components/ClientCard/ClientCard";
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import { useDispatch } from "react-redux";
import { setFilters } from "@/store/clientsSlices/clientsSlice";
import { ClientStatus } from "@/utils/schemasTypes";
import ClientViewContainer from "@/components/ClientViewContainer/ClientViewContainer";

export interface FilterItem {
  textContent: string, icon: React.ReactNode, divider: boolean, onClick: () => void
}

const Clients = () => {
  const dispatch = useDispatch()

  //обработчик фильтра (использовано карриование)
  const handleClick = (status?: ClientStatus) => () => dispatch(setFilters(status ? { status } : {}))

  //внесла этот массив внутрь компонента, чтобы можно было добавить обработчик клика на каждую кнопку фильтра
  const filterItemsList: FilterItem[] = [
    { textContent: 'All', icon: <MailOutlineIcon fontSize="small" />, divider: false, onClick: handleClick() },
    { textContent: 'Starred', icon: <StarBorderPurple500Icon fontSize="small" />, divider: false, onClick: handleClick('VIP') },
    { textContent: 'Active', icon: <WhatshotOutlinedIcon fontSize="small" />, divider: false, onClick: handleClick('active') },
    { textContent: 'Inactive', icon: <DoNotDisturbOnOutlinedIcon fontSize="small" />, divider: false, onClick: handleClick('inactive') },
    { textContent: 'Particular', icon: <PriorityHighOutlinedIcon fontSize="small" />, divider: true, onClick: handleClick('problematic') },
  ]
  return (
    <Container>
      <Box className='py-8 flex grow gap-y-8 flex-col h-[110vh]'>
        <PageHeader title="Clients" descr='List Your Clients'></PageHeader>
        <Box
          className="
          overflow-hidden
          grid
          grow 
          xs:grid-rows-[38px_calc(100%-54px)]
          xs:grid-cols-[min(100%,300px)_1fr] 
          xs:gap-4
          lg:grid-rows-[38px_calc(100%-38px)] 
          lg:grid-cols-[minmax(240px,20%)_minmax(320px,30%)_1fr]
          lg:gap-0
          lg:rounded-2xl
          lg:border-primary-light  
          lg:border-2"
        >
          <Box
            className="
            flex 
            gap-5 
            xs:col-span-2
            xs:flex-row 
            lg:flex-col 
            lg:row-start-1 
            lg:row-end-3 
            lg:col-span-1 
            lg:p-6 
            lg:border-r-2
            lg:border-primary-light"
          >
            <ClientsFilter filterInner={filterItemsList} />
          </Box>
          <Box
            className="
            xs:col-span-2
            md:col-span-1
            lg:p-6
            lg:row-span-2 
            lg:border-r-2 
            lg:border-primary-light"
          >
            <ClientList />
          </Box>
          <Box className="lg:p-6 lg:row-span-2">
            <ClientViewContainer />
          </Box>
        </Box>
      </Box>
    </Container>

  );
}

export default Clients;