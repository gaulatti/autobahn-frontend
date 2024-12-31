import { MixerVerticalIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Popover, Table, TextField } from '@radix-ui/themes';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Method, sendRequest } from '../../../clients/api';
import { useFeatureFlags } from '../../../hooks/useFeatureFlags';
import { getCurrentTeam } from '../../../state/selectors/teams';
import { CoreWebVitalStats } from './metric-card';

export type Baseline = {
  ttfb: number;
  fcp: number;
  lcp: number;
  tti: number;
  si: number;
  dcl: number;
  mode: number;
};

/**
 * UpdateBaselinePopover component allows users to update the baseline value for a specific target.
 * It renders a popover with a form to input the new baseline value and save it.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.slug - The unique identifier for the target.
 * @param {number} [props.value] - The current baseline value (optional).
 * @param {string} props.stat - The statistic name for which the baseline is being set.
 * @param {boolean} [props.isMobile] - Flag indicating if the view is on a mobile device (optional).
 * @param {Function} [props.callback] - Callback function to be called after the baseline is updated (optional).
 *
 * @returns {JSX.Element} The rendered UpdateBaselinePopover component.
 */
const UpdateBaselinePopover = ({
  slug,
  value,
  stat,
  isMobile,
  callback,
}: {
  slug: string;
  value?: number;
  stat: string;
  isMobile?: boolean;
  callback?: () => void;
}): JSX.Element => {
  const handleSave = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        value: { value: string };
      };

      sendRequest(Method.PATCH, `targets/${slug}/baselines`, { stat, value: formElements.value.value, isMobile }).then(() => {
        if (callback) {
          callback();
        }
      });
    },
    [callback, isMobile, stat, slug]
  );

  return slug ? (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Update Baseline</Button>
      </Popover.Trigger>
      <Popover.Content width='360px'>
        <Flex gap='3'>
          <Box flexGrow='1'>
            <form onSubmit={(e) => handleSave(e)}>
              <TextField.Root placeholder={`Set ${stat} Baseline...`} value={value ? value.toString() : undefined} id='value' type='number'>
                <TextField.Slot>
                  <MixerVerticalIcon height='16' width='16' />
                </TextField.Slot>
              </TextField.Root>
              <Flex gap='3' mt='3' justify='between'>
                <Popover.Close>
                  <Button size='1' type='submit'>
                    Save
                  </Button>
                </Popover.Close>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  ) : (
    <></>
  );
};

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
const CoreWebVitalBaselines = ({
  targetUUID,
  cwvStats,
  baselines = [],
  callback,
}: {
  targetUUID: string;
  cwvStats: { name: string; stats: CoreWebVitalStats }[];
  baselines?: Baseline[];
  callback?: () => void;
}): JSX.Element => {
  const featureFlagEnabled = useFeatureFlags();
  const mobile = baselines.find((item: Baseline) => item.mode === 0);
  const desktop = baselines.find((item: Baseline) => item.mode === 1);

  /**
   * Represents the current team.
   */
  const currentTeam = useSelector(getCurrentTeam)!;

  return (
    <>
      <Table.Root variant='surface' size='2' className='my-4'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell colSpan={7}>
              <center>Mobile</center>
            </Table.ColumnHeaderCell>
          </Table.Row>
          <Table.Row align='center'>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Current</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>p90</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>p90 + 10%</Table.ColumnHeaderCell>
            {currentTeam && featureFlagEnabled('setBaselines') && <Table.ColumnHeaderCell>Update</Table.ColumnHeaderCell>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cwvStats.map((stat) => (
            <Table.Row>
              <Table.RowHeaderCell>{stat.name}</Table.RowHeaderCell>
              <Table.Cell>{mobile ? (mobile as Baseline)[stat.name.toLowerCase() as keyof Baseline] : 'N/A'}</Table.Cell>
              <Table.Cell>{stat.stats.mobile.values['p90']}</Table.Cell>
              <Table.Cell>{(stat.stats.mobile.values['p90'] * 1.1).toFixed(0)}</Table.Cell>
              {currentTeam && featureFlagEnabled('setBaselines') && (
                <Table.Cell>
                  <UpdateBaselinePopover slug={targetUUID} stat={stat.name} isMobile={true} callback={callback} />
                </Table.Cell>
              )}
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
            <Table.ColumnHeaderCell>Current</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>p90</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>p90 + 10%</Table.ColumnHeaderCell>
            {currentTeam && featureFlagEnabled('setBaselines') && <Table.ColumnHeaderCell>Update</Table.ColumnHeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cwvStats.map((stat) => (
            <Table.Row>
              <Table.RowHeaderCell>{stat.name}</Table.RowHeaderCell>
              <Table.Cell>{desktop ? (desktop as Baseline)[stat.name.toLowerCase() as keyof Baseline] : 'N/A'}</Table.Cell>
              <Table.Cell>{stat.stats.desktop.values['p90']}</Table.Cell>
              <Table.Cell>{(stat.stats.desktop.values['p90'] * 1.1).toFixed(0)}</Table.Cell>
              {currentTeam && featureFlagEnabled('setBaselines') && (
                <Table.Cell>
                  <UpdateBaselinePopover slug={targetUUID} stat={stat.name} isMobile={false} callback={callback} />
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export { CoreWebVitalBaselines };
