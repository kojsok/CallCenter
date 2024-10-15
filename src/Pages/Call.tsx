import CallsList from "@/components/CallsList/CallsList";
import { Box } from "@mui/material";

const Calls = () => {
  return (
    <Box>
      <h1 className="text-app">Calls page</h1>
      <CallsList />
    </Box>
  );
}

export default Calls;