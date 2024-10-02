import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Box from '@mui/material/Box';



const SearchInput = () => {


    return (
        <div className="flex ">
        <Box className="flex items-center px-2 py-1" component="form">
            <InputBase
                className="flex-1 px-2 ml-1 text-white placeholder-white border border-white rounded hover:border-sky-500 focus:border-sky-500 reset-input"
                sx={{ color: 'white' }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search google maps' }}
                type="search"  
            />
            <IconButton  type="button"  aria-label="search">
                <SearchIcon className='text-white hover:text-sky-500'  />
            </IconButton>
            <Divider  sx={{ height: 28, m: 0.5 }} orientation="vertical" style={{ borderColor: 'white' }} />
            <IconButton color="primary" aria-label="directions">
                <DirectionsIcon className='text-white hover:text-sky-500' />
            </IconButton>
        </Box>
    </div>
    );
};

export default SearchInput;