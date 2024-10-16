import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <h1 className="text-app">Home page</h1>
      <Button component={Link} to="/profile">Dashboard</Button>
    </Box>
  );
}

export default Home;