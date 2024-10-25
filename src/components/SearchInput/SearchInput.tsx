import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Box from '@mui/material/Box';
import { Drawer, useMediaQuery } from '@mui/material';
import { useState } from 'react';



const SearchInput = () => {
	const matches = useMediaQuery('(min-width:600px)');
	const [searchState, setSearchState] = useState(false)
	const handleSearchOpen = () => {
		setSearchState(true)
	}
	const handleSearchClose = () => [
		setSearchState(false)
	]
	return (
		<Box sx={{ mr: 4 }}>
			<Drawer
				elevation={0}
				onClose={handleSearchClose}
				open={searchState}
				variant={matches ? 'permanent' : 'temporary'}
				anchor='right'
				sx={{
					backgroundColor: 'transparent',
					"& .MuiDrawer-paper": {
						width: '100vw',
						height: 'min-content',
						backgroundColor: 'var(--secondaryBg)'
					},
					...matches && {
						"& .MuiDrawer-paper": {
							position: 'relative',
							backgroundColor: 'var(--appBg)'
						}
					},
				}}
			>
				<Box className='flex items-center justify-end px-2 py-1 grow-1' component="form">
					<InputBase
						className="px-2 text-gray-800 transition duration-300 ease-in-out border-2 border-gray-300 rounded-lg shadow-md outline-none w-60 focus:border-sky-500 hover:border-sky-400 focus:ring-2 focus:ring-sky-500 hover:shadow-lg "
						sx={{ color: 'white' }}
						placeholder="Search"
						inputProps={{ 'aria-label': 'search google maps' }}
						type="search"
					/>
					<IconButton type="button" aria-label="search">
						<SearchIcon className='text-white hover:text-sky-500' />
					</IconButton>
					<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" style={{ borderColor: 'white' }} />
					<IconButton color="primary" aria-label="directions">
						<DirectionsIcon className='text-white hover:text-sky-500' />
					</IconButton>
				</Box>
			</Drawer>
			{!matches && <IconButton onClick={handleSearchOpen} type="button" aria-label="search">
				<SearchIcon className='text-white hover:text-sky-500' />
			</IconButton>}
		</Box>
	);
};

export default SearchInput;