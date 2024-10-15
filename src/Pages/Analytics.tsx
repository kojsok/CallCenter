
import CallAnaliticsCardOne from "@/components/CallAnaliticsCardOne/CallAnaliticsCardOne";
import CallAnaliticsCardTwo from "@/components/CallAnaliticsCardTwo/CallAnaliticsCardTwo";
import CallAnalyticsCardThree from "@/components/CallAnalyticsCardThree/CallAnalyticsCardThree";


import { Box } from "@mui/material";

const Analytics = () => {
  return (
    <Box>
    <Box className="flex gap-5 p-5">
      {/* <h1 className="text-app">Analytics page 111</h1> */}
      {/* <ClientsComponent />
      <ClientsAddForm /> */}
      <CallAnaliticsCardOne />
      <CallAnaliticsCardTwo />
      <CallAnalyticsCardThree />
    </Box>
    {/* <CallsList /> */}
    </Box>
  );
}

export default Analytics;