import ClientsAddForm from "@/components/ClientsAddForm/SimpleForm";
import ClientsComponent from "@/store/howtouseit/ClientsComponent";
import { Box } from "@mui/material";

const Analytics = () => {
  return (
    <Box>
      <h1 className="text-app">Analytics page 111</h1>

      <ClientsAddForm />
      <ClientsComponent />
    </Box>
  );
}

export default Analytics;