import { Box, Typography } from "@mui/material"
import LandingImage from '../assets/suport.svg'
import LayoutSecond from "@/Layouts/LayoutSecond";

const Home = () => {


  return (
    <LayoutSecond>
      <Box className="text-app py-12">
        <img src={LandingImage} className="float-right	w-[50%] ml-6 mb-6" />
        <Typography
          variant="h1"
          sx={{ fontWeight: 600, fontSize: 'clamp(1.25rem, 3.409vw + 0.568rem, 3.125rem)', mb: 8 }}
          className="bg-gradient-to-b from-primary-main to-[#bf47f3] clip-text"
        >
          Your Direct Line to Exceptional Service
        </Typography>
        <Typography variant="subtitle1" sx={{
          maxWidth: {
            md: "35%",
            color: 'var(--text-second)'
          }
        }}>
          Our in-house call center is dedicated to providing seamless support for all of our products and services. With a team that knows our brand inside and out, we ensure that every customer receives expert assistance and a personalized experience. We’re here to help, whenever you need us.
        </Typography>
      </Box>

    </LayoutSecond>
  );
}

export default Home;