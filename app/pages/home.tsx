import { Button, Flex, Text } from '@radix-ui/themes';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Madonna' }];
}

export default function Home() {
  return (
    <main className='flex items-center justify-center pt-16 pb-4'>
      <div className='flex-1 flex flex-col items-center gap-16 min-h-0'>
        <div className='max-w-[300px] w-full space-y-6 px-4'>
          <Flex direction='column' gap='2'>
            <Text>Hello!</Text>
            <Button>Let's go</Button>
          </Flex>
        </div>
      </div>
    </main>
  );
}
