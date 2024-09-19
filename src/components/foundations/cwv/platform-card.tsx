import { Card } from '@tremor/react';
import { capitalize } from '../../../lib/utils';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../../../components/ui/chart';
import { format } from 'date-fns';
import { useState } from 'react';
import { CategoricalChartState } from 'recharts/types/chart/types';

const chartConfig = {
  TTFB: {
    label: 'TTFB',
  },
  FCP: {
    label: 'FCP',
  },
  DCL: {
    label: 'DCL',
  },
  SI: {
    label: 'SI',
  },
  LCP: {
    label: 'LCP',
  },
  TTI: {
    label: 'TTI',
  },
} satisfies ChartConfig;

/**
 * Metric data point object.
 */
interface MetricDataPoint {
  uuid: string;
  value: number;
}

/**
 * Platform stats object.
 */
interface PlatformStats {
  values: Record<string, number>;
  variation: number;
  datapoints: Record<string, MetricDataPoint>;
}

/**
 * Metric stats object.
 */
interface MetricStats {
  name: string;
  stats: {
    mobile: PlatformStats;
    desktop: PlatformStats;
  };
}

/**
 * Transformed data point object.
 */
interface TransformedDataPoint {
  date: string;
  uuid: string;
  [metric: string]: number | string | null;
}

/**
 * Transformed data object.
 */
interface TransformedData {
  mobile: {
    datapoints: TransformedDataPoint[];
  };
  desktop: {
    datapoints: TransformedDataPoint[];
  };
}

/**
 * Transforms the input data array into the desired format.
 *
 * @param inputData - The array of metrics with their stats.
 * @returns An object containing transformed data for mobile and desktop platforms.
 */
const transformData = (inputData: MetricStats[]): TransformedData => {
  const platforms = ['mobile', 'desktop'] as const;
  const result: TransformedData = {
    mobile: { datapoints: [] },
    desktop: { datapoints: [] },
  };

  platforms.forEach((platform) => {
    /**
     * The dataPointMap object is used to store the transformed data points.
     */
    const dataPointMap: Record<string, TransformedDataPoint> = {};

    /**
     * Iterate over each metric in the input data array.
     */
    inputData.forEach((metric) => {
      const metricName = metric.name.toLowerCase();
      const platformData = metric.stats[platform];

      /**
       * Iterate over each data point in the platform data.
       */
      Object.entries(platformData.datapoints).forEach(([date, data]) => {
        if (!dataPointMap[date]) {
          dataPointMap[date] = {
            fullDate: date,
            date: format(new Date(date), 'M/d'),
            uuid: data.uuid,
          };
        }
        dataPointMap[date][metricName.toUpperCase()] = data.value || null;
      });
    });

    /**
     * Sort the data points by date and store them in the result object.
     */
    result[platform].datapoints = Object.values(dataPointMap).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  return result;
};

const CoreWebVitalPlatformCard = ({ platform, stats }: { platform: 'mobile' | 'desktop'; stats: MetricStats[] }) => {
  const transformedData = transformData(stats);
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
    <Card className='w-full my-2'>
      <h3 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>{capitalize(platform)}</h3>
      <ChartContainer config={chartConfig} className='my-4'>
        <AreaChart
          accessibilityLayer
          onMouseDown={handleMouseDown}
          onClick={handleChartClick}
          data={transformedData[platform].datapoints}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <ChartTooltip
            wrapperStyle={{
              pointerEvents: 'auto',
            }}
            trigger={stickyTooltip ? 'click' : 'hover'}
            cursor={true}
            content={<ChartTooltipContent labelKey='fullDate' />}
          />
          <CartesianGrid vertical={true} />
          <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
          <Area
            connectNulls={true}
            dataKey='TTFB'
            type='natural'
            fill='hsl(var(--chart-1))'
            fillOpacity={0.4}
            strokeWidth={2}
            stroke='hsl(var(--chart-1))'
            stackId='a'
          />
          <Area
            connectNulls={true}
            dataKey='FCP'
            type='natural'
            fill='hsl(var(--chart-4))'
            fillOpacity={0.4}
            strokeWidth={2}
            stroke='hsl(var(--chart-4))'
            stackId='a'
          />
          <Area
            connectNulls={true}
            dataKey='DCL'
            type='natural'
            fill='hsl(var(--chart-2))'
            fillOpacity={0.4}
            strokeWidth={2}
            stroke='hsl(var(--chart-2))'
            stackId='a'
          />
          <Area
            connectNulls={true}
            dataKey='LCP'
            type='natural'
            fill='hsl(var(--chart-3))'
            fillOpacity={0.4}
            strokeWidth={2}
            stroke='hsl(var(--chart-3))'
            stackId='a'
          />
          <Area connectNulls={true} dataKey='SI' type='natural' fill='red' fillOpacity={0.4} strokeWidth={2} stroke='red' stackId='a' />
          <Area
            connectNulls={true}
            dataKey='TTI'
            type='natural'
            fill='hsl(var(--chart-5))'
            fillOpacity={0.4}
            strokeWidth={2}
            stroke='hsl(var(--chart-5))'
            stackId='a'
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
};

export { CoreWebVitalPlatformCard };
