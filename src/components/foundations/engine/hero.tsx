import { Box, Flex } from '@radix-ui/themes';
import { Card, BarList, CategoryBar, Divider } from '@tremor/react';

const frequency = [
  { name: '/home', value: 456 },
  { name: '/imprint', value: 351 },
  { name: '/cancellation', value: 51 },
];

const EngineHero = () => {
  return (
    <Flex gap='3'>
      <Box className='w-full'>
        <Card className='mx-auto max-w-lg'>
          <h3 className='text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium mb-4'>Most Assessed</h3>
          <p className='mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content'>
            <span>Project</span>
            <span>Views</span>
          </p>
          <BarList data={frequency} className='mx-auto max-w-sm h-36' />
        </Card>
      </Box>
      <Box className='w-full'>
        <Card className='mx-auto max-w-lg'>
          <h3 className='text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium mb-4'>Average Performance Scores</h3>
          <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between'>
            <span>Mobile</span>
            <span className='flex items-center space-x-1'>
              <span>65</span>
              <span>(+45%)</span>
            </span>
          </p>
          <CategoryBar values={[40, 30, 20, 10]} colors={['emerald', 'yellow', 'orange', 'rose']} markerValue={62} className='mt-3' />
          <Divider />
          <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between'>
            <span>Desktop</span>
            <span className='flex items-center space-x-1'>
              <span>65</span>
              <span>(+45%)</span>
            </span>
          </p>
          <CategoryBar values={[40, 30, 20, 10]} colors={['emerald', 'yellow', 'orange', 'rose']} markerValue={62} className='mt-3' />
        </Card>
      </Box>
      <Box className='w-full'>
        <Card className='mx-auto max-w-lg'>
          <h3 className='text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium mb-4'>Most Assessed</h3>
        </Card>
      </Box>
    </Flex>
  );
};

export { EngineHero };