import { FilterItem } from "@/Pages/Clients";
import { Box, List, Divider, ListItem, ListItemButton, Button } from "@mui/material";
import { FC, Fragment } from "react";

interface DesktopFilterProps {
  filterInner: FilterItem[]
}
const DesktopFilter: FC<DesktopFilterProps> = ({ filterInner }) => {
  return (<div>
    <Box>
      <List className="text-app">
        {filterInner.map(inner => (
          <Fragment key={inner.textContent}>
            <ListItem disableGutters disablePadding sx={{ ...inner.divider && { mb: "30px" } }}>
              <ListItemButton onClick={inner.onClick} alignItems="flex-start" component={Button} className="gap-4" sx={{ ":hover": { bgcolor: "var(--primary-light)" }, transition: "background-color 0.4s ease", textTransform: "capitalize" }}>
                {inner.icon}
                {inner.textContent}
              </ListItemButton>
            </ListItem>
            {inner.divider && <Divider variant='fullWidth' sx={{ borderColor: 'var(--primary-light)', borderWidth: '1px' }} />}
          </Fragment>
        ))}
      </List>
    </Box>
  </div>);
}

export default DesktopFilter;