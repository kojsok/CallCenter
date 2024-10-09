import ClientsAddForm from "@/components/ClientsForm/ClientsAddForm";
import ClientsComponent from "@/store/howtouseit/ClientsComponent";
import { Box } from "@mui/material";

const Analytics = () => {
  return (
    <Box>
      <h1 className="text-app">Analytics page 111</h1>
      <ClientsComponent />
      <ClientsAddForm />
    </Box>
  );
}

export default Analytics;