import * as Label from '@radix-ui/react-label';
import { Box, Select } from '@radix-ui/themes';

/**
 * Props for the StatisticSelector component.
 *
 * @interface StatisticSelectorProps
 * @property {function} callback - A function that is called with a string value.
 * @property {string} statistic - The statistic value to be used.
 */
interface StatisticSelectorProps {
  callback: (value: string) => void;
  statistic: string;
}

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
 * StatisticSelector component allows users to select a statistical measure from a dropdown.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {function} props.callback - The callback function to handle the change in selected statistic.
 * @param {string} props.statistic - The currently selected statistic value.
 *
 * @example
 * <StatisticSelector
 *   callback={(value) => console.log(value)}
 *   statistic="average"
 * />
 */
const StatisticSelector: React.FC<StatisticSelectorProps> = ({ callback, statistic }) => (
  <Box>
    <Label.Root className='LabelRoot' htmlFor='dateRangePicker'>
      Date Range
    </Label.Root>
    <Select.Root
      value={statistic}
      onValueChange={(e) => {
        callback(e);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Statistic</Select.Label>
          {availableStats.map((stat: string) => (
            <Select.Item key={stat} value={stat}>
              {stat}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </Box>
);

export { StatisticSelector };
