import { Button, Flex } from '@radix-ui/themes';
import { DateRangePickerValue } from '@tremor/react';
import { ColDef, ColGroupDef, colorSchemeDark, IDatasource, IGetRowsParams, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Method, sendRequest } from '../../../clients/api';
import { SSEManager } from '../../../engines/sse';
import { useDarkMode } from '../../../hooks/useDarkMode';
import { getCurrentTeam } from '../../../state/selectors/teams';
import { Link } from '../link';

const semaphoreColors = ['#7f8c8d', '#f6b93b', '#27ae60', '#27ae60', '#27ae60', '#c0392b', '#f6b93b'];

/**
 * Represents the data for a pulse.
 */
type TData = {
  slug: string;
  createdAt: string;
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
 * <PulsesTable urlUUID="some-slug" dashboardRange={{ from: new Date(), to: new Date() }} />
 *
 * @remarks
 * - The component uses AgGridReact for rendering the table.
 * - It listens to SSEManager for the 'REFRESH_PULSES_TABLE' action to refresh the table.
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
   * This state is used to manage the loading state of the pulses.
   */
  const [loadingPulses, setLoadingPulses] = useState<boolean>(false);
  const [refreshCells, setRefreshCells] = useState<number>(0);

  /**
   * This function is used to retry the heartbeat for a pulse.
   */
  const retryHeartbeat = useCallback(async (mode: number, slug: string) => {
    await sendRequest(Method.PATCH, `pulses/${slug}/${mode === 0 ? 'mobile' : 'desktop'}/retry`);
  }, []);

  /**
   * Represents the grid theme based on the dark mode state.
   */
  const gridTheme = isDarkMode ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;

  const colDefs: (ColDef | ColGroupDef)[] = [
    {
      field: 'createdAt',
      headerName: 'Triggered',
      cellRenderer: (params: { data: TData }) => {
        return (
          params.data &&
          (moment().diff(params.data!.createdAt, 'hours') < 24
            ? moment(params.data!.createdAt).fromNow()
            : moment(params.data!.createdAt).format('YYYY-MM-DD / HH:mm'))
        );
      },
      filter: 'agDateColumnFilter',
      initialSort: 'desc',
      sortingOrder: ['desc', 'asc'],
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      flex: 1,
    },

    /**
     * Hiding till plugin refactor is done. Then we'll reference the Strategy instead.
     */
    // {
    //   headerName: 'Triggered For',
    //   field: 'membership',
    //   sortable: true,
    //   filter: false,
    //   cellRenderer: (params: { data: { schedule?: { project: { slug: string; name: string } }; membership?: { user: { sub: string } } } }) => {
    //     const { data } = params;
    //     if (data) {
    //       const { schedule, membership } = data;

    //       if (schedule) {
    //         const { project } = schedule;
    //         return isFeatureFlagEnabled('engine') ? <Link to={`/projects/${project.slug}`}>{project.name}</Link> : project.name;
    //       } else {
    //         const splitSub: string[] = membership?.user.sub.split('-') || [];
    //         return splitSub.shift();
    //       }
    //     }
    //   },
    // },
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
          cellClass: 'button-holder',
          cellStyle: (params) => {
            const color = params?.value && semaphoreColors[params?.value!.status];
            return {
              borderLeftColor: color || '',
              borderLeftWidth: '5px',
              borderLeftStyle: 'solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            };
          },
          cellRenderer: (params: { value: { status: number; retries: number }; data: { slug: string } }) => {
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
                  <Link to={`/pulses/${params?.data?.slug}/desktop`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button size='1' variant='surface' className='my-2 w-full' onClick={() => retryHeartbeat(1, params?.data?.slug)}>
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
          cellClass: 'button-holder',
          valueGetter: (params) => {
            return params.data?.heartbeats?.find((i: { mode: number }) => i.mode == 0);
          },
          cellRenderer: (params: { value: { status: number; retries: number }; data: { slug: string } }) => {
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
                  <Link to={`/pulses/${params?.data?.slug}/mobile`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button size='1' variant='surface' className='my-2 w-full' onClick={() => retryHeartbeat(0, params?.data?.slug)}>
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
              textAlign: 'center',
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
      headerName: 'URL / Target',
      flex: 1,
      filter: true,
      valueGetter: (params) => params.data,
      cellRenderer: (params: { value: { url: { url: string; slug: string }; target: { name: string; slug: string } } }) => {
        if (params.value) {
          if (targetUUID || !params.value.target) {
            return <Link to={`/urls/${params.value.url.slug}`}>{params.value.url.url}</Link>;
          } else {
            return <Link to={`/targets/${params.value.target.slug}`}>{params.value.target.name}</Link>;
          }
        }
      },
    });
  }

  /**
   * This useEffect is used to listen to the SSEManager for REFRESH_PULSES_TABLE action
   */
  useEffect(() => {
    SSEManager.getInstance().addListener((message: { action: string }) => {
      if (message.action === 'REFRESH_PULSES_TABLE') {
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
        const url = targetUUID ? `targets/${targetUUID}/pulses` : urlUUID ? `urls/${urlUUID}/pulses` : 'pulses';
        if (dashboardRange.from && dashboardRange.to) {
          console.log(`Grid updated at ${refreshCells}`);

          setLoadingPulses(true);
          const queryParams = {
            sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
            filters: JSON.stringify(params.filterModel),
            startRow: params.startRow,
            endRow: params.endRow,
            from: new Date(dashboardRange.from!.setHours(0, 0, 0, 0)).toISOString(),
            to: new Date(dashboardRange.to!.setHours(23, 59, 59, 999)).toISOString(),
            team: currentTeam?.id,
          };

          const result = await sendRequest(Method.GET, url, queryParams);

          params.successCallback(result.rows, result.count);
          setLoadingPulses(false);
        }
      },
    }),
    [targetUUID, urlUUID, dashboardRange.from, dashboardRange.to, refreshCells, currentTeam?.id]
  );

  return (
    <Flex className='my-4'>
      <div style={{ width: '100%', height: 500 }}>
        <AgGridReact
          theme={gridTheme}
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
