import { Title3 } from '@fluentui/react-components';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const HistoryScoreChart = ({ data }: { data?: any[] }) => (
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
      <YAxis domain={[0, 'auto']}/>
      <Tooltip />
      <Legend />
      <Title3>Performance Score</Title3>
      <Line type='monotone' isAnimationActive={false} dataKey='m' name='Mobile' stroke='#d35400' activeDot={{ r: 8 }}></Line>
      <Line type='monotone' isAnimationActive={false} dataKey='d' name='Desktop' stroke='#2980b9' activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export { HistoryScoreChart };
