import ClientsFilter from "@/components/ClientsFilter/ClientsFilter";
import ClientList from "@/components/ClientsList/ClientList";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Box } from "@mui/material";

const Clients = () => {
  return (
    <Box className='p-8 flex grow gap-y-8 flex-col	'>
      <PageHeader title="Clients" descr='List Your Clients'></PageHeader>
      <Box className="flex rounded-2xl border-primary-light  border-2	grow">
        <ClientsFilter />
        <ClientList />
      </Box>
    </Box>
  );
}

export default Clients;