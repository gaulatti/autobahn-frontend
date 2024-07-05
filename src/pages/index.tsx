import { Divider } from '@fluentui/react-components';
import { HistoryScoreChart } from '../components/charts';
import { Container } from '../components/foundations/container';
import { Stack } from '../components/foundations/stack';

const Home = () => {
  return (
    <Container>
      <Stack>
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
