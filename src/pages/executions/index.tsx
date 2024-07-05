import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';

const ExecutionsList = () => {
  return (
    <Container>
      <Stack>
        <div className='flex w-full'>
          <Trigger />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
