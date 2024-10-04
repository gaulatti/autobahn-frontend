import { Box, Container, Flex, Heading, Section } from '@radix-ui/themes';
import { Divider } from '@tremor/react';
import { useCallback, useState } from 'react';
import { EngineHero } from '../../components/foundations/engine/hero';
import { Link } from '../../components/foundations/link';
import { ProjectsTable } from '../../components/foundations/projects';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { CreateProject } from '../../components/foundations/projects/create';

/**
 * ProjectsList component renders a list of projects with the ability to refresh the list.
 *
 * @component
 *
 * @example
 * return (
 *   <ProjectsList />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component includes:
 * - A heading for the projects page.
 * - Breadcrumb navigation.
 * - A hero section.
 * - A divider.
 * - A section containing a heading for the projects list, a button to create a new project, and the projects table.
 *
 * The component uses a state `refreshTimestamp` to trigger a refresh of the projects table.
 * The `handleRefresh` callback updates the `refreshTimestamp` state to the current timestamp.
 */
const ProjectsList = (): JSX.Element => {
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
    <Container>
      <Section size='1'>
        <Heading as='h1' className='text-left'>
          Projects
        </Heading>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Projects</BreadcrumbPage>
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
            <Heading as='h2'>Projects List</Heading>
          </Box>
          <Box>
            <CreateProject callback={handleRefresh} />
          </Box>
        </Flex>
        <ProjectsTable refresh={refreshTimestamp} />
      </Section>
    </Container>
  );
};

export { ProjectsList };