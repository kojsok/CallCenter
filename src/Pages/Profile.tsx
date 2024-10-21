import ProfileBaner from "@/components/PageHeader/ProfileBaner";
import LayoutSecond from "@/Layouts/LayoutSecond";
import { selectProfile } from "@/store/authSlices/authSlice";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(selectProfile)

  console.log(user)
  const chipMap: Record<string, "success" | "warning" | "error" | "default"> = {
    free: 'success',
    "on-break": 'warning',
    busy: 'error'
  }
  const status = user?.employee_data?.status || 'free';
  return (
    <LayoutSecond>
      <Box className="grid gap-y-2 gap-x-6 sm:gap-6 grid-cols-[110px_1fr] sm:grid-cols-[200px_1fr] grid-rows-[repeat(3, auto)] py-8">

        <ProfileBaner url="https://cdn.pixabay.com/photo/2024/07/27/05/25/ai-generated-8924761_1280.jpg" className="col-span-2 row-span-2" />
        <Avatar
          alt={user?.employee_data.name}
          src={user?.employee_data.image}
          variant="rounded"
          sx={{
            gridRow: 2 / 3,
            gridColumn: 1 / 2,
            width: {
              xs: '90px',
              sm: '150px'
            },
            height: {
              xs: '90px',
              sm: '150px'
            },
            justifySelf: 'end',
            mt: {
              xs: '-35%',
              sm: '-30%'
            },
            borderRadius: '20px'
          }}
        />
        <Box className="relative">
          <Chip label={status} color={chipMap[status]} sx={{
            minWidth: '80px',
            height: '26px',
            '& .MuiChip-label': {
              textTransform: 'capitalize'
            }
          }} />
          <Typography variant="h2" sx={{ color: 'var(--textApp)', fontSize: 'clamp(1.25rem, 1.364vw + 0.977rem, 2rem)', fontWeight: '600' }}>
            {user?.employee_data.name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-second)' }}>
            {user?.employee_data.position}
          </Typography>
        </Box>
      </Box>
    </LayoutSecond>
  );
}

export default Profile;