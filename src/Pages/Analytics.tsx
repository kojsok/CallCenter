import ClientsAddForm from "@/components/ClientsAddForm/ClientsAddForm";
import ClientsAddForm2 from "@/components/ClientsAddForm/ClientsAddForm2";
import SimpleForm from "@/components/ClientsAddForm/SimpleForm";
import ClientsComponent from "@/store/howtouseit/ClientsComponent";
import { Box } from "@mui/material";

const Analytics = () => {
  return (
    <Box>
      <h1 className="text-app">Analytics page 111</h1>
      <SimpleForm />
      {/* <ClientsAddForm /> */}
      {/* <ClientsAddForm2 /> */}
      <ClientsComponent />
    </Box>
  );
}

export default Analytics;