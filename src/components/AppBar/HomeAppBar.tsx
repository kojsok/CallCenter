import { AppBar, Container, Typography, Button } from "@mui/material";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { selectIsAuthorized } from "@/store/authSlices/authSlice";
import { useSelector } from "react-redux";

const HomeAppBar = () => {
  const isAuthorized = useSelector(selectIsAuthorized);
  return (
    <AppBar position="static" className="py-4" sx={{ backgroundColor: 'transparent', borderBottom: '2px solid var(--primary-main)' }}>
      <Container maxWidth='lg' className="flex justify-between items-center">
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontSize: 'clamp(0.875rem, 0.682vw + 0.739rem, 1.25rem)' }}
        >
          CALLCENTER
        </Typography>
        {
          isAuthorized && <ProfileMenu />
          || <Button
            variant="outlined"
            sx={{ color: "var(--primary-main)" }}
          >
            Sign in
          </Button>
        }
      </Container>
    </AppBar>
  );
}

export default HomeAppBar;