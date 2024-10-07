import { Avatar, Box, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
//temp
import { clients } from "./clients";
import StyledScrollBar from "../common/StyledScrollbar/StyledScrollbar";

const ClientList = () => {
  return (
    <Box className="flex h-full flex-col gap-5 rounded-2xl xs:border-2 xs:border-primary-light xs:p-4 lg:border-transparent lg:p-0">
      <TextField
        id="clientSearch"
        name="clientSearch"
        placeholder="Search Clients"
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <PersonSearchIcon fontSize="small" sx={{ color: 'var(--light)' }} />
              </InputAdornment>
            ),
            sx: {
              color: 'var(--textApp)',
              fontSize: '0.8rem',
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--light)",
              },
              "&.Mui-focused, &:hover:not(.Mui-focused)": {
                '.MuiOutlinedInput-notchedOutline': {
                  borderWidth: '2px',
                  borderColor: "var(--primary-main)"
                }
              },

            }
          },
          htmlInput: {
            sx: {
              py: '7px',
            }
          }
        }}
      />
      <StyledScrollBar>
        <List>
          {clients.map((client, index) => {
            const clientFullName = `${client.firstName} ${client.lastName}`
            const isNotLastEl = index !== clients.length - 1;
            const isStarred = client.status === 'VIP' || client.status === 'active'
            return (
              <ListItem
                key={client.id}
                sx={{ color: "var(--textApp)", "&.MuiListItem-divider": { borderColor: "var(--primary-light)" } }}
                divider={isNotLastEl}
              >
                <ListItemAvatar>
                  <Avatar alt={`${clientFullName} avatar`} src={`${client.image}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">
                      {clientFullName}
                    </Typography>
                  }
                  secondary={client.status}
                  sx={{
                    "& .MuiListItemText-secondary": {
                      color: 'var(--text-second)',
                      textTransform: client.status !== 'VIP' ? 'capitalize' : 'uppercase',
                      fontSize: '0.7rem'
                    }
                  }}
                />
                <StarTwoToneIcon {...isStarred && { color: 'primary' }} sx={{ '&.MuiSvgIcon-colorPrimary': { color: 'yellow' } }} fontSize="small" />
                <IconButton edge="end" aria-label="delete" sx={{
                  color: 'var(--light)',
                  transition: 'color 0.3s linear',
                  "&:hover": {
                    color: 'var(--primary-main)'
                  }
                }}>
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      </StyledScrollBar>

    </Box>
  );
}

export default ClientList;