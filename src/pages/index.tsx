import { Flex, Row, Tooltip } from 'antd';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data: any[] = [];
for (let i = 0; i < 13; i++) {
  data.push({ name: `Page ${i}`, m: Math.random() * 5000, d: Math.random() * 5000, amt: Math.random() * 5000 });
}

const Home = () => {
  return (
    <>
      <header>
        <Flex justify='center'>
          <section>
            <Flex justify='space-between' className='header'>
              <div>logo + menu</div>
              <div>user menu</div>
            </Flex>
          </section>
        </Flex>
      </header>
      <main>
        <Flex justify='center'>
          <section>
            <Row>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='m' name='Mobile' stroke='#8884d8' activeDot={{ r: 8 }}></Line>
                  <Line type='monotone' dataKey='d' name='Desktop' stroke='#82ca9d' activeDot={{ r: 8 }} />
                  <Line type='monotone' dataKey='amt' name='Totla' stroke='#82ca9d' activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          </section>
        </Flex>
      </main>
    </>
  );
};

export { Home };
