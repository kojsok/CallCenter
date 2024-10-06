import ClientsFilter from "@/components/ClientsFilter/ClientsFilter";
import ClientList from "@/components/ClientsList/ClientList";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Box, Container } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ClientCard from "@/components/ClientCard/ClientCard";

export interface FilterItem {
  textContent: string, icon: React.ReactNode, divider: boolean
}

const filterItemsList: FilterItem[] = [
  { textContent: 'All', icon: <MailOutlineIcon />, divider: false },
  { textContent: 'Frequent', icon: <ConnectWithoutContactIcon />, divider: false },
  { textContent: 'Starred', icon: <StarBorderPurple500Icon />, divider: true },
]

const Clients = () => {
  return (
    <Container>
      <Box className='py-8 flex grow gap-y-8 flex-col h-[calc(100vh-65px)]'>
        <PageHeader title="Clients" descr='List Your Clients'></PageHeader>
        <Box
          className="
          grid
          grid-rows-[7%_auto] 
          grow 
          xs:grid-cols-[min(100%,300px)_1fr] 
          xs:gap-4
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
            lg:p-8 
            lg:border-r-2
            lg:border-primary-light"
          >
            <ClientsFilter filterInner={filterItemsList} />
          </Box>
          <Box
            className="
            lg:row-span-2 
            lg:border-r-2 
            lg:border-primary-light"
          >
            <ClientList />
          </Box>
          <Box>
            <ClientCard />
          </Box>
        </Box>
      </Box>
    </Container>

  );
}

export default Clients;