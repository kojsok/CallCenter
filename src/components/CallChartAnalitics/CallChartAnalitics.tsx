import { useMemo } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; 

const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

interface ChartData {
  month: string;
  positive: number;
  negative: number;
  neutral: number;
  callback: number;
}

const CallChartAnalitics = () => {
//   const theme = useTheme();
  const calls = useSelector((state: RootState) => state.calls.data);

  const chartData: ChartData[] = useMemo(() => {
    // Инициализация данных для каждого месяца с нулями
    const data: ChartData[] = months.map((month) => ({
      month,
      positive: 0,
      negative: 0,
      neutral: 0,
      callback: 0,
    }));

    calls.forEach((call) => {
      const callDate = new Date(call.start);
      const monthIndex = callDate.getMonth(); // 0-11

      if (monthIndex >= 0 && monthIndex < 12) {
        const monthData = data[monthIndex];
        // Увеличиваем соответствующую категорию
        switch (call.callMood) {
          case 'positive':
            monthData.positive += 1;
            break;
          case 'negative':
            monthData.negative += 1;
            break;
          case 'neutral':
            monthData.neutral += 1;
            break;
          default:
            break;
        }

        if (call.followUpRequired) {
          monthData.callback += 1;
        }
      }
    });

    return data;
  }, [calls]);

  return (
    <Card
      sx={{
        maxWidth: '100%',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'var(--appBg)',
        color: 'var(--textApp)',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom color="var(--textApp)">
            Call analytics for the year
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--secondaryBg05)" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="var(--light-grey)" />
            <YAxis stroke="var(--light-grey)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--secondaryBg)',
                border: `1px solid var(--primary-light)`,
              }}
              labelStyle={{ color: 'var(--textApp)' }}
              itemStyle={{ color: 'var(--text-second)' }}
            />
            <Legend wrapperStyle={{ color: 'var(--textApp)' }} />
            <Line
              type="monotone"
              dataKey="positive"
              name="Positive"
              stroke="#4caf50" // Зеленый для позитивных
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="negative"
              name="Negative"
              stroke="#f44336" // Красный для негативных
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="neutral"
              name="Neutral"
              stroke="#ff9800" // Оранжевый для нейтральных
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="callback"
              name="Need to call back"
              stroke="#0ea5e9" // Синий для требующих перезвонить
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CallChartAnalitics;