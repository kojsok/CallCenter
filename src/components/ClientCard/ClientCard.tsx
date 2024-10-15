import { Avatar, Box, Card, CardHeader, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, SvgIcon, Tab, Tabs, Typography } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StyledScrollBar from "../common/StyledScrollbar/StyledScrollbar";
import { useClientCard } from "./useClientCard";
import { useState } from "react";
import CustomTabPanel from "./CustomTabPanel";
import StyledCardLink from "./StyledCardLink";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { v4 as uuidv4 } from 'uuid';

const ClientCard = () => {
  const { clientData, handleDelete, handleEdit } = useClientCard()
  //tabs controls
  const [tabValue, setTabValue] = useState(0)

  const fullName = `${clientData?.firstName} ${clientData?.lastName}`;
  const clientSince = clientData ? new Date(clientData?.createdAt).getFullYear() : null;
  const pureTel = clientData?.contacts.phone.replace(/[+-]/g, '')
  const notes = clientData?.notes.map(note => ({ id: uuidv4().slice(0, 4), value: note })) || []
  const lastInteractionStr = clientData ? new Date(clientData?.lastInteractionDate).toLocaleDateString() : ''

  const handleTabsChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  return (
    <Box className="flex flex-col overflow-hidden h-full md:rounded-2xl md:border-2 md:border-primary-light md:p-4 lg:rounded-none lg:border-transparent lg:p-0">
      <StyledScrollBar>
        <Typography variant="h4" gutterBottom sx={{ mb: '20px', fontSize: "1.5rem", color: "var(--textApp)" }}>
          Client Details
        </Typography>
        <Divider sx={{ borderColor: 'var(--primary-light)', borderWidth: '1px' }} />
        <Card sx={{
          color: "var(--textApp)",
          backgroundColor: 'transparent',
          '& .MuiCardHeader-avatar': {
            mr: 4
          }
        }}>
          <CardHeader
            avatar={
              <Avatar alt={`${fullName} avatar`} src={`${clientData?.image}`} sx={{
                '&': {
                  width: '65px',
                  height: '65px'
                }
              }} />
            }
            action={
              <Box className="self-center">
                <IconButton color="inherit" aria-label="settings" onClick={handleEdit}>
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="settings" onClick={handleDelete}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            }
            title={
              <Typography variant="h6" sx={{ mb: 1 }}>{fullName}</Typography>
            }
            subheader={
              <>
                <Typography variant="body2" >{`${clientData?.age} years old, ${clientData?.gender}`}</Typography>
                <Typography variant="body2">{`Client since ${clientSince}, ${clientData?.status}`}</Typography>
              </>

            }
            sx={{
              "& .MuiCardHeader-subheader": {
                color: "var(--text-second)",
                fontSize: '0.85rem'
              },
              p: 0,
              py: 4
            }}
          />
          <Tabs value={tabValue} onChange={handleTabsChange} variant="fullWidth" sx={{
            "& .MuiTab-root": {
              color: 'var(--textApp)'
            },
            "& .MuiTabs-indicator": {
              backgroundColor: 'var(--primary-main)'
            },
            "& .MuiTab-root.Mui-selected": {
              color: 'var(--primary-main)'
            },
            borderBottom: '1px solid var(--light-grey)'
          }}>
            <Tab label="Contacts" />
            <Tab label="Activity" />
            <Tab label="Notes" />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0}>
            <StyledCardLink
              href={`tel:${pureTel}`}
              startIcon={<CallIcon sx={{ mr: 2 }} />}
            >
              {clientData?.contacts.phone}
            </StyledCardLink>
            <StyledCardLink
              href={`mailto:${clientData?.contacts.email}`}
              startIcon={<EmailIcon sx={{ mr: 2 }} />}
            >
              {clientData?.contacts.email}
            </StyledCardLink>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <Typography>
              Last interaction: {`${lastInteractionStr}`}
            </Typography>
            (Customer interaction data coming soon...)
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <List sx={{ p: 0 }}>
              {notes.map(note => (
                <ListItem key={note.id} divider sx={{ p: 0, py: 2, "&.MuiListItem-divider": { borderColor: 'var(--primary-light)', alignItems: 'flex-start' } }}>
                  <ListItemIcon sx={{ translate: '0 10px', minWidth: '40px' }} >
                    <SvgIcon viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: 'var(--primary-main)', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: 'var(--primary-dark)', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <CheckCircleIcon sx={{ fill: "url(#gradient1)" }} />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText>
                    {note.value}
                  </ListItemText>
                </ListItem>))}
            </List>
          </CustomTabPanel>
        </Card>
      </StyledScrollBar>
    </Box>
  );
}

export default ClientCard;
