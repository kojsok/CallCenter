import { Box, Typography } from "@mui/material";
import { FC } from "react";
import OperatorSvg from '../../assets/call-center.svg?react'

interface PageHeaderProps {
  title: string,
  descr: string
}

const PageHeader: FC<PageHeaderProps> = ({ title, descr }) => {
  return (
    <Box className="flex flex-col shrink-0 px-8 py-6 bg-secondaryBg rounded-2xl relative overflow-hidden">
      <Typography
        className="text-app mb-1"
        variant="h1"
        sx={{ fontSize: "1.5em", fontWeight: '500', marginBottom: "7px", letterSpacing: '1.5px' }}
      >
        {title}
      </Typography>
      <Typography className="text-second tracking-widest">{descr}</Typography>
      <OperatorSvg className="absolute right-8 bottom-0 h-28 w-2/6 translate-x-11" />
    </Box>
  );
}

export default PageHeader;