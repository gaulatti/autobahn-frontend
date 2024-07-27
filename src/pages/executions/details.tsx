import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Spinner, Title1 } from '@fluentui/react-components';
import { Link, useParams } from 'react-router-dom';
import { Method, useAPI } from '../../clients/api';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';

const ExecutionDetails = () => {
  const { uuid } = useParams();
  const { loading, data } = useAPI(Method.GET, [], `executions/${uuid}`);

  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Beacon Execution Detail</Title1>
        <Breadcrumb aria-label='Breadcrumb default example'>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link to='/executions'>Executions</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>{uuid}</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <section>
          {loading && (
            <div className='spinner-overlay'>
              <Spinner size='huge' />
            </div>
          )}
          {JSON.stringify(data)}
        </section>
      </Stack>
    </Container>
  );
};

export { ExecutionDetails };
