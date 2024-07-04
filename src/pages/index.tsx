import { HistoryScoreChart } from '../components/charts';
import { Header } from '../components/header';

const Home = () => {
  return (
    <>
      <Header />
      <main>
          <section>
              <HistoryScoreChart />
          </section>
      </main>
    </>
  );
};

export { Home };
