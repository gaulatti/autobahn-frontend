import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Spinner, Title1 } from '@fluentui/react-components';
import { Container } from '../../components/foundations/container';
import { useParams } from 'react-router-dom';
import { Stack } from '../../components/foundations/stack';
import { Link } from '../../components/foundations/link';
import { URLNavbar } from '../../components/foundations/url-navbar';
import { Method, sendRequest, useAPI } from '../../clients/api';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { useMemo, useRef, useState } from 'react';
import moment from 'moment';
const semaphoreColors = ['#7f8c8d', '#f6b93b', '#27ae60', '#27ae60', '#27ae60', '#c0392b', '#f6b93b'];

type TData = {
  uuid: string;
  created_at: string;
  results: string;
  heartbeats: { mode: number; status: number; retries: number }[];
};

const URLStats = () => {
  const { uuid } = useParams();
  const { loading, data } = useAPI(Method.GET, [], `stats/url/${uuid}`);
  const [loadingExecutions, setLoadingExecutions] = useState<boolean>(false);
  const gridRef = useRef<AgGridReact>(null);

  const colDefs: (ColDef | ColGroupDef)[] = [
    {
      field: 'uuid',
      headerName: 'UUID',
      cellStyle: (params) => {
        const color = params.data && semaphoreColors[params.data!.status];
        return { borderLeftColor: color || '', borderLeftWidth: '5px', borderLeftStyle: 'solid' };
      },
      cellRenderer: (params: { value: any; data: any }) => {
        /**
         * To display the link, at least one of the heartbeats should be finished
         */
        const allowResults = params.data?.heartbeats?.find((i: { status: number }) => i.status === 4);
        return allowResults ? (
          <Link to={`/executions/${params?.value}`} className='w-full'>
            {params?.value}
          </Link>
        ) : (
          params?.value
        );
      },
    },
    {
      headerName: 'Status',
      children: [
        {
          field: 'status',
          headerName: 'Desktop',
          width: 150,
          valueGetter: (params) => {
            return params.data?.heartbeats?.find((i: { mode: number }) => i.mode == 1);
          },
          filter: true,
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
                return <Spinner size='extra-tiny' />;
              case 1:
                return <Spinner size='extra-tiny' />;
              case 2:
                return 'Lighthouse Finished';
              case 3:
                return 'Pleasantness Finished';
              case 4:
                return 'Done';
              case 5:
                return 'Failed';
              case 6:
                return <Spinner size='extra-tiny' />;
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
                return <Spinner size='extra-tiny' />;
              case 1:
                return <Spinner size='extra-tiny' />;
              case 2:
                return 'Lighthouse Finished';
              case 3:
                return 'Pleasantness Finished';
              case 4:
                return 'Done';
              case 5:
                return 'Failed';
              case 6:
                return <Spinner size='extra-tiny' />;
            }
          },
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
  ];

  const dataSource: IDatasource = useMemo(
    () => ({
      rowCount: undefined,

      getRows: async (params: IGetRowsParams) => {
        // console.log(`Grid updated at ${refreshCells}`);

        setLoadingExecutions(true);
        const queryParams = {
          sort: params.sortModel.map((sort) => `${sort.colId},${sort.sort}`).join(';'),
          filters: JSON.stringify(params.filterModel),
          startRow: params.startRow,
          endRow: params.endRow,
        };

        const result = await sendRequest(Method.GET, `stats/url/${uuid}/executions`, queryParams);

        params.successCallback(result.pulses.rows, result.pulses.count);
        setLoadingExecutions(false);
      },
    }),
    [uuid]
  );

  return (
    <Container>
      <Stack>
        <Title1>URL Stats Aggregate</Title1>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Stats</BreadcrumbItem>
        </Breadcrumb>
        {loading ? (
          <div className='spinner-overlay'>
            <Spinner size='huge' />
          </div>
        ) : (
          <>
            <URLNavbar>{data?.urlRecord.url}</URLNavbar>
            <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
              <AgGridReact
                datasource={dataSource}
                ref={gridRef}
                rowModelType='infinite'
                loading={loadingExecutions}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={20}
                sortingOrder={['desc', 'asc', null]}
                enableCellTextSelection={true}
                ensureDomOrder={true}
                autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 100 }}
              />
            </div>
          </>
        )}
      </Stack>
    </Container>
  );
};

export { URLStats };
