import { FC } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import dayjs from 'dayjs';
import { PhoneInTalk, AccessTime, CallEnd, Timer } from '@mui/icons-material';
import green from '@mui/material/colors/green';
import red from '@mui/material/colors/red';

const CallAnaliticsCardTwo: FC = () => {
  const calls = useSelector((state: RootState) => state.calls.data);
  const firstCall = calls.length > 0 ? calls[0] : null;

  const formatTime = (time: string) => dayjs(time).format('HH:mm:ss');

  return (
    <Card sx={{
      width: '100%', // Занимает всю доступную ширину родительского контейнера
      maxWidth: '500px', // Ограничение максимальной ширины
      height: '100%',
      maxHeight: '345px',
      // aspectRatio: '4 / 3', // Задает соотношение сторон (ширина к высоте)
      display: 'flex', // Flexbox для контроля содержимого внутри
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 'auto',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'var(--appBg)',
      border: '1px solid var(--primary-light)',
      color: 'var(--textApp)',
      transition: 'all 0.3s ease',
      '&:hover': {
        border: '1px solid var(--primary-main)',
        boxShadow: '0px 10px 20px rgba(14, 165, 233, 0.2)',
      }
    }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--textApp)' }}>
          Call information
        </Typography>

        {firstCall ? (
          <>
            {/* Тип звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <PhoneInTalk sx={{ color: firstCall.type === 'outgoing' ? 'var(--primary-main)' : 'var(--success)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Type Call:</strong> {firstCall.type === 'outgoing' ? 'Outgoing' : 'Incoming'}
              </Typography>
            </Box>

            {/* Начало звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <AccessTime sx={{ color: green.A400, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Start call:</strong> {formatTime(firstCall.start)}
              </Typography>
            </Box>

            {/* Конец звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <CallEnd sx={{ color: red.A400, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>End call:</strong> {formatTime(firstCall.end)}
              </Typography>
            </Box>

            {/* Продолжительность звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Timer sx={{ color: 'var(--light-grey)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Duration (minets):</strong> {(firstCall.duration / 60).toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'var(--light-grey)' }}>
            No call data.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CallAnaliticsCardTwo;