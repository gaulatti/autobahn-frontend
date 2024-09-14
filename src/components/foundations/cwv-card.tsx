import { Flex } from '@radix-ui/themes';
import { BadgeDelta, Card } from '@tremor/react';
import { format } from 'date-fns';
import { CartesianGrid, Label, Line, LineChart, ReferenceArea, XAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent, type ChartConfig } from '../../components/ui/chart';
import { classifyChange } from '../../utils/charts';
import { ChartContainer } from '../ui/chart';
import { useState } from 'react';
import { CategoricalChartState } from 'recharts/types/chart/types';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface ChartData {
  date: string;
  mobile: number | null;
  desktop: number | null;
}
export function Component({
  chartData,
  currentStat,
  mobileStat,
  desktopStat,
}: {
  chartData: ChartData[];
  currentStat: string;
  mobileStat: number;
  desktopStat: number;
}): JSX.Element {
  const [stickyTooltip, setStickyTooltip] = useState(false);

  /**
   * Avoid unintended state resets not related to the event itself (handled below)
   */
  const handleMouseDown = (_state: CategoricalChartState, event: any) => {
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * Make the tooltip sticky on click.
   */
  const handleChartClick = (state: CategoricalChartState) => {
    if (state && state.activePayload && state.activePayload.length > 0) {
      setStickyTooltip(true);
    }
  };

  return (
    <ChartContainer config={chartConfig} className='w-full'>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
        onMouseDown={handleMouseDown}
        onClick={handleChartClick}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey='date' tickLine={true} axisLine={true} tickMargin={8} interval='preserveEnd' />
        <ChartTooltip
          wrapperStyle={{
            pointerEvents: 'auto',
          }}
          trigger={stickyTooltip ? 'click' : 'hover'}
          cursor={true}
          content={<ChartTooltipContent labelKey='fullDate' />}
        />
        <ReferenceArea y1={mobileStat} stroke='red' strokeOpacity={0.2} fillOpacity={0.1} fill='red'>
          <Label value={`Mobile ${currentStat}`} position='insideTopRight' />
        </ReferenceArea>
        <ReferenceArea y1={desktopStat} stroke='red' strokeOpacity={0.2} fillOpacity={0.1} fill='red'>
          <Label value={`Desktop ${currentStat}`} position='insideBottomRight' />
        </ReferenceArea>
        <Line connectNulls={true} dataKey='desktop' type='monotone' stroke='var(--color-desktop)' strokeWidth={2} dot={false} />
        <Line connectNulls={true} dataKey='mobile' type='monotone' stroke='var(--color-mobile)' strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}

/**
 * Represents the statistics for Core Web Vitals.
 */
export type CoreWebVitalStats = {
  mobile: {
    value: number;
    variation: number;
    datapoints: Record<string, { value: number; uuid: string }>;
  };
  desktop: {
    value: number;
    variation: number;
    datapoints: Record<string, { value: number; uuid: string }>;
  };
};

const transformChartDatapoints = (input: CoreWebVitalStats): ChartData[] => {
  const mobileDataPoints = input.mobile.datapoints;
  const desktopDataPoints = input.desktop.datapoints;

  const allDates = Array.from(new Set([...Object.keys(mobileDataPoints), ...Object.keys(desktopDataPoints)])).sort();

  const chartdata: ChartData[] = allDates.map((date: string) => ({
    date: format(new Date(date), 'M/d'),
    fullDate: date,
    payload: { uuid: mobileDataPoints[date].uuid },
    mobile: mobileDataPoints[date].value || null,
    desktop: desktopDataPoints[date].value || null,
  }));

  return chartdata;
};

/**
 * Renders a CoreWebVitalCard component.
 *
 * @component
 * @param {string} name - The name of the Core Web Vital.
 * @param {CoreWebVitalStats} stats - The statistics for the Core Web Vital.
 * @returns {JSX.Element} The rendered CoreWebVitalCard component.
 */
const CoreWebVitalCard = ({ name, stats, currentStat }: { name: string; stats: CoreWebVitalStats; currentStat: string }): JSX.Element => {
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
        <Component chartData={chartData} currentStat={currentStat} mobileStat={stats.mobile.value} desktopStat={stats.desktop.value} />
      </Flex>
    </Card>
  );
};

export { CoreWebVitalCard };
