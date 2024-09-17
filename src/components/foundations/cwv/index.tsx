import { Title2 } from '@fluentui/react-components';
import { Box, Flex } from '@radix-ui/themes';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { useState } from 'react';
import { StatisticSelector } from '../selectors/statistic';
import { CoreWebVitalCard, CoreWebVitalStats } from './card';

/**
 * CoreWebVitalCharts component displays Core Web Vitals statistics in a tabbed interface.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.cwvStats - An array of objects containing Core Web Vitals statistics.
 * @param {string} props.cwvStats[].name - The name of the Core Web Vital metric.
 * @param {CoreWebVitalStats} props.cwvStats[].stats - The statistics for the Core Web Vital metric.
 *
 * @returns {JSX.Element} The rendered CoreWebVitalCharts component.
 */
const CoreWebVitalCharts = ({ cwvStats }: { cwvStats: { name: string; stats: CoreWebVitalStats }[] }) => {
  const [statistic, setStatistic] = useState<string>('p90');

  return (
    <>
      <Flex>
        <Title2 className='w-full'>Core Web Vitals</Title2>
        <Box>
          <StatisticSelector callback={setStatistic} statistic={statistic} />
        </Box>
      </Flex>
      <TabGroup>
        <TabList className='mt-4'>
          <Tab>By Metric</Tab>
          <Tab>By Platform</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction='row' wrap='wrap' gap='3' className='my-4'>
              {cwvStats.map((stat) => (
                <CoreWebVitalCard name={stat.name} stats={stat.stats} currentStat={statistic} />
              ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <p className='mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
              Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export { CoreWebVitalCharts };
