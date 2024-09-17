import { Card } from '@tremor/react';
import { AreaChart } from '@tremor/react';
import { capitalize } from '../../../lib/utils';

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
            date,
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
  return (
    <Card className='w-full my-2'>
      <h3 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>{capitalize(platform)}</h3>
      <AreaChart
        className='mt-4 max-h-96'
        curveType='natural'
        connectNulls={true}
        data={transformedData[platform].datapoints}
        index='date'
        yAxisWidth={65}
        categories={['TTFB', 'DCL', 'LCP', 'FCP', 'SI', 'TTI']}
        colors={['indigo', 'cyan', 'red', 'green', 'yellow', 'blue']}
        showAnimation={true}
        showGridLines={true}
        showYAxis={true}
        showXAxis={true}
        enableLegendSlider={true}
        xAxisLabel='Date'
        showLegend={true}
        valueFormatter={(value) => `${value}ms`}
      />
    </Card>
  );
};

export { CoreWebVitalPlatformCard };
