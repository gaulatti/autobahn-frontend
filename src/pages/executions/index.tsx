import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Button, Spinner, Title1 } from '@fluentui/react-components';
import { ColDef, IDatasource, IGetRowsParams, ValueGetterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Method, sendRequest } from '../../clients/api';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';
import { WebSocketManager } from '../../engines/sockets';
import { getEnums } from '../../state/selectors/enums';

type TData = {
  uuid: string;
  url: string;
  created_at: string;
  status: number;
  mode: number;
  results: string;
  retries: number;
};

/**
 * Colors are matching the ENUM values from the backend
 */
const semaphoreColors = ['#7f8c8d', '#f6b93b', '#27ae60', '#27ae60', '#27ae60', '#c0392b', '#f6b93b'];

const ExecutionsList = () => {
  const enums = useSelector(getEnums);
  const [refreshCells, setRefreshCells] = useState<number>(0);
  const gridRef = useRef<AgGridReact>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const retryExecution = useCallback(async (mode: number, uuid: string) => {
    await sendRequest(Method.POST, `executions/${uuid}/${mode === 0 ? 'mobile' : 'desktop'}/retry`);
  }, []);

  const viewResults = useCallback(
    (uuid: string) => {
      navigate(`/executions/${uuid}`);
    },
    [navigate]
  );

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

  const colDefs: ColDef<TData>[] = [
    {
      field: 'uuid',
      headerName: 'UUID',
      cellStyle: (params) => {
        const color = params.data && semaphoreColors[params.data!.status];
        return { borderLeftColor: color || '', borderLeftWidth: '5px', borderLeftStyle: 'solid' };
      },
    },
    { field: 'url', headerName: 'URL', flex: 1, filter: true },
    {
      field: 'status',
      headerName: 'Status',
      valueGetter: (params: ValueGetterParams<TData, any>) => params.data && enums.beaconStatus[params.data.status],
      filter: true,
      cellRenderer: (params: { data: TData }) => {
        switch (params.data?.status) {
          case 0:
            return 'Pending';
          case 1:
            return 'Running';
          case 2:
            return 'Lighthouse Finished';
          case 3:
            return 'Pleasantness Finished';
          case 4:
            return 'Done';
          case 5:
            return 'Failed';
          case 6:
            return `Retrying (${params.data.retries})`;
        }
      },
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    },
    {
      field: 'mode',
      headerName: 'Mode',
      flex: 1,
      valueGetter: (params: ValueGetterParams<TData, any>) => params.data && enums.viewportMode[params.data.mode],
      filter: true,
      cellRenderer: (params: { data: TData }) => {
        switch (params.data?.mode) {
          case 0:
            return 'Mobile';
          case 1:
            return 'Desktop';
        }
      },
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    },
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
    },
    {
      field: 'results',
      headerName: 'Actions',
      pinned: 'right',
      resizable: false,
      cellRenderer: (params: { data: TData }) => {
        switch (params.data?.status) {
          case 0:
          case 6:
            return <Spinner size='extra-tiny' />;
          case 5:
            return (
              <Button onClick={() => retryExecution(params.data?.mode, params.data?.uuid)} className='w-full'>
                Retry
              </Button>
            );
          default:
            return (
              <Button onClick={() => viewResults(params.data?.uuid)} className='w-full'>
                View Results
              </Button>
            );
        }
      },
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      sortable: false,
    },
  ];

  const dataSource: IDatasource = useMemo(
    () => ({
      rowCount: undefined,

      getRows: async (params: IGetRowsParams) => {
        console.log(`Grid updated at ${refreshCells}`);

        setLoading(true);
        const queryParams = {
          sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
          filters: JSON.stringify(params.filterModel),
          startRow: params.startRow,
          endRow: params.endRow,
        };

        const result = await sendRequest(Method.GET, 'executions', queryParams);

        params.successCallback(result.beacons.rows, result.beacons.count);
        setLoading(false);
      },
    }),
    [refreshCells]
  );

  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Executions</Title1>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Executions</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <Trigger />
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact
            datasource={dataSource}
            ref={gridRef}
            rowModelType='infinite'
            loading={loading}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={20}
            sortingOrder={['desc', 'asc', null]}
            autoSizeStrategy={{ type: 'fitCellContents', colIds: ['created_at', 'status', 'results'] }}
          />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
