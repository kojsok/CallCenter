import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";


const Loader = () => {


  return (
    <Box className="flex items-center justify-center min-h-screen">
        <CircularProgress size="80px" />
    </Box>
    
  );
};

export default Loader;