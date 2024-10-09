import { Container, Flex, Heading, Section } from '@radix-ui/themes';
import { DateRangePickerValue, Divider } from '@tremor/react';
import { useState } from 'react';
import { Link } from '../../components/foundations/link';
import { PulsesTable } from '../../components/foundations/pulses';
import { DateRangeSelector } from '../../components/foundations/selectors/date-range';
import { Trigger } from '../../components/trigger';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';

/**
 * ExecutionsList component renders the pulses page with a date range selector and a table of pulses.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * ```tsx
 * <ExecutionsList />
 * ```
 *
 * @see {@link DateRangeSelector}
 * @see {@link PulsesTable}
 */
const ExecutionsList = (): JSX.Element => {
  /**
   * State for the date range selected in the dashboard.
   */
  const [dashboardRange, setDashboardRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  return (
    <Container>
      <Section size='1'>
        <Heading as='h1' className='text-left'>
          Pulses
        </Heading>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pulse</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Trigger />
        <Divider />
        <Section size='1'>
          <Flex gap='3' justify='between'>
            <DateRangeSelector dateRange={dashboardRange} setDateRange={setDashboardRange} />
          </Flex>
        </Section>
        <Divider />
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <PulsesTable dashboardRange={dashboardRange} />
        </div>
      </Section>
    </Container>
  );
};

export { ExecutionsList };
