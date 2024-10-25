import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchInput from '../SearchInput/SearchInput';
import ProfileMenu from '../ProfileMenu/ProfileMenu';


export default function SearchAppBar() {

  return (
    <Box className="bg-gradient-to-r from-appBg via-indigo-950 to-indigo-700" sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='relative'>
        <Toolbar className='bg-appBg border-b-2 border-b-primary-main ' sx={{ width: '100%' }}>
          <IconButton className="text-white hover:text-primary-main"
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, ml: 2, display: { xs: 'none', md: 'inline-block', sm: 'none' } }}
          >
            CALLCENTER
          </Typography>
          <SearchInput />
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}