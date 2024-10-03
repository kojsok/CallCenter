import SearchAppBar from "@/components/SearchAppBar/SearchAppBar";
import SideMenu from "@/components/SideMenu/SideMenu";
import { Box } from "@mui/material";
import { Outlet } from "react-router";

const LayoutMain = () => {
  return (
    <>
      <SearchAppBar />
      <Box className="flex">
        <SideMenu />
        <Outlet />
      </Box>

    </>
  );
}

export default LayoutMain;