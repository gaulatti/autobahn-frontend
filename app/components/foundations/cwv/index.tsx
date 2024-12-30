import { Flex, Heading } from '@radix-ui/themes';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { CoreWebVitalCard, CoreWebVitalStats } from './metric-card';
import { CoreWebVitalPlatformCard } from './platform-card';
import { CoreWebVitalStatistics } from './statistics';
import { Baseline, CoreWebVitalBaselines } from './baselines';

/**
 * CoreWebVitals component displays Core Web Vitals statistics in a tabbed interface.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.cwvStats - An array of objects containing Core Web Vitals statistics.
 * @param {string} props.cwvStats[].name - The name of the Core Web Vital metric.
 * @param {CoreWebVitalStats} props.cwvStats[].stats - The statistics for the Core Web Vital metric.
 *
 * @returns {JSX.Element} The rendered CoreWebVitals component.
 */
const CoreWebVitals = ({
  targetUUID,
  cwvStats,
  baselines,
  callback,
}: {
  targetUUID?: string;
  cwvStats: { name: string; stats: CoreWebVitalStats }[];
  baselines?: Baseline[];
  callback?: () => void;
}): JSX.Element => {
  return (
    <>
      <Heading as='h2' className='w-full'>
        Core Web Vitals
      </Heading>
      <TabGroup>
        <TabList className='mt-4'>
          <Tab>By Metric</Tab>
          <Tab>By Platform</Tab>
          <Tab>Statistics</Tab>
          {targetUUID ? <Tab>Baselines</Tab> : <></>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction='row' wrap='wrap' gap='3' className='my-4'>
              {cwvStats.map((stat) => (
                <CoreWebVitalCard name={stat.name} stats={stat.stats} baselines={baselines} />
              ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex gap='3'>
              <CoreWebVitalPlatformCard platform='desktop' stats={cwvStats} />
              <CoreWebVitalPlatformCard platform='mobile' stats={cwvStats} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <CoreWebVitalStatistics cwvStats={cwvStats} />
          </TabPanel>
          {targetUUID && (
            <TabPanel>
              <CoreWebVitalBaselines targetUUID={targetUUID} cwvStats={cwvStats} baselines={baselines} callback={callback} />
            </TabPanel>
          )}
        </TabPanels>
      </TabGroup>
    </>
  );
};

export { CoreWebVitals };
