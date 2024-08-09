import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Spinner, Title1 } from '@fluentui/react-components';
import { ColDef, IDatasource, IGetRowsParams, ValueGetterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Method, sendRequest } from '../../clients/api';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';
import { getEnums } from '../../state/selectors/enums';

type TData = {
  uuid: string;
  url: string;
  created_at: string;
  status: number;
  mode: number;
  results: string;
};

/**
 * Colors are matching the ENUM values from the backend
 */
const semaphoreColors = ['#7f8c8d', '#f6b93b', '#27ae60', '#27ae60', '#27ae60', '#c0392b'];

const ExecutionsList = () => {
  const enums = useSelector(getEnums);
  const [refresh, setRefresh] = useState<number>(0);
  const gridRef = useRef<AgGridReact>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    gridRef.current?.api?.refreshCells();
  }, [refresh]);

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
      cellStyle: { display: 'flex' },
    },
    {
      field: 'mode',
      headerName: 'Mode',
      flex: 1,
      valueGetter: (params: ValueGetterParams<TData, any>) => params.data && enums.viewportMode[params.data.mode],
      filter: true,
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
    },
    {
      field: 'results',
      headerName: 'Actions',
      pinned: 'right',
      cellRenderer: (params: { data: TData }) =>
        params.data &&
        (params.data.status === 0 ? (
          <Spinner size='extra-tiny' />
        ) : (
          <b>
            <Link to={`/executions/${params.data?.uuid}`}>View Results</Link>
          </b>
        )),
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      sortable: false,
    },
  ];

  const dataSource: IDatasource = useMemo(
    () => ({
      rowCount: undefined,

      getRows: async (params: IGetRowsParams) => {
        console.log(JSON.stringify(params));
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
    []
  );

  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Beacon Executions</Title1>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Executions</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <Trigger setRefresh={setRefresh} />
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact
            datasource={dataSource}
            ref={gridRef}
            rowModelType='infinite'
            loading={loading}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={20}
            // sortingOrder={['desc', 'asc', null]}
          />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
