import { Title2 } from '@fluentui/react-components';
import { Box, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { StatisticSelector } from '../selectors/statistic';
import { LighthouseScore, LighthouseScoreCard } from './card';

/**
 * LighthouseCharts component renders a set of Lighthouse score cards and a statistic selector.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.scores - An array of objects containing the name and scores for each Lighthouse score card.
 * @param {string} props.scores[].name - The name associated with the Lighthouse scores.
 * @param {LighthouseScore} props.scores[].scores - The Lighthouse scores object.
 *
 * @returns {JSX.Element} The rendered LighthouseCharts component.
 */
const LighthouseCharts = ({ scores }: { scores: { name: string; scores: LighthouseScore }[] }) => {
  const [statistic, setStatistic] = useState<string>('p90');

  return (
    <>
      <Flex>
        <Title2 className='w-full'>Lighthouse Scores</Title2>
        <Box>
          <StatisticSelector callback={setStatistic} statistic={statistic} />
        </Box>
      </Flex>
      <Flex direction='row' wrap='wrap' gap='3' className='my-4'>
        {scores.map((score) => (
          <LighthouseScoreCard key={score.name} name={score.name} scores={score.scores} statistic={statistic} />
        ))}
      </Flex>
    </>
  );
};

export { LighthouseCharts };
