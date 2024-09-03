import { Flex } from '@radix-ui/themes';
import { BadgeDelta, Card, LineChart } from '@tremor/react';
import { classifyChange } from '../../utils/charts';

const chartdata = [
  {
    date: 'Jan 22',
    Mobile: 2890,
    Desktop: 2338,
  },
  {
    date: 'Feb 22',
    Mobile: 2756,
    Desktop: 2103,
  },
  {
    date: 'Mar 22',
    Mobile: 3322,
    Desktop: 2194,
  },
  {
    date: 'Apr 22',
    Mobile: 3470,
    Desktop: 2108,
  },
  {
    date: 'May 22',
    Mobile: 3475,
    Desktop: 1812,
  },
  {
    date: 'Jun 22',
    Mobile: 3129,
    Desktop: 1726,
  },
  {
    date: 'Jul 22',
    Mobile: 3490,
    Desktop: 1982,
  },
  {
    date: 'Aug 22',
    Mobile: 2903,
    Desktop: 2012,
  },
  {
    date: 'Sep 22',
    Mobile: 2643,
    Desktop: 2342,
  },
  {
    date: 'Oct 22',
    Mobile: 2837,
    Desktop: 2473,
  },
  {
    date: 'Nov 22',
    Mobile: 2954,
    Desktop: 3848,
  },
  {
    date: 'Dec 22',
    Mobile: 3239,
    Desktop: 3736,
  },
];

/**
 * Represents the statistics for Core Web Vitals.
 */
export type CoreWebVitalStats = {
  mobile: {
    value: number;
    variation: number;
  };
  desktop: {
    value: number;
    variation: number;
  };
};

/**
 * Renders a CoreWebVitalCard component.
 *
 * @component
 * @param {string} name - The name of the Core Web Vital.
 * @param {CoreWebVitalStats} stats - The statistics for the Core Web Vital.
 * @returns {JSX.Element} The rendered CoreWebVitalCard component.
 */
const CoreWebVitalCard = ({ name, stats }: { name: string; stats: CoreWebVitalStats }): JSX.Element => {
  return (
    <Card className='mx-auto flex-grow basis-full md:basis-1/2 lg:basis-1/3 max-w-full md:max-w-1/2 lg:max-w-1/3'>
      <Flex gap='3'>
        <Flex direction='column' justify='between'>
          <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>{name}</h4>
          <div>
            <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>{stats.desktop.value}</p>
            <BadgeDelta deltaType={classifyChange(stats.mobile.variation)} isIncreasePositive={false} size='xs'>
              {stats.mobile.variation}%
            </BadgeDelta>
            <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>Mobile</h4>
          </div>
          <div>
            <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>{stats.mobile.value}</p>
            <BadgeDelta deltaType={classifyChange(stats.desktop.variation)} isIncreasePositive={false} size='xs'>
              {stats.desktop.variation}%
            </BadgeDelta>
            <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>Desktop</h4>
          </div>
        </Flex>
        <LineChart className='h-64' data={chartdata} index='date' yAxisWidth={65} categories={['Mobile', 'Desktop']} colors={['indigo', 'cyan']} />
      </Flex>
    </Card>
  );
};

export { CoreWebVitalCard };
