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
                    Call analytics
                </Typography>

                {/* Позитивные звонки */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SentimentSatisfiedAlt sx={{ color: 'var(--success)', marginRight: '10px' }} />
                    <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                        <strong>Positive calls:</strong> {moodCounts.positive}
                    </Typography>
                </Box>

                {/* Нейтральные звонки */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SentimentNeutral sx={{ color: 'var(--light-grey)', marginRight: '10px' }} />
                    <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                        <strong>Negative calls:</strong> {moodCounts.neutral}
                    </Typography>
                </Box>

                {/* Негативные звонки */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SentimentDissatisfied sx={{ color: 'var(--error)', marginRight: '10px' }} />
                    <Typography variant="body1" sx={{ color: 'var(--light-grey)' }}>
                        <strong>Negative calls</strong> {moodCounts.negative}
                    </Typography>
                </Box>

                {/* Средний рейтинг обратной связи */}
                <Typography variant="body1" sx={{ textAlign: 'start', marginTop: '20px', color: 'var(--light-grey)' }}>
                    <strong>Average feedback rating:</strong> {averageFeedbackScore}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CallAnalyticsCardThree;