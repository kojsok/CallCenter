import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon className='text-white'/> },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon className='text-white'/> },
  { text: 'Clients', icon: <PeopleRoundedIcon className='text-white'/> },
  { text: 'Calls', icon: <AssignmentRoundedIcon className='text-white'/> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon className='text-white'/> },
  { text: 'About', icon: <InfoRoundedIcon className='text-white'/> },
  { text: 'Feedback', icon: <HelpRoundedIcon className='text-white'/> },
];

export default function MenuContent() {
  return (
   
    <Stack className='shrink-0 p-1 justify-between bg-[#1976d2] w-60 h-screen box-border shadow-lg border-2 border-gray-950'>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton  selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className='text-white' primary={item.text}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className='text-white' primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}