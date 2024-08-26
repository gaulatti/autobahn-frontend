import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Spinner, Title1 } from '@fluentui/react-components';
import { Container } from '../../components/foundations/container';
import { useParams } from 'react-router-dom';
import { Stack } from '../../components/foundations/stack';
import { Link } from '../../components/foundations/link';
import { URLNavbar } from '../../components/foundations/url-navbar';
import { Method, useAPI } from '../../clients/api';

const URLStats = () => {
  const { uuid } = useParams();
  const { loading, data } = useAPI(Method.GET, [], `stats/url/${uuid}`);

  return (
    <Container>
      <Stack>
        <Title1>URL specific stats</Title1>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Stats</BreadcrumbItem>
        </Breadcrumb>
        {loading ? (
          <div className='spinner-overlay'>
            <Spinner size='huge' />
          </div>
        ) : (
          <URLNavbar>{data?.urlRecord.url}</URLNavbar>
        )}
      </Stack>
    </Container>
  );
};

export { URLStats };
