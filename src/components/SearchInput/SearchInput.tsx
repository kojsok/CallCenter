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
                // className="flex-1 px-2 ml-1 text-white placeholder-white border border-white rounded hover:border-sky-500 focus:border-sky-500 reset-input"
                className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-300 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg"
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