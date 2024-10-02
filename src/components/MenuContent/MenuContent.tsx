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
    <Stack className='p-1 min-h-screen gap-y-32 justify-start bg-[primary-color] w-60 border-r-2 border-transparent border-r-sky-600'>
      <List  dense>
        {mainListItems.map((item, index) => (
          <ListItem  key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton className='hover:border hover:rounded-lg hover:shadow-lg bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500' selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className='text-white' primary={item.text}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton className='hover:border hover:rounded-lg hover:shadow-lg bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500'>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className='text-white' primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}