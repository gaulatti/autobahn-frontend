import { HistoryScoreChart } from '../components/charts';
import { Container } from '../components/foundations/container';
import { Header } from '../components/header';

const Home = () => {
  return (
    <>
      <Header />
      <main>
          <Container>
              <HistoryScoreChart />
          </Container>
      </main>
    </>
  );
};

export { Home };
