import { classifyChange } from '@/utils/charts';
import { Flex } from '@radix-ui/themes';
import { BadgeDelta, Card, CategoryBar, Color } from '@tremor/react';

/**
 * The ranges for the chart.
 */
const chartRanges = [50, 20, 20, 10];
const chartRangeColors: Color[] = ['rose', 'orange', 'yellow', 'emerald'];

/**
 * Represents the score and variation of a Lighthouse performance test.
 */
export type LighthouseScore = {
  mobile: {
    scores: Record<string, number>;
    variation: number;
  };
  desktop: {
    scores: Record<string, number>;
    variation: number;
  };
};

/**
 * Renders a score card for a Lighthouse score.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.name - The name of the score card.
 * @param {LighthouseScore} props.scores - The Lighthouse scores for mobile and desktop.
 * @returns {JSX.Element} The rendered score card component.
 */
const LighthouseScoreCard = ({ name, scores, statistic }: { name: string; scores: LighthouseScore; statistic: string }): JSX.Element => (
  <Card className='mx-auto flex-grow basis-full md:basis-1/2 lg:basis-1/3 max-w-full md:max-w-1/2 lg:max-w-1/3'>
    <Flex direction='column' justify='between' className='mb-4'>
      <Flex gap='3'>
        <Flex direction='column' justify='between'>
          <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>{name} (mobile)</h4>
          <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>
            {scores.mobile.scores[statistic]}
          </p>
          <BadgeDelta deltaType={classifyChange(scores.mobile.variation)} isIncreasePositive={true} size='xs'>
            {scores.mobile.variation}%
          </BadgeDelta>
        </Flex>
        <CategoryBar
          showAnimation={true}
          values={chartRanges}
          colors={chartRangeColors}
          markerValue={scores.mobile.scores[statistic]}
          className='mt-3 flex-grow'
        />
      </Flex>
      <Flex gap='3' className='mt-4'>
        <Flex direction='column' justify='between'>
          <h4 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>{name} (desktop)</h4>
          <p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold mr-4 mb-2'>
            {scores.desktop.scores[statistic]}
          </p>
          <BadgeDelta deltaType={classifyChange(scores.desktop.variation)} isIncreasePositive={true} size='xs'>
            {scores.desktop.variation}%
          </BadgeDelta>
        </Flex>
        <CategoryBar
          showAnimation={true}
          values={chartRanges}
          colors={chartRangeColors}
          markerValue={scores.desktop.scores[statistic]}
          className='mt-3 flex-grow'
        />
      </Flex>
    </Flex>
  </Card>
);

export { LighthouseScoreCard };
