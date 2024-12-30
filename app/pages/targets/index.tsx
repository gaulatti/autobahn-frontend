import { Box, Container, Flex, Heading, Section } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from '../../components/foundations/link';
import { TargetsTable } from '../../components/foundations/targets';
import { CreateTarget } from '../../components/foundations/targets/create';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { getCurrentTeam } from '../../state/selectors/teams';

/**
 * TargetsList component renders the main structure for the targets page.
 * It includes a breadcrumb navigation, a hero section, and a table of targets.
 * The component also provides functionality to refresh the targets table.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <TargetsList />
 *
 * @remarks
 * The component uses the `useState` hook to manage the refresh timestamp and the `useCallback` hook
 * to handle the refresh action. The `CreateTarget` component triggers the refresh action via a callback.
 */
const TargetsList = () => {
  /**
   * Represents the timestamp to trigger a refresh of the schedules table.
   */
  const [refreshTimestamp, setRefreshTimestamp] = useState<number>(Date.now());

  /**
   * Represents the current team.
   */
  const currentTeam = useSelector(getCurrentTeam)!;

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
          Targets
        </Heading>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Targets</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>
      <Section size='1'>
        <Flex gap='3' justify='between'>
          {currentTeam && (
            <Box>
              <CreateTarget callback={handleRefresh} />
            </Box>
          )}
        </Flex>
        <TargetsTable refresh={refreshTimestamp} />
      </Section>
    </Container>
  );
};

export default TargetsList;
