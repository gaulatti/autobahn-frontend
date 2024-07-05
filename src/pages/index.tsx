import { HistoryScoreChart } from '../components/charts';
import { Container } from '../components/foundations/container';
import { Divider } from '@fluentui/react-components';

const Home = () => {
  return (
    <Container>
      <div className='stack'>
        <HistoryScoreChart />
        <Divider>Detailed Stats</Divider>
        abc
      </div>
    </Container>
  );
};

export { Home };
