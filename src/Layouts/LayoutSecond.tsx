import HomeAppBar from "@/components/AppBar/HomeAppBar";
import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

interface LayoutSecondProps {
  children: ReactNode
}
const LayoutSecond: FC<LayoutSecondProps> = ({ children }) => {
  return (
    <Box className="h-[100vh] min-h-[500px] overflow-hidden ">
      <HomeAppBar />
      <Box component={'main'} className="bg-pattern h-full">
        <Container maxWidth='lg'>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default LayoutSecond;