import ClientsForm from "@/components/ClientsAddForm/ClientsForm";
// import ClientsAddForm2 from "@/components/ClientsAddForm/ClientsAddForm2";
// import ClientsComponent from "@/store/howtouseit/ClientsComponent";
import { Box } from "@mui/material";

const Analytics = () => {
  return (
    <Box>
      <h1 className="text-app">Analytics page 111</h1>

      <ClientsForm />
      {/* <ClientsComponent /> */}
    </Box>
  );
}

export default Analytics;