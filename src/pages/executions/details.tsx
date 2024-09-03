import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Spinner, Title1 } from '@fluentui/react-components';
import { Container, Section } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import React2LighthouseViewer from 'react2-lighthouse-viewer';
import { Method, useAPI } from '../../clients/api';
import { Link } from '../../components/foundations/link';

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
      <Section size='1'>
        <Title1 className='text-left'>Execution Detail</Title1>
        <Breadcrumb>
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
      </Section>
    </Container>
  );
};
export { ExecutionDetails };
