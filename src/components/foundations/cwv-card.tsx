import { Flex } from '@radix-ui/themes';
import { BadgeDelta, Card, LineChart } from '@tremor/react';
import { classifyChange } from '../../utils/charts';
import { format } from 'date-fns';

interface ChartData {
  date: string;
  Mobile: number | null;
  Desktop: number | null;
}

/**
 * Represents the statistics for Core Web Vitals.
 */
export type CoreWebVitalStats = {
  mobile: {
    value: number;
    variation: number;
    datapoints: Record<string, number>;
  };
  desktop: {
    value: number;
    variation: number;
    datapoints: Record<string, number>;
  };
};

const transformChartDatapoints = (input: CoreWebVitalStats): ChartData[] => {
  const mobileDataPoints = input.mobile.datapoints;
  const desktopDataPoints = input.desktop.datapoints;

  const allDates = Array.from(
    new Set([...Object.keys(mobileDataPoints), ...Object.keys(desktopDataPoints)])
  ).sort();

  const chartdata: ChartData[] = allDates.map((date: string) => ({
    date: format(new Date(date), 'M/d'),
    Mobile: mobileDataPoints[date] || null,
    Desktop: desktopDataPoints[date] || null,
  }));

  return chartdata;
}

/**
 * Renders a CoreWebVitalCard component.
 *
 * @component
 * @param {string} name - The name of the Core Web Vital.
 * @param {CoreWebVitalStats} stats - The statistics for the Core Web Vital.
 * @returns {JSX.Element} The rendered CoreWebVitalCard component.
 */
const CoreWebVitalCard = ({ name, stats }: { name: string; stats: CoreWebVitalStats }): JSX.Element => {
  const chartData = transformChartDatapoints(stats);
  return (
    <Card className='mx-auto flex-grow basis-full md:basis-1/2 lg:basis-1/3 max-w-full md:max-w-1/2 lg:max-w-1/3'>
      <Flex gap='3'>
        <Flex direction='column' justify='between'>
          <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>{name}</h4>
          <div>
            <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>{stats.mobile.value}</p>
            <BadgeDelta deltaType={classifyChange(stats.mobile.variation)} isIncreasePositive={false} size='xs'>
              {stats.mobile.variation}%
            </BadgeDelta>
            <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>Mobile</h4>
          </div>
          <div>
            <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>{stats.desktop.value}</p>
            <BadgeDelta deltaType={classifyChange(stats.desktop.variation)} isIncreasePositive={false} size='xs'>
              {stats.desktop.variation}%
            </BadgeDelta>
            <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>Desktop</h4>
          </div>
        </Flex>
        <LineChart connectNulls={true} curveType={'natural'} className='h-64' data={chartData} index='date' yAxisWidth={65} categories={['Mobile', 'Desktop']} colors={['indigo', 'cyan']} />
      </Flex>
    </Card>
  );
};

export { CoreWebVitalCard };
