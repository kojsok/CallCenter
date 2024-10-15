import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SentimentSatisfiedAlt, SentimentNeutral, SentimentDissatisfied } from '@mui/icons-material';

const CallAnalyticsCardThree: React.FC = () => {
    const calls = useSelector((state: RootState) => state.calls.data);

    const moodCounts = calls.reduce(
        (acc, call) => {
            if (call.callMood === 'positive') acc.positive += 1;
            if (call.callMood === 'neutral') acc.neutral += 1;
            if (call.callMood === 'negative') acc.negative += 1;
            return acc;
        },
        { positive: 0, neutral: 0, negative: 0 }
    );

    const averageFeedbackScore = calls.length > 0
        ? (calls.reduce((acc, call) => acc + call.feedbackScore, 0) / calls.length).toFixed(2)
        : 'Нет данных';

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
                    Аналитика звонков
                </Typography>

                {/* Позитивные звонки */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SentimentSatisfiedAlt sx={{ color: 'var(--success)', marginRight: '10px' }} />
                    <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                        <strong>Позитивных звонков:</strong> {moodCounts.positive}
                    </Typography>
                </Box>

                {/* Нейтральные звонки */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SentimentNeutral sx={{ color: 'var(--light-grey)', marginRight: '10px' }} />
                    <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                        <strong>Нейтральных звонков:</strong> {moodCounts.neutral}
                    </Typography>
                </Box>

                {/* Негативные звонки */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SentimentDissatisfied sx={{ color: 'var(--error)', marginRight: '10px' }} />
                    <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                        <strong>Негативных звонков:</strong> {moodCounts.negative}
                    </Typography>
                </Box>

                {/* Средний рейтинг обратной связи */}
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px', color: 'var(--light-grey)' }}>
                    <strong>Средний рейтинг обратной связи:</strong> {averageFeedbackScore}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CallAnalyticsCardThree;



// import React from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import { SentimentSatisfiedAlt, SentimentNeutral, SentimentDissatisfied } from '@mui/icons-material';

// const CallAnalyticsCardThree: React.FC = () => {
//     // Получение данных о звонках из состояния
//     const calls = useSelector((state: RootState) => state.calls.data);

//     // Аналитика по настроению звонков
//     const moodCounts = calls.reduce(
//         (acc, call) => {
//             if (call.callMood === 'positive') acc.positive += 1;
//             if (call.callMood === 'neutral') acc.neutral += 1;
//             if (call.callMood === 'negative') acc.negative += 1;
//             return acc;
//         },
//         { positive: 0, neutral: 0, negative: 0 }
//     );

//     // Подсчет среднего значения обратной связи
//     const averageFeedbackScore = calls.length > 0
//         ? (calls.reduce((acc, call) => acc + call.feedbackScore, 0) / calls.length).toFixed(2)
//         : 'Нет данных';

//     return (
//         <Card sx={{
//             width: 445,
//             height: 345,
//             margin: 'auto',
//             padding: '20px',
//             borderRadius: '12px',
//             boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
//             backgroundColor: '#f5f5f5'
//         }}>
//             <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
//                     Аналитика звонков
//                 </Typography>

//                 {/* Позитивные звонки */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                     <SentimentSatisfiedAlt sx={{ color: 'green', marginRight: '10px' }} />
//                     <Typography variant="body1" color="text.secondary">
//                         <strong>Позитивных звонков:</strong> {moodCounts.positive}
//                     </Typography>
//                 </Box>

//                 {/* Нейтральные звонки */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                     <SentimentNeutral sx={{ color: 'gray', marginRight: '10px' }} />
//                     <Typography variant="body1" color="text.secondary">
//                         <strong>Нейтральных звонков:</strong> {moodCounts.neutral}
//                     </Typography>
//                 </Box>

//                 {/* Негативные звонки */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                     <SentimentDissatisfied sx={{ color: 'red', marginRight: '10px' }} />
//                     <Typography variant="body1" color="text.secondary">
//                         <strong>Негативных звонков:</strong> {moodCounts.negative}
//                     </Typography>
//                 </Box>

//                 {/* Средний рейтинг обратной связи */}
//                 <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', marginTop: '20px' }}>
//                     <strong>Средний рейтинг обратной связи:</strong> {averageFeedbackScore}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// };

// export default CallAnalyticsCardThree;


// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';

// const CallAnalyticsCard: React.FC = () => {
//   // Получение данных о звонках из состояния
//   const calls = useSelector((state: RootState) => state.calls.data);

//   // Аналитика по настроению звонков
//   const moodCounts = calls.reduce(
//     (acc, call) => {
//       if (call.callMood === 'positive') acc.positive += 1;
//       if (call.callMood === 'neutral') acc.neutral += 1;
//       if (call.callMood === 'negative') acc.negative += 1;
//       return acc;
//     },
//     { positive: 0, neutral: 0, negative: 0 }
//   );

//   // Подсчет среднего значения обратной связи
//   const averageFeedbackScore = calls.length > 0
//     ? (calls.reduce((acc, call) => acc + call.feedbackScore, 0) / calls.length).toFixed(2)
//     : 'Нет данных';

//   return (
//     <Card sx={{ minWidth: 345, minHeight: 245, margin: 'auto', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
//       <CardContent>
//         <Typography variant="h5" component="div" gutterBottom>
//           Аналитика звонков
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           <strong>Позитивных звонков:</strong> {moodCounts.positive}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           <strong>Нейтральных звонков:</strong> {moodCounts.neutral}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           <strong>Негативных звонков:</strong> {moodCounts.negative}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           <strong>Средний рейтинг обратной связи:</strong> {averageFeedbackScore}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default CallAnalyticsCard;