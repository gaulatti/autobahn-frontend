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

  /**
   * The viewport mode from the URL.
   */
  const viewportMode = useMemo(() => {
    return pathname.split('/').pop();
  }, [pathname]);

  /**
   *  Fetch the execution data from the API.
   */
  const { data, loading } = useAPI(Method.GET, [], `executions/${uuid}/${viewportMode}`);

  /**
   * The parsed report data from the API response.
   */
  const report = useMemo(() => {
    return data ? JSON.parse(data.report) : null;
  }, [data]);

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
          {report ? <React2LighthouseViewer json={report} /> : <></>}
        </section>
      </Stack>
    </Container>
  );
};
export { ExecutionDetails };
