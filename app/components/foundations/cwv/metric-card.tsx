import { Flex, Section } from '@radix-ui/themes';
import { BadgeDelta, Card } from '@tremor/react';
import moment from 'moment';
import { useState } from 'react';
import { CartesianGrid, Label, Line, LineChart, ReferenceArea, XAxis, YAxis } from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/types';
import { classifyChange } from '../../../utils/charts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../../ui/chart';
import { InfoMessage } from '../message';
import { Baseline } from './baselines';

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
export function Component({ chartData, baselines = [], name }: { chartData: ChartData[]; baselines?: Baseline[]; name: string }): JSX.Element {
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

  /**
   * Find the baselines for desktop and mobile.
   */
  const desktopBaseline = baselines
    .filter((baseline) => baseline.mode === 1)
    .map((item) => parseInt((item as Record<string, any>)[name.toLowerCase()]))
    .find(Boolean);
  const mobileBaseline = baselines
    .filter((baseline) => baseline.mode === 0)
    .map((item) => parseInt((item as Record<string, any>)[name.toLowerCase()]))
    .find(Boolean);

  return (
    <ChartContainer config={chartConfig} className='w-full my-4'>
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
        <CartesianGrid vertical={true} />
        <XAxis dataKey='date' tickLine={true} axisLine={true} tickMargin={8} interval='preserveEnd' />
        <YAxis axisLine={true} tickMargin={16} interval='preserveEnd' />
        <ChartTooltip
          wrapperStyle={{
            pointerEvents: 'auto',
          }}
          trigger={stickyTooltip ? 'click' : 'hover'}
          cursor={true}
          content={<ChartTooltipContent labelKey='fullDate' />}
        />
        {mobileBaseline && (
          <ReferenceArea y1={mobileBaseline} stroke='red' strokeOpacity={0.2} fillOpacity={0.1} fill='red'>
            <Label value={`Mobile Threshold`} position='insideTopRight' />
          </ReferenceArea>
        )}
        {desktopBaseline && (
          <ReferenceArea y1={desktopBaseline} stroke='red' strokeOpacity={0.2} fillOpacity={0.1} fill='red'>
            <Label value={`Desktop Threshold`} position='insideBottomRight' />
          </ReferenceArea>
        )}

        <ChartLegend content={<ChartLegendContent />} />
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
    values: Record<string, number>;
    variation: number;
    datapoints: Record<string, { value: number; slug: string }>;
  };
  desktop: {
    values: Record<string, number>;
    variation: number;
    datapoints: Record<string, { value: number; slug: string }>;
  };
};

const transformChartDatapoints = (input: CoreWebVitalStats): ChartData[] => {
  const mobileDataPoints = input.mobile.datapoints;
  const desktopDataPoints = input.desktop.datapoints;

  const allDates = Array.from(new Set([...Object.keys(mobileDataPoints), ...Object.keys(desktopDataPoints)])).sort();

  const chartdata: ChartData[] = allDates.map((date: string) => ({
    date: moment(date).format('YYYY-MM-DD'),
    fullDate: date,
    payload: { slug: mobileDataPoints[date].slug },
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
const CoreWebVitalCard = ({ name, stats, baselines }: { name: string; stats: CoreWebVitalStats; baselines?: Baseline[] }): JSX.Element => {
  const chartData = transformChartDatapoints(stats);
  return (
    <>
      <Card className='mx-auto flex-grow basis-full md:basis-1/2 lg:basis-1/3 max-w-full md:max-w-1/2 lg:max-w-1/3'>
        {!!Object.keys(stats.mobile.datapoints).length && !!Object.keys(stats.desktop.datapoints).length ? (
          <Flex gap='3'>
            <Flex direction='column'>
              <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>{name}</h4>
              <Section size='1'>
                <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>
                  {stats.mobile.datapoints[Object.keys(stats.mobile.datapoints).pop()!].value}
                </p>
                <BadgeDelta deltaType={classifyChange(stats.mobile.variation)} isIncreasePositive={false} size='xs'>
                  {stats.mobile.variation}%
                </BadgeDelta>
                <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>Mobile</h4>
              </Section>
              <Section size='1'>
                <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>
                  {stats.desktop.datapoints[Object.keys(stats.desktop.datapoints).pop()!].value}
                </p>
                <BadgeDelta deltaType={classifyChange(stats.desktop.variation)} isIncreasePositive={false} size='xs'>
                  {stats.desktop.variation}%
                </BadgeDelta>
                <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>Desktop</h4>
              </Section>
            </Flex>
            <Component name={name} chartData={chartData} baselines={baselines} />
          </Flex>
        ) : (
          <InfoMessage>
            No <b>{name}</b> data yet for this URL
          </InfoMessage>
        )}
      </Card>
    </>
  );
};

export { CoreWebVitalCard };
