import { Box } from "@mui/material";
import { FC } from "react";

interface ProfileBanerProps {
  url: string
  className?: string
}

const ProfileBaner: FC<ProfileBanerProps> = ({ url, className = '' }) => {
  return (
    <Box className={`w-full rounded-2xl min-h-[90px] sm:min-h-[110px] md:min-h-[170px] bg-cover bg-center opacity-65 ${className}`} sx={{ backgroundImage: `url('${url}')` }} />
  );
}

export default ProfileBaner;