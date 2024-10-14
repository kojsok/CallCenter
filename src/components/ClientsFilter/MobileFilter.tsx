import { FilterItem } from "@/Pages/Clients";
import { Button, ListItemButton, Menu, MenuItem } from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { FC, useState } from "react";

interface MobileFilterProps {
  filterInner: FilterItem[]
}

const MobileFilter: FC<MobileFilterProps> = ({ filterInner }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log('closed')
    setAnchorEl(null);
  };
  return (
    <>
      <Button id="mobFilter" variant="outlined" className="self-center" onClick={handleClick}>
        <FilterAltOutlinedIcon />
      </Button>
      <Menu
        id="mobFilter"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        variant="selectedMenu"
        anchorOrigin={{
          vertical: 45, // Открыть меню снизу
          horizontal: "center", // По правому краю якоря
        }}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "var(--secondaryBg05)",
            color: "var(--textApp)",
            backdropFilter: 'blur(10px)',
            translate: "-50%"
          },
          "& .MuiMenuItem-divider": {
            borderColor: 'var(--primary-light)'
          }
        }}
      >
        {filterInner.map((inner, index) => (
          <MenuItem
            divider={inner.divider && index !== filterInner.length - 1}
            key={inner.textContent}
            disableGutters sx={{ py: 0 }}
          >
            <ListItemButton
              onClick={() => {
                inner.onClick();
                handleClose()
              }}
              alignItems="flex-start"
              component={Button}
              className="gap-4"
              sx={{ textTransform: 'capitalize' }}
            >
              {inner.icon}
              {inner.textContent}
            </ListItemButton>
          </MenuItem>
        ))}
      </Menu>
    </>

  );
}

export default MobileFilter;