import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchInput from '../SearchInput/SearchInput';


export default function SearchAppBar() {
  return (
    <Box className="bg-gradient-to-r from-[#000319] via-indigo-950 to-indigo-700" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='bg-[#000319] border-b-2 border-b-sky-500'>
          <IconButton className="text-white hover:text-sky-500"
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'block', sm: 'none' } }}
          >
            CALLCENTER
          </Typography>
          <SearchInput />
        </Toolbar>
      </AppBar>
    </Box>
  );
}