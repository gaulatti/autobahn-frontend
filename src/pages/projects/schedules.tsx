import { Box, Container, Flex, Heading, Section } from '@radix-ui/themes';
import { Divider } from '@tremor/react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Method, useAPI } from '../../clients/api';
import { EngineHero } from '../../components/foundations/engine/hero';
import { Link } from '../../components/foundations/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SchedulesTable } from '../../components/foundations/schedules';
import { CreateSchedule } from '../../components/foundations/schedules/create';

const SchedulesList = () => {
  /**
   * Get the URL UUID from the route parameters.
   */
  const { uuid } = useParams<{ uuid: string }>();

  /**
   * TODO: Fetch the project from the API
   */
  // const { data: projectData } = useAPI(Method.GET, [], `projects/${uuid}`);

  /**
   * Fetch the targets from the API
   */
  const { data } = useAPI(Method.GET, [], '/targets');

  /**
   * Represents the timestamp to trigger a refresh of the schedules table.
   */
  const [refreshTimestamp, setRefreshTimestamp] = useState<number>(Date.now());

  /**
   * Handles the callback to refresh the schedules table.
   */
  const handleRefresh = useCallback(() => {
    setRefreshTimestamp(Date.now());
  }, []);

  return (
    data && (
      <Container>
        <Section size='1'>
          <Heading as='h1' className='text-left'>
            Schedules
          </Heading>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to='/'>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to='/projects'>Projects</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to={`/projects/${uuid}`}>Project Name</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Schedules</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>
        <Section size='1'>
          <EngineHero />
        </Section>
        <Divider />
        <Section size='1'>
          <Flex gap='3' justify='between'>
            <Box>
              <Heading as='h2'>Schedules List</Heading>
            </Box>
            <Box>
              <CreateSchedule targets={data?.targets} projectUUID={uuid!} callback={handleRefresh} />
            </Box>
          </Flex>
          <SchedulesTable projectUUID={uuid!} refresh={refreshTimestamp} />
        </Section>
      </Container>
    )
  );
};

export { SchedulesList };