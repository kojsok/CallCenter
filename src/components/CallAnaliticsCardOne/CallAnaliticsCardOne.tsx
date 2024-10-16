import { FC, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { People, Call, AccessTime, MoodBad, Feedback } from '@mui/icons-material';
import { fetchCallsData } from '@/store/callSlice';

const CallAnaliticsCardOne: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const calls = useSelector((state: RootState) => state.calls.data);
  const status = useSelector((state: RootState) => state.calls.status);
  const error = useSelector((state: RootState) => state.calls.error); //нужно добавить работу с ошибкой

  const firstCall = calls.length > 0 ? calls[0] : null;
  const totalDuration = calls.reduce((acc, call) => acc + call.duration, 0);
  const negativeCalls = calls.filter(call => call.callMood === 'negative').length;
  const followUpCalls = calls.filter(call => call.followUpRequired).length;

  // Локальное состояние для Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);


   // Получение данных при монтировании компонента
   useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCallsData());
    }
  }, [status, dispatch]);

  // Открытие Snackbar при ошибке доделать сам snackbar
  useEffect(() => {
    if (status === 'failed') {
      setOpenSnackbar(true);
    }
  }, [status]);

  return (
    <Card sx={{
      width: '100%', // Занимает всю доступную ширину родительского контейнера
      maxWidth: '500px', // Ограничение максимальной ширины
      height: '100%',
      maxHeight: '345px',
      // aspectRatio: '1 / 1', // Задает соотношение сторон (ширина к высоте)
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
        Processed in a month
        </Typography>

        {firstCall ? (
          <>
            {/* Идентификатор первого клиента */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <People sx={{ color: 'var(--primary-main)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>ID Employee:</strong> {firstCall.employeeId}
              </Typography>
            </Box>

            {/* Общее количество звонков */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Call sx={{ color: 'var(--success)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Total calls:</strong> {calls.length}
              </Typography>
            </Box>

            {/* Общая продолжительность звонков */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <AccessTime sx={{ color: 'var(--light-grey)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Total duration (minets):</strong> {(totalDuration/60).toFixed(2)}
              </Typography>
            </Box>

            {/* Количество негативных звонков */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <MoodBad sx={{ color: 'var(--error)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Negative calls:</strong> {negativeCalls}
              </Typography>
            </Box>

            {/* Количество звонков, требующих дальнейших действий */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Feedback sx={{ color: 'var(--primary-main)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Further actions required:</strong> {followUpCalls}
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

export default CallAnaliticsCardOne;