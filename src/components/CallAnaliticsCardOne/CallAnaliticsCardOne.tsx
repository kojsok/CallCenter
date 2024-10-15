import { FC } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { People, Call, AccessTime, MoodBad, Feedback } from '@mui/icons-material';

const CallAnaliticsCardOne: FC = () => {
  const calls = useSelector((state: RootState) => state.calls.data);
  const firstCall = calls.length > 0 ? calls[0] : null;
  const totalDuration = calls.reduce((acc, call) => acc + call.duration, 0);
  const negativeCalls = calls.filter(call => call.callMood === 'negative').length;
  const followUpCalls = calls.filter(call => call.followUpRequired).length;

  return (
    <Card sx={{
      maxWidth: 445, 
      maxHeight: 345, 
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
          Обработано за месяц
        </Typography>

        {firstCall ? (
          <>
            {/* Идентификатор первого клиента */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <People sx={{ color: 'var(--primary-main)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>ID клиента:</strong> {firstCall.employeeId}
              </Typography>
            </Box>

            {/* Общее количество звонков */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Call sx={{ color: 'var(--success)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Всего звонков:</strong> {calls.length}
              </Typography>
            </Box>

            {/* Общая продолжительность звонков */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <AccessTime sx={{ color: 'var(--light-grey)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Общая продолжительность (секунды):</strong> {totalDuration}
              </Typography>
            </Box>

            {/* Количество негативных звонков */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <MoodBad sx={{ color: 'var(--error)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Негативные звонки:</strong> {negativeCalls}
              </Typography>
            </Box>

            {/* Количество звонков, требующих дальнейших действий */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Feedback sx={{ color: 'var(--primary-main)', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                <strong>Требуют дальнейших действий:</strong> {followUpCalls}
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

export default CallAnaliticsCardOne;


// import { FC } from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import { People, Call, AccessTime, MoodBad, Comment, Feedback } from '@mui/icons-material';

// const CallAnaliticsCardOne: FC = () => {
//   // Получение данных о звонках из состояния
//   const calls = useSelector((state: RootState) => state.calls.data);

//   // Если звонки есть, берем первый элемент
//   const firstCall = calls.length > 0 ? calls[0] : null;

//   // Подсчет общей продолжительности всех звонков
//   const totalDuration = calls.reduce((acc, call) => acc + call.duration, 0);

//   // Анализ настроения звонков
//   const negativeCalls = calls.filter(call => call.callMood === 'negative').length;

//   // Подсчет количества звонков, требующих дальнейших действий
//   const followUpCalls = calls.filter(call => call.followUpRequired).length;

//   return (
//     <Card sx={{
//       maxWidth: 445, 
//       maxHeight: 345, 
//       margin: 'auto', 
//       padding: '20px', 
//       borderRadius: '12px', 
//       boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', 
//       backgroundColor: '#f5f5f5'
//     }}>
//       <CardContent>
//         <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
//           Обработано за месяц
//         </Typography>

//         {firstCall ? (
//           <>
//             {/* Идентификатор первого клиента */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <People sx={{ color: 'blue', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>ID клиента:</strong> {firstCall.employeeId}
//               </Typography>
//             </Box>

//             {/* Общее количество звонков */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <Call sx={{ color: 'green', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Всего звонков:</strong> {calls.length}
//               </Typography>
//             </Box>

//             {/* Общая продолжительность звонков */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <AccessTime sx={{ color: 'gray', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Общая продолжительность (секунды):</strong> {totalDuration}
//               </Typography>
//             </Box>

//             {/* Количество негативных звонков */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <MoodBad sx={{ color: 'red', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Негативные звонки:</strong> {negativeCalls}
//               </Typography>
//             </Box>

//             {/* Количество звонков, требующих дальнейших действий */}
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//               <Feedback sx={{ color: 'orange', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Требуют дальнейших действий:</strong> {followUpCalls}
//               </Typography>
//             </Box>

//             {/* Комментарий агента */}
//             {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Comment sx={{ color: 'gray', marginRight: '10px' }} />
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Комментарий агента:</strong> {firstCall.agentComment}
//               </Typography>
//             </Box> */}
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

// export default CallAnaliticsCardOne;


// import { FC } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';

// const CallCard: FC = () => {
//   // Получение данных о звонках из состояния
//   const calls = useSelector((state: RootState) => state.calls.data);

//   // Если звонки есть, берем первый элемент и суммируем duration
//   const firstCall = calls.length > 0 ? calls[0] : null;
//   const totalDuration = calls.reduce((acc, call) => acc + call.duration, 0);

//   return (
//     <Card sx={{ minWidth: 345, minHeight: 245, margin: 'auto', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
//       <CardContent>
//         <Typography variant="h5" component="div" gutterBottom>
//           Clients обработано за месяц
//         </Typography>
//         {firstCall ? (
//           <>
//             <Typography variant="body2" color="text.secondary">
//               <strong>First Client ID:</strong> {firstCall.id}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               <strong>Общее количество звонков:</strong> {calls.length}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               <strong>Общая продолжительность (секунды):</strong> {totalDuration}
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

// export default CallCard;