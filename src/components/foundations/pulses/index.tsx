import { Button } from '@fluentui/react-components';
import { Flex } from '@radix-ui/themes';
import { DateRangePickerValue } from '@tremor/react';
import { ColDef, ColGroupDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Method, sendRequest } from '../../../clients/api';
import { WebSocketManager } from '../../../engines/sockets';
import { Link } from '../link';
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
 * PulsesTable component renders a table using AgGridReact to display pulse data.
 * It supports infinite scrolling, sorting, filtering, and pagination.
 *
 * @param {Object} props - The component props.
 * @param {string} props.uuid - The unique identifier for the pulses.
 * @param {DateRangePickerValue} props.dashboardRange - The date range for filtering the pulses.
 *
 * @returns {JSX.Element} The rendered PulsesTable component.
 *
 * @component
 *
 * @example
 * const uuid = "some-uuid";
 * const dashboardRange = { from: new Date(), to: new Date() };
 * return <PulsesTable uuid={uuid} dashboardRange={dashboardRange} />;
 *
 * @remarks
 * - The component listens to WebSocketManager for the 'REFRESH_EXECUTIONS_TABLE' action to refresh the table.
 * - It uses a custom data source to fetch rows based on the provided uuid and date range.
 * - The table columns include 'Triggered' and 'Status' with nested columns for 'Desktop' and 'Mobile' statuses.
 * - The status columns use custom cell renderers to display different statuses and actions like 'Retry' and 'View Results'.
 */
const PulsesTable = ({ uuid, dashboardRange }: { uuid: string; dashboardRange: DateRangePickerValue }): JSX.Element => {
  const [loadingPulses, setLoadingPulses] = useState<boolean>(false);
  const [refreshCells, setRefreshCells] = useState<number>(0);
  const { isDarkMode } = useDarkMode();

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
        return params.data && moment(params.data!.created_at).fromNow();
      },
      filter: 'agDateColumnFilter',
      initialSort: 'desc',
      sortingOrder: ['desc', 'asc'],
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      flex: 1,
    },
    {
      headerName: 'Status',
      flex: 1,
      children: [
        {
          field: 'status',
          headerName: 'Desktop',
          width: 150,
          valueGetter: (params) => {
            return params.data?.heartbeats?.find((i: { mode: number }) => i.mode == 1);
          },
          filter: true,
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
                  <Link to={`/executions/${params?.data?.uuid}/desktop`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button onClick={() => retryHeartbeat(1, params?.data?.uuid)} className='w-full'>
                    Retry
                  </Button>
                );
              case 6:
                return 'Retrying';
            }
          },
        },
        {
          field: 'status',
          headerName: 'Mobile',

          width: 150,
          filter: true,
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
                  <Link to={`/executions/${params?.data?.uuid}/mobile`} className='w-full'>
                    View Results
                  </Link>
                );
              case 5:
                return (
                  <Button onClick={() => retryHeartbeat(0, params?.data?.uuid)} className='w-full'>
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
        if (uuid && dashboardRange.from && dashboardRange.to) {
          console.log(`Grid updated at ${refreshCells}`);

          setLoadingPulses(true);
          const queryParams = {
            sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
            filters: JSON.stringify(params.filterModel),
            startRow: params.startRow,
            endRow: params.endRow,
            from: dashboardRange.from!.toISOString(),
            to: dashboardRange.to!.toISOString(),
          };

          const result = await sendRequest(Method.GET, `stats/url/${uuid}/executions`, queryParams);

          params.successCallback(result.pulses.rows, result.pulses.count);
          setLoadingPulses(false);
        }
      },
    }),
    [refreshCells, uuid, dashboardRange]
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
