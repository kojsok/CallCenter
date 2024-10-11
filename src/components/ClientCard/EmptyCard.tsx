import { Box, Typography } from "@mui/material";
import SelectClientSvg from '../../assets/select-client.svg?react'

const EmptyCard = () => {
  return (
    <Box className="h-full flex flex-col justify-normal	 items-center gap-8 rounded-2xl xs:border-2 xs:border-primary-light xs:p-4 lg:border-transparent lg:p-0">
      <Typography variant="h4" gutterBottom sx={{ my: '30px', fontSize: "1.5rem", color: "var(--textApp)" }}>
        Please select a contact
      </Typography>
      <SelectClientSvg className="w-full" />
    </Box>
  );
}

export default EmptyCard;