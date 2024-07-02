import { Flex, Row } from 'antd';
import { HistoryScoreChart } from '../components/charts';
import { Header } from '../components/header';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Flex justify='center'>
          <section>
            <Row>
              <HistoryScoreChart />
            </Row>
          </section>
        </Flex>
      </main>
    </>
  );
};

export { Home };
