import { Container, Flex, Heading, Section } from '@radix-ui/themes';
import { DateRangePickerValue, Divider } from '@tremor/react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchTargetStats, TargetStatsResult } from '../../clients/api';
import { CoreWebVitals } from '../../components/foundations/cwv';
import { LighthouseCharts } from '../../components/foundations/lighthouse';
import { Link } from '../../components/foundations/link';
import { ErrorMessage } from '../../components/foundations/message';
import { PulsesTable } from '../../components/foundations/pulses';
import { DateRangeSelector } from '../../components/foundations/selectors/date-range';
import { OverlaySpinner } from '../../components/foundations/spinners';
import { URLsTable } from '../../components/foundations/urls';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';

/**
 * Component to display detailed statistics and information about a specific target.
 *
 * This component fetches and displays various metrics and charts related to the target,
 * including Core Web Vitals, Lighthouse scores, and lists of URLs and pulses.
 *
 * @component
 *
 * @example
 * ```tsx
 * <TargetDetails />
 * ```
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - Utilizes `useParams` to extract the target UUID from the route parameters.
 * - Manages state for loading, error handling, and date range selection.
 * - Fetches target statistics on component mount and when dependencies change.
 *
 * @see {@link fetchTargetStats} for the function used to fetch target statistics.
 *
 * @requires {@link Container}
 * @requires {@link Section}
 * @requires {@link Heading}
 * @requires {@link Breadcrumb}
 * @requires {@link BreadcrumbItem}
 * @requires {@link BreadcrumbDivider}
 * @requires {@link Link}
 * @requires {@link ErrorMessage}
 * @requires {@link Divider}
 * @requires {@link Flex}
 * @requires {@link DateRangeSelector}
 * @requires {@link CoreWebVitals}
 * @requires {@link LighthouseCharts}
 * @requires {@link URLsTable}
 * @requires {@link PulsesTable}
 * @requires {@link OverlaySpinner}
 */
const TargetDetails = (): JSX.Element => {
  /**
   * Get the URL UUID from the route parameters.
   */
  const { uuid } = useParams<{ uuid: string }>();

  /**
   * State to hold the result of the URL statistics.
   */
  const [result, setResult] = useState<TargetStatsResult | null>(null);

  /**
   * State for the date range selected in the dashboard.
   */
  const [dashboardRange, setDashboardRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().setDate(new Date().getDate() - 14)),
    to: new Date(),
  });

  /**
   * State to manage loading and error states.
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<number>();

  /**
   * Callback function to refresh the component by updating the state with a random number.
   * This forces a re-render of the component.
   *
   * @function
   * @name refreshCallback
   * @returns {void}
   */
  const refreshCallback = useCallback(() => {
    setRefresh(Math.random());
  }, []);

  /**
   * Effect to fetch the URL statistics when the component mounts or when dependencies change.
   */
  useEffect(() => {
    const fetchData = async () => {
      if (uuid) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchTargetStats(uuid, dashboardRange);
          if (data) {
            setResult(data);
          }
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [dashboardRange, uuid, refresh]);

  return (
    <Container>
      <Section size='1'>
        <Heading as='h1'>Target: {result?.name}</Heading>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to='/targets'>Targets</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Target Statistics</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {loading && <OverlaySpinner />}

        {error && <ErrorMessage>Error: {error}</ErrorMessage>}

        {result && uuid && (
          <>
            <Divider />
            <Section size='1'>
              <Flex gap='3' justify='between'>
                <DateRangeSelector dateRange={dashboardRange} setDateRange={setDashboardRange} />
              </Flex>
            </Section>
            <Divider />
            <Section size='1'>
              <CoreWebVitals targetUUID={uuid} cwvStats={result.cwvStats} baselines={result.baselines} callback={refreshCallback} />
            </Section>
            <Divider />
            <Section size='1'>
              <LighthouseCharts scores={result.scores} />
            </Section>
            <Section size='1'>
              <Heading as='h2'>URLs List</Heading>
              <URLsTable targetUUID={uuid} />
            </Section>
            <Section size='1'>
              <Heading as='h2'>Pulses List</Heading>
              <PulsesTable targetUUID={uuid} dashboardRange={dashboardRange} />
            </Section>
          </>
        )}
      </Section>
    </Container>
  );
};

export default TargetDetails;
