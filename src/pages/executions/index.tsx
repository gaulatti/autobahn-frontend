import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Spinner,
  Title1,
} from '@fluentui/react-components';
import { ColDef, ColGroupDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Method, sendRequest } from '../../clients/api';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';
import { WebSocketManager } from '../../engines/sockets';

type TData = {
  uuid: string;
  url: string;
  created_at: string;
  results: string;
  heartbeats: { mode: number; status: number; retries: number }[];
};

/**
 * Colors are matching the ENUM values from the backend
 */
const semaphoreColors = ['#7f8c8d', '#f6b93b', '#27ae60', '#27ae60', '#27ae60', '#c0392b', '#f6b93b'];

const ExecutionsList = () => {
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

  const colDefs: (ColDef | ColGroupDef)[] = [
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
      headerName: 'Status',
      children: [
        {
          field: 'status',
          headerName: 'Desktop',
          width: 150,
          filter: true,
          cellRenderer: (params: { data: TData }) => {
            const current = params.data?.heartbeats?.find((i) => i.mode == 1);
            switch (current?.status) {
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
                return `Retrying (${current?.retries})`;
            }
          },
          cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
        {
          field: 'status',
          headerName: 'Mobile',
          width: 150,
          filter: true,
          cellRenderer: (params: { data: TData }) => {
            const current = params.data?.heartbeats?.find((i) => i.mode == 0);
            switch (current?.status) {
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
                return `Retrying (${current?.retries})`;
            }
          },
          cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
      ],
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
      headerName: '',
      width: 150,
      cellRenderer: (params: { data: TData }) => {
        const heartbeats = params.data?.heartbeats;
        if (heartbeats) {
          const statuses = heartbeats.map((i: { status: number }) => i.status);
          const mobile = heartbeats.find((i: { mode: number }) => i.mode === 0);
          const desktop = heartbeats.find((i: { mode: number }) => i.mode === 1);

          if (statuses.every((i: number) => [0, 6].includes(i))) {
            return <Spinner size='extra-tiny' />;
          }

          if (statuses.every((i: number) => i == 4)) {
            return (
              <Button onClick={() => viewResults(params.data?.uuid)} className='w-full'>
                View Results
              </Button>
            );
          }

          return (
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button className='w-full'>Actions</Button>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  {statuses?.find((i: number) => i === 4) && (
                    <MenuItem onClick={() => viewResults(params.data?.uuid)} className='w-full'>
                      View Partial Results
                    </MenuItem>
                  )}
                  {mobile?.status == 5 && (
                    <MenuItem onClick={() => retryExecution(0, params.data?.uuid)} className='w-full'>
                      Retry Mobile
                    </MenuItem>
                  )}
                  {desktop?.status == 5 && (
                    <MenuItem onClick={() => retryExecution(1, params.data?.uuid)} className='w-full'>
                      Retry Desktop
                    </MenuItem>
                  )}
                </MenuList>
              </MenuPopover>
            </Menu>
          );
        }
      },
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

        params.successCallback(result.pulses.rows, result.pulses.count);
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
            enableCellTextSelection={true}
            ensureDomOrder={true}
            autoSizeStrategy={{ type: 'fitCellContents', colIds: ['created_at', 'status', 'results'] }}
          />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
