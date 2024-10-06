import { Box, InputAdornment, TextField } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

//temp
import { clients } from "./clients";

const ClientList = () => {
  return (
    <Box className="h-full flex flex-col gap-3 rounded-2xl xs:border-2 xs:border-primary-light lg:border-transparent">
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

    </Box>
  );
}

export default ClientList;