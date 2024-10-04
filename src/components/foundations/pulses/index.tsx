import { Button, Flex } from '@radix-ui/themes';
import { DateRangePickerValue } from '@tremor/react';
import { ColDef, ColGroupDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Method, sendRequest } from '../../../clients/api';
import { WebSocketManager } from '../../../engines/sockets';
import { getCurrentTeam } from '../../../state/selectors/teams';
import { Link } from '../link';
import { useFeatureFlags } from '../../../hooks/useFeatureFlags';
import { useDarkMode } from '../../../hooks/useDarkMode';

const semaphoreColors = ['#7f8c8d', '#f6b93b', '#27ae60', '#27ae60', '#27ae60', '#c0392b', '#f6b93b'];

/**
 * Represents the data for a pulse.
 */
type TData = {
  uuid: string;
  created_at: string;
  results: string;
  heartbeats: { mode: number; status: number; retries: number }[];
};

/**
 * PulsesTable component renders a table displaying pulse data with various columns and functionalities.
 * It supports infinite scrolling, sorting, filtering, and retrying heartbeat actions.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.urlUUID] - Optional UUID to filter the pulses.
 * * @param {string} [props.targetUUID] - Optional UUID for the target.
 * @param {DateRangePickerValue} props.dashboardRange - The date range for filtering the pulses.
 *
 * @returns {JSX.Element} The rendered PulsesTable component.
 *
 * @component
 *
 * @example
 * // Example usage of PulsesTable component
 * <PulsesTable urlUUID="some-uuid" dashboardRange={{ from: new Date(), to: new Date() }} />
 *
 * @remarks
 * - The component uses AgGridReact for rendering the table.
 * - It listens to WebSocketManager for the 'REFRESH_EXECUTIONS_TABLE' action to refresh the table.
 * - The retryHeartbeat function allows retrying the heartbeat for a pulse.
 * - The columns include 'Triggered', 'Triggered For', 'Status' (with sub-columns 'Desktop' and 'Mobile'), and optionally 'URL'.
 * - The dataSource is memoized and fetches data based on the provided UUID and date range.
 */
const PulsesTable = ({ targetUUID, urlUUID, dashboardRange }: { targetUUID?: string; urlUUID?: string; dashboardRange: DateRangePickerValue }): JSX.Element => {
  /**
   * Represents the current team.
   */
  const currentTeam = useSelector(getCurrentTeam)!;

  /**
   * Represents the dark mode status.
   */
  const { isDarkMode } = useDarkMode();

  /**
   * Represents the feature flag status.
   */
  const isFeatureFlagEnabled = useFeatureFlags();

  /**
   * This state is used to manage the loading state of the pulses.
   */
  const [loadingPulses, setLoadingPulses] = useState<boolean>(false);
  const [refreshCells, setRefreshCells] = useState<number>(0);

  /**
   * This function is used to retry the heartbeat for a pulse.
   */
  const retryHeartbeat = useCallback(async (mode: number, uuid: string) => {
    await sendRequest(Method.POST, `executions/${uuid}/${mode === 0 ? 'mobile' : 'desktop'}/retry`);
  }, []);

  const colDefs: (ColDef | ColGroupDef)[] = [
    {
      field: 'created_at',
      headerName: 'Triggered',
      cellRenderer: (params: { data: TData }) => {
        return (
          params.data &&
          (moment().diff(params.data!.created_at, 'hours') < 24
            ? moment(params.data!.created_at).fromNow()
            : moment(params.data!.created_at).format('YYYY-MM-DD / HH:mm'))
        );
      },
      filter: 'agDateColumnFilter',
      initialSort: 'desc',
      sortingOrder: ['desc', 'asc'],
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      flex: 1,
    },
    {
      headerName: 'Triggered For',
      field: 'triggeredBy',
      sortable: true,
      filter: false,
      cellRenderer: (params: { data: { target?: { name: string; uuid: string }; triggeredBy?: { user: { name: string; last_name: string } } } }) => {
        const { data } = params;
        if (data) {
          const { target, triggeredBy } = data;
          if (target) {
            return isFeatureFlagEnabled('engine') ? <Link to={`/targets/${target.uuid}`}>{target.name}</Link> : target.name;
          } else {
            return `${triggeredBy?.user.name} ${triggeredBy?.user.last_name}`;
          }
        }
      },
    },
    {
      headerName: 'Status',
      field: 'heartbeat.status',
      filter: true,
      sortable: true,
      flex: 1,
      children: [
        {
          headerName: 'Desktop',
          width: 150,
          sortable: false,
          valueGetter: (params) => {
            return params.data?.heartbeats?.find((i: { mode: number }) => i.mode == 1);
          },
          flex: 1,
          cellStyle: (params) => {
            const color = params.value && semaphoreColors[params.value!.status];
            return {
              borderLeftColor: color || '',
              borderLeftWidth: '5px',
              borderLeftStyle: 'solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            };
          },
          cellRenderer: (params: { value: { status: number; retries: number }; data: { uuid: string } }) => {
            switch (params.value?.status) {
              case 0:
                return 'Pending';
              case 1:
                return 'Running';
              case 2:
                return 'Lighthouse Finished';
              case 3:
                return 'Pleasantness Finished';
              case 4:
                return (
                  <Link to={`/pulses/${params?.data?.uuid}/desktop`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button size='1' variant='surface' className='my-2' onClick={() => retryHeartbeat(1, params?.data?.uuid)}>
                    Retry
                  </Button>
                );
              case 6:
                return 'Retrying';
            }
          },
        },
        {
          headerName: 'Mobile',
          width: 150,
          sortable: false,
          valueGetter: (params) => {
            return params.data?.heartbeats?.find((i: { mode: number }) => i.mode == 0);
          },
          cellRenderer: (params: { value: { status: number; retries: number }; data: { uuid: string } }) => {
            switch (params.value?.status) {
              case 0:
                return 'Pending';
              case 1:
                return 'Running';
              case 2:
                return 'Lighthouse Finished';
              case 3:
                return 'Pleasantness Finished';
              case 4:
                return (
                  <Link to={`/pulses/${params?.data?.uuid}/mobile`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button size='1' variant='surface' className='my-2' onClick={() => retryHeartbeat(0, params?.data?.uuid)}>
                    Retry
                  </Button>
                );
              case 6:
                return 'Retrying';
            }
          },
          flex: 1,
          cellStyle: (params) => {
            const color = params.value && semaphoreColors[params.value!.status];
            return {
              borderLeftColor: color || '',
              borderLeftWidth: '5px',
              borderLeftStyle: 'solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            };
          },
        },
      ],
    },
  ];

  /**
   * If the URL UUID is provided, add a column for the URL as we're not in the URL stats page.
   */
  if (!urlUUID) {
    colDefs.splice(1, 0, {
      field: 'url.url',
      headerName: 'URL',
      flex: 1,
      filter: true,
      valueGetter: (params) => params.data?.url,
      cellRenderer: (params: { value: { url: string; uuid: string } }) => params.value && <Link to={`/urls/${params.value.uuid}`}>{params.value.url}</Link>,
    });
  }

  /**
   * This useEffect is used to listen to the WebSocketManager for REFRESH_EXECUTIONS_TABLE action
   */
  useEffect(() => {
    WebSocketManager.getInstance().addListener((message: { action: string }) => {
      if (message.action === 'REFRESH_EXECUTIONS_TABLE') {
        setRefreshCells(Math.random());
      }
    });
  }, []);

  /**
   * This useMemo is used to create a custom data source for the AgGridReact component.
   */
  const dataSource: IDatasource = useMemo(
    () => ({
      rowCount: undefined,

      getRows: async (params: IGetRowsParams) => {
        const url = targetUUID ? `targets/${targetUUID}/pulses` : urlUUID ? `urls/${urlUUID}/executions` : 'executions';
        if (dashboardRange.from && dashboardRange.to) {
          console.log(`Grid updated at ${refreshCells}`);

          setLoadingPulses(true);
          const queryParams = {
            sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
            filters: JSON.stringify(params.filterModel),
            startRow: params.startRow,
            endRow: params.endRow,
            from: dashboardRange.from!.toISOString(),
            to: dashboardRange.to!.toISOString(),
            team: currentTeam?.id,
          };

          const result = await sendRequest(Method.GET, url, queryParams);

          params.successCallback(result.pulses.rows, result.pulses.count);
          setLoadingPulses(false);
        }
      },
    }),
    [targetUUID, urlUUID, dashboardRange.from, dashboardRange.to, refreshCells, currentTeam?.id]
  );

  return (
    <Flex className='my-4'>
      <div className={`ag-theme-quartz${isDarkMode ? '-dark' : ''} w-full`} style={{ width: '100%', height: 500 }}>
        <AgGridReact
          datasource={dataSource}
          rowModelType='infinite'
          loading={loadingPulses}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          sortingOrder={['desc', 'asc', null]}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 100 }}
        />
      </div>
    </Flex>
  );
};

export { PulsesTable };
