import { Divider, Field, Select } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { HistoryScoreChart } from '../components/charts';
import { Container } from '../components/foundations/container';
import { Stack } from '../components/foundations/stack';
const Home = () => {
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
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>Radial: Executions per Score range</div>
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>Column 2</div>
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>Column 3</div>
          <div className='flex-1 min-w-[50%] md:min-w-[25%]'>Column 4</div>
        </div>
      </Stack>
    </Container>
  );
};

export { Home };
