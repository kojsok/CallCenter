
import CallAnaliticsCardOne from "@/components/CallAnaliticsCardOne/CallAnaliticsCardOne";
import CallAnaliticsCardTwo from "@/components/CallAnaliticsCardTwo/CallAnaliticsCardTwo";
import CallAnalyticsCardThree from "@/components/CallAnalyticsCardThree/CallAnalyticsCardThree";
import CallChartAnalitics from "@/components/CallChartAnalitics/CallChartAnalitics";
import PageHeader from "@/components/PageHeader/PageHeader";


import { Box } from "@mui/material";

const Analytics = () => {
  return (
    <Box className="flex flex-col gap-5 ">
      <Box className="p-5">
        <PageHeader title="Analytics" descr="Analytics calls" />
      </Box>
      <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row' }}} className="gap-5 p-5"> 
        <CallAnaliticsCardOne />
        <CallAnaliticsCardTwo />
        <CallAnalyticsCardThree />
      </Box>
      <Box className="p-5">
        <CallChartAnalitics />
      </Box>
      
    </Box>    
  );
}

export default Analytics;