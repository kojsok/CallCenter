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
      width: 445,
      height: 345,
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
          Информация о звонке
        </Typography>

        {firstCall ? (
          <>
            {/* Тип звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <PhoneInTalk sx={{ color: firstCall.type === 'outgoing' ? 'var(--primary-main)' : 'var(--success)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Тип звонка:</strong> {firstCall.type === 'outgoing' ? 'Исходящий' : 'Входящий'}
              </Typography>
            </Box>

            {/* Начало звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <AccessTime sx={{ color: green.A400, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Начало звонка:</strong> {formatTime(firstCall.start)}
              </Typography>
            </Box>

            {/* Конец звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <CallEnd sx={{ color: red.A400, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Конец звонка:</strong> {formatTime(firstCall.end)}
              </Typography>
            </Box>

            {/* Продолжительность звонка */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Timer sx={{ color: 'var(--light-grey)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Продолжительность (секунды):</strong> {firstCall.duration}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'var(--light-grey)' }}>
            Нет данных о звонках.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CallAnaliticsCardTwo;


// import { FC } from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import dayjs from 'dayjs';
// import { PhoneInTalk, AccessTime, CallEnd, Timer } from '@mui/icons-material';

// const CallAnaliticsCardTwo: FC = () => {
//   // Получение данных о звонках из состояния
//   const calls = useSelector((state: RootState) => state.calls.data);

//   // Если звонки есть, берем первый элемент для отображения времени звонка
//   const firstCall = calls.length > 0 ? calls[0] : null;

//   // Форматирование времени начала и конца звонка
//   const formatTime = (time: string) => dayjs(time).format('HH:mm:ss');

//   return (
//     <Card sx={{
//     width: 445, 
//     height: 345,
//       margin: 'auto', 
//       padding: '20px', 
//       borderRadius: '12px', 
//       boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', 
//       backgroundColor: '#f5f5f5'
//     }}>
//       <CardContent>
//         <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
//           Информация о звонке
//         </Typography>

//         {firstCall ? (
//           <>
//             {/* Тип звонка */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <PhoneInTalk sx={{ color: firstCall.type === 'outgoing' ? 'blue' : 'green', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Тип звонка:</strong> {firstCall.type === 'outgoing' ? 'Исходящий' : 'Входящий'}
//               </Typography>
//             </Box>

//             {/* Начало звонка */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <AccessTime sx={{ color: 'gray', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Начало звонка:</strong> {formatTime(firstCall.start)}
//               </Typography>
//             </Box>

//             {/* Конец звонка */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <CallEnd sx={{ color: 'gray', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Конец звонка:</strong> {formatTime(firstCall.end)}
//               </Typography>
//             </Box>

//             {/* Продолжительность звонка */}
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Timer sx={{ color: 'gray', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Продолжительность (секунды):</strong> {firstCall.duration}
//               </Typography>
//             </Box>
//           </>
//         ) : (
//           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
//             Нет данных о звонках.
//           </Typography>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default CallAnaliticsCardTwo;



// import { FC } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import dayjs from 'dayjs';

// const CallTimeCard: FC = () => {
//   // Получение данных о звонках из состояния
//   const calls = useSelector((state: RootState) => state.calls.data);

//   // Если звонки есть, берем первый элемент для отображения времени звонка
//   const firstCall = calls.length > 0 ? calls[0] : null;

//   // Форматирование времени начала и конца звонка
//   const formatTime = (time: string) => dayjs(time).format('HH:mm:ss');

//   return (
//     <Card sx={{ minWidth: 345, minHeight: 245, margin: 'auto', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
//       <CardContent>
//         <Typography variant="h5" component="div" gutterBottom>
//           Информация о звонке
//         </Typography>
//         {firstCall ? (
//           <>
//             <Typography variant="body2" color="text.secondary">
//               <strong>Тип звонка:</strong> {firstCall.type === 'outgoing' ? 'Исходящий' : 'Входящий'}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               <strong>Начало звонка:</strong> {formatTime(firstCall.start)}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               <strong>Конец звонка:</strong> {formatTime(firstCall.end)}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               <strong>Продолжительность (секунды):</strong> {firstCall.duration}
//             </Typography>
//           </>
//         ) : (
//           <Typography variant="body2" color="text.secondary">
//             Нет данных о звонках.
//           </Typography>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default CallTimeCard;