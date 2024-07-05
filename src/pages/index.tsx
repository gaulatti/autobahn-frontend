import { HistoryScoreChart } from '../components/charts';
import { Container } from '../components/foundations/container';
import { Divider } from '@fluentui/react-components';
import { Stack } from '../components/foundations/stack';

const Home = () => {
  return (
    <Container>
      <Stack>
        <HistoryScoreChart />
        <Divider>Detailed Stats</Divider>
        <div className='flex'>
          <div className='flex-1'>Column 1</div>
          <div className='flex-1'>Column 2</div>
          <div className='flex-1'>Column 3</div>
        </div>
      </Stack>
    </Container>
  );
};

export { Home };
