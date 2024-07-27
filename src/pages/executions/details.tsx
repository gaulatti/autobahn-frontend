import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Spinner, Title1 } from '@fluentui/react-components';
import { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import React2LighthouseViewer from 'react2-lighthouse-viewer';
import { Method, useAPI } from '../../clients/api';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';

const ExecutionDetails = () => {
  const { uuid } = useParams();
  const { pathname } = useLocation();

  const viewportMode = useMemo(() => {
    return pathname.split('/').pop();
  }, [pathname]);

  const { data, loading } = useAPI(Method.GET, [], `executions/${uuid}/${viewportMode}`);

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
            <Link to={`/executions/${uuid}`}>{uuid}</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Results ({viewportMode})</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <section className='my-4'>
          {loading && (
            <div className='spinner-overlay'>
              <Spinner size='huge' />
            </div>
          )}
          {data ? <React2LighthouseViewer json={data} /> : <></>}
        </section>
      </Stack>
    </Container>
  );
};
export { ExecutionDetails };
