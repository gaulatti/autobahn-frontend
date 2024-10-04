import * as Label from '@radix-ui/react-label';
import { Box } from '@radix-ui/themes';
import { DateRangePicker, DateRangePickerValue } from '@tremor/react';

/**
 * DateRangeSelector component allows users to select a date range.
 *
 * @param {Object} props - The properties object.
 * @param {DateRangePickerValue} props.dateRange - The current value of the date range picker.
 * @param {React.Dispatch<React.SetStateAction<DateRangePickerValue>>} props.setDateRange - The function to update the date range picker value.
 *
 * @returns {JSX.Element} The rendered DateRangeSelector component.
 */
const DateRangeSelector = ({
  dateRange,
  setDateRange,
}: {
  dateRange: DateRangePickerValue;
  setDateRange: React.Dispatch<React.SetStateAction<DateRangePickerValue>>;
}): JSX.Element => {
  return (
    <Box>
      <Label.Root className='LabelRoot' htmlFor='dateRangePicker'>
        Date Range
      </Label.Root>
      <DateRangePicker id='dateRangePicker' className='mx-auto max-w-sm' enableSelect={false} value={dateRange} onValueChange={setDateRange} />
    </Box>
  );
};
export { DateRangeSelector };