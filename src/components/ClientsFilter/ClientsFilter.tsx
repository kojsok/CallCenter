import { Box, Button, Divider, List } from "@mui/material";
import FilterBtn from "./FilterBtn";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const ClientsFilter = () => {
  return (
    <Box className="w-[20%] border-r-2 border-primary-light flex flex-col gap-y-5 p-8">
      <Button
        variant="contained"
        sx={{ textTransform: "capitalize" }}
        className="bg-gradient-to-r from-primary-main to-primary-dark hover:brightness-110">
        Add New Client
      </Button>
      <List className="text-app">
        <FilterBtn
          textContent="All"
          SvgIcon={<MailOutlineIcon />}
          selected={true}
        />
        <FilterBtn
          textContent="Frequent"
          SvgIcon={<ConnectWithoutContactIcon />}
          selected={false}
        />
        <FilterBtn
          textContent="Starred"
          SvgIcon={<StarBorderPurple500Icon />}
          selected={false}
        />
      </List>
      <Divider variant='fullWidth' sx={{ borderColor: '#1455967d' }} />
    </Box>
  );
}

export default ClientsFilter;