import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data: Record<string, string | number>[] = [];
for (let i = 0; i < 13; i++) {
  data.push({ name: `${i}`, m: Math.random() * 5000, d: Math.random() * 5000, amt: Math.random() * 5000 });
}

const HistoryScoreChart = () => (
  <ResponsiveContainer width='100%' height={300}>
    <LineChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3 ' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='m' name='Mobile' stroke='#8884d8' activeDot={{ r: 8 }}></Line>
      <Line type='monotone' dataKey='d' name='Desktop' stroke='#82ca9d' activeDot={{ r: 8 }} />
      <Line type='monotone' dataKey='amt' name='Total' stroke='#82ca9d' activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export { HistoryScoreChart };
