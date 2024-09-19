import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Field, Spinner, Title1, Title2 } from '@fluentui/react-components';
import { Box, Container, Flex, Section } from '@radix-ui/themes';
import { DateRangePicker, DateRangePickerValue, Divider } from '@tremor/react';

import { fetchURLStats, URLStatsResult } from '../../clients/api';
import { CoreWebVitalCharts } from '../../components/foundations/cwv';
import { LighthouseCharts } from '../../components/foundations/lighthouse';
import { Link } from '../../components/foundations/link';
import { PulsesTable } from '../../components/foundations/pulses';
import { URLNavbar } from '../../components/foundations/url-navbar';
import { ErrorMessage } from '../../components/foundations/message';
import { WebSocketManager } from '../../engines/sockets';

/**
 * URLStats component displays statistics for a specific URL.
 */
const URLStats = () => {
  /**
   *
   */
  const [refreshStats, setRefreshStats] = useState(0);
  /**
   * Get the URL UUID from the route parameters.
   */
  const { uuid } = useParams<{ uuid: string }>();

  /**
   * State to hold the result of the URL statistics.
   */
  const [result, setResult] = useState<URLStatsResult | null>(null);

  /**
   * State for the date range selected in the dashboard.
   */
  const [dashboardRange, setDashboardRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  /**
   * State to manage loading and error states.
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Effect to fetch the URL statistics when the component mounts or when dependencies change.
   */
  useEffect(() => {
    const fetchData = async () => {
      if (uuid) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchURLStats(uuid, dashboardRange);
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
  }, [dashboardRange, uuid, refreshStats]);


  /**
   * This useEffect is used to listen to the WebSocketManager for REFRESH_EXECUTIONS_TABLE action
   */
  useEffect(() => {
    WebSocketManager.getInstance().addListener((message: { action: string }) => {
      if (message.action === 'REFRESH_EXECUTIONS_TABLE') {
        setRefreshStats(Math.random());
      }
    });
  }, []);

  return (
    <Container>
      <Section size='1'>
        <Title1>URL Statistics</Title1>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Stats</BreadcrumbItem>
        </Breadcrumb>

        {loading && (
          <div className='spinner-overlay'>
            <Spinner size='huge' />
          </div>
        )}

        {error && <ErrorMessage>Error: {error}</ErrorMessage>}

        {result && uuid && (
          <>
            <URLNavbar uuid={uuid} url={result.url} />
            <Divider />
            <Section size='1'>
              <Flex gap='3' justify='between'>
                <Box>
                  <Field label='Date Range'>
                    <DateRangePicker className='mx-auto max-w-sm' enableSelect={false} value={dashboardRange} onValueChange={setDashboardRange} />
                  </Field>
                </Box>
              </Flex>
            </Section>
            <Divider />
            <Section size='1'>
              <CoreWebVitalCharts cwvStats={result.cwvStats} />
            </Section>
            <Divider />
            <Section size='1'>
              <LighthouseCharts scores={result.scores} />
            </Section>
            <Section size='1'>
              <Title2>Pulses List</Title2>
              <PulsesTable uuid={uuid} dashboardRange={dashboardRange} />
            </Section>
          </>
        )}
      </Section>
    </Container>
  );
};

export { URLStats };
