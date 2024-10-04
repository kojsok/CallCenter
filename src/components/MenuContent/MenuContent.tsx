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
import { NavLink } from 'react-router-dom';

import { Divider } from '@mui/material';

const mainListItems = [
  {
    text: 'Home',
    path: '/',
    icon: <HomeRoundedIcon className='text-app' />
  },
  {
    text: 'Analytics',
    path: 'analytics',
    icon: <AnalyticsRoundedIcon className='text-app' />
  },
  {
    text: 'Clients',
    path: 'clients',
    icon: <PeopleRoundedIcon className='text-app' />
  },
  {
    text: 'Calls',
    path: 'calls',
    icon: <AssignmentRoundedIcon className='text-app' />
  },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon className='text-app' /> },
  { text: 'About', icon: <InfoRoundedIcon className='text-app' /> },
  { text: 'Feedback', icon: <HelpRoundedIcon className='text-app' /> },
];

export default function MenuContent() {
  return (
    <Stack className='p-1 min-h-screen justify-start bg-appBg w-60 border-r-2 border-transparent border-r-sky-600'>
      <List dense sx={{ mb: "40px" }}>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              component={NavLink}
              to={item.path}
              className="hover:border hover:rounded-lg hover:shadow-lg bg-gradient-to-r hover:from-primary-main hover:to-primary-dark"
              sx={{
                "&.active": {
                  backgroundColor: "#1455967d"
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className='text-app' primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider variant='middle' textAlign='center' sx={{ borderColor: 'var(--primary-light)', borderWidth: '1px' }} />
      <List dense >
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton className="hover:border hover:rounded-lg hover:shadow-lg bg-gradient-to-r hover:from-primary-main hover:to-primary-dark">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className='text-app' primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}