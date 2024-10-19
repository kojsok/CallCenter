import { logoutThunk, selectProfile } from "@/store/authSlices/authSlice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Avatar, Typography, Tooltip, Menu, MenuItem, ListItemButton } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";


const ProfileMenu = () => {
  const dispatch = useDispatch<AppDispatch>()
  //проверяем если в url есть profile или dashboard чтобы исключить их из меню пользователя
  const location = useLocation()
  const isProfile = location.pathname.includes('profile');
  const isDashboard = location.pathname.includes('dashboard')

  const profile = useSelector(selectProfile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutThunk())
    handleClose()
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <Button
          disableFocusRipple
          disableRipple
          sx={{
            p: 0,
            gap: 1,
            textTransform: 'capitalize',
            color: 'var(--tetApp)',
            transition: 'color 0.4s ease',
            "&:hover, &:focus": {
              color: "var(--primary-main)"
            },
            "& .MuiButton-startIcon": {
              m: 0
            }
          }}
          startIcon={
            <Avatar alt={profile?.employee_data.name} src={profile?.employee_data.image} sx={{ width: '30px', height: '30px' }} />
          }
          onClick={handleClick}
        >
          <Typography variant="body2">{profile?.employee_data.name}</Typography>
        </Button>
      </Tooltip>
      <Menu
        variant="menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 45,
          horizontal: 'center',
        }}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "var(--secondaryBg05)",
            color: "var(--textApp)",
            backdropFilter: 'blur(10px)',
            minWidth: '150px'
          },
          "& .MuiMenuItem-divider": {
            borderColor: 'var(--primary-light)'
          }
        }}
      >
        <MenuItem divider onClick={handleClose} disableGutters sx={{ py: 0, ...isProfile && { display: 'none' } }}>
          <ListItemButton sx={{ "&:hover": { backgroundColor: 'var(--primary-main)' }, transition: 'background-color 0.4s ease', }} component={Link} to="/profile">
            Profile
          </ListItemButton>
        </MenuItem>
        <MenuItem divider onClick={handleClose} disableGutters sx={{ py: 0, ...isDashboard && { display: 'none' } }} >
          <ListItemButton sx={{ "&:hover": { backgroundColor: 'var(--primary-main)' }, transition: 'background-color 0.4s ease' }} component={Link} to="/dashboard/clients">
            Dashboard
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={handleLogout} disableGutters sx={{ py: 0 }}>
          <ListItemButton sx={{ "&:hover": { backgroundColor: 'var(--primary-main)' }, transition: 'background-color 0.4s ease' }} >
            Logout
          </ListItemButton>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ProfileMenu;