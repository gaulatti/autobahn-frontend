import { Table } from '@radix-ui/themes';
import { CoreWebVitalStats } from './metric-card';


/**
 * An array of available statistical measures.
 *
 * The available statistics include:
 * - 'average': The mean value.
 * - 'p99': The 99th percentile.
 * - 'p90': The 90th percentile.
 * - 'p50': The 50th percentile (median).
 * - 'max': The maximum value.
 * - 'min': The minimum value.
 */
const availableStats = ['avg', 'p99', 'p90', 'p50', 'max', 'min'];

/**
 * CoreWebVitalStatistics component renders tables displaying Core Web Vitals statistics
 * for both mobile and desktop platforms.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.cwvStats - An array of objects containing Core Web Vitals statistics.
 * @param {string} props.cwvStats[].name - The name of the statistic.
 * @param {Object} props.cwvStats[].stats - The statistics data for mobile and desktop.
 * @param {Object} props.cwvStats[].stats.mobile - The mobile statistics data.
 * @param {Object} props.cwvStats[].stats.mobile.values - The values of the mobile statistics.
 * @param {Object} props.cwvStats[].stats.desktop - The desktop statistics data.
 * @param {Object} props.cwvStats[].stats.desktop.values - The values of the desktop statistics.
 *
 * @returns {JSX.Element} A JSX element containing two tables, one for mobile and one for desktop statistics.
 */
const CoreWebVitalStatistics = ({ cwvStats }: { cwvStats: { name: string; stats: CoreWebVitalStats }[] }) => {
  return (
    <>
      <Table.Root variant='surface' size='2' className='my-4'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell colSpan={7}>
              <center>Mobile</center>
            </Table.ColumnHeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            {availableStats.map((stat) => (
              <Table.ColumnHeaderCell>{stat}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cwvStats.map((stat) => (
            <Table.Row>
              <Table.RowHeaderCell>{stat.name}</Table.RowHeaderCell>
              {availableStats.map((statistic) => (
                <Table.Cell>{stat.stats.mobile.values[statistic]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Table.Root variant='surface' size='2' className='my-4'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell colSpan={7}>
              <center>Desktop</center>
            </Table.ColumnHeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            {availableStats.map((stat) => (
              <Table.ColumnHeaderCell>{stat}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cwvStats.map((stat) => (
            <Table.Row>
              <Table.RowHeaderCell>{stat.name}</Table.RowHeaderCell>
              {availableStats.map((statistic) => (
                <Table.Cell>{stat.stats.desktop.values[statistic]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export { CoreWebVitalStatistics };
