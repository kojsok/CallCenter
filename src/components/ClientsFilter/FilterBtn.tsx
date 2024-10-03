import { ListItem, ListItemButton } from "@mui/material";
import { FC, ReactNode } from "react";

interface FilterBtnProps {
  textContent: string,
  SvgIcon: ReactNode,
  selected: boolean
}

const FilterBtn: FC<FilterBtnProps> = ({ textContent, SvgIcon, selected }) => {
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton
        selected={selected}
        sx={{
          gap: "15px",
          color: "#fff",
          justifyContent: "start",
          textTransform: "capitalize",
        }}
      >
        {SvgIcon}
        {textContent}
      </ListItemButton>
    </ListItem>

  );
}

export default FilterBtn;