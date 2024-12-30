import { Heading } from '@radix-ui/themes';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const HistoryScoreChart = ({ data }: { data?: unknown[] }) => (
  <ResponsiveContainer width='100%' height={300} className='m-4'>
    <LineChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis domain={[0, 'auto']} />
      <Tooltip />
      <Legend />
      <Heading as='h3'>Performance Score</Heading>
      <Line type='monotone' isAnimationActive={false} dataKey='m' name='Mobile' stroke='#d35400' activeDot={{ r: 8 }}></Line>
      <Line type='monotone' isAnimationActive={false} dataKey='d' name='Desktop' stroke='#2980b9' activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export { HistoryScoreChart };
