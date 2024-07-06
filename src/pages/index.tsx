import { Divider, Field, Select } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { HistoryScoreChart } from '../components/charts';
import { Container } from '../components/foundations/container';
import { Stack } from '../components/foundations/stack';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
const Home = () => {
  const data = [
    {
      "subject": "Homepage",
      "LCP": 150,
      "FCP": 110,
      "fullMark": 200
    },
    {
      "subject": "Content",
      "LCP": 199,
      "FCP": 130,
      "fullMark": 200
    },
    {
      "subject": "About Us",
      "LCP": 186,
      "FCP": 130,
      "fullMark": 200
    },
    {
      "subject": "Media Player",
      "LCP": 169,
      "FCP": 100,
      "fullMark": 200
    },
    {
      "subject": "Gallery",
      "LCP": 185,
      "FCP": 90,
      "fullMark": 200
    },
    {
      "subject": "History",
      "LCP": 85,
      "FCP": 45,
      "fullMark": 200
    }
  ]
  return (
    <Container>
      <Stack>
        <div className='flex flex-wrap w-full my-4'>
          <div className='flex-1 min-w-[100%] md:min-w-[50%] lg:min-w-[25%]'>
            <Field label='Metric'>
              <Select id='metric-select'>
                <option>Score</option>
                <option>FCP</option>
                <option>LCP</option>
                <option>TTI</option>
                <option>SI</option>
              </Select>
            </Field>
          </div>
          <div className='flex-1 min-w-[100%] md:min-w-[50%] lg:min-w-[25%]'>
            <Field label='Date Range'>
              <Select id='range-select'>
                <option>Day</option>
                <option>Week</option>
                <option>Month</option>
              </Select>
            </Field>
          </div>
          <div className='flex-1 min-w-[100%] md:min-w-[50%] lg:min-w-[25%]'>
            <Field label='Viewport Mode'>
              <Select id='mode-select'>
                <option>Desktop + Mobile</option>
                <option>Desktop</option>
                <option>Mobile</option>
              </Select>
            </Field>
          </div>
          <div className='flex-1 min-w-[100%] md:min-w-[50%] lg:min-w-[25%]'>
            <Field label='Select a date'>
              <DatePicker placeholder='Select a date...' />
            </Field>
          </div>
        </div>
        <HistoryScoreChart />
        <Divider>Detailed Stats</Divider>
        <div className='flex flex-wrap w-full my-4'>
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>
            <ResponsiveContainer width='100%' height={300} className='m-4'>
              <RadarChart outerRadius={90} width={730} height={250} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey='subject' />
                <PolarRadiusAxis angle={30} domain={[0, 200]} />
                <Radar name='FCP' dataKey='FCP' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
                <Radar name='LCP' dataKey='LCP' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>Column 2</div>
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>Column 3</div>
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>Column 4</div>
        </div>
      </Stack>
    </Container>
  );
};

export { Home };
