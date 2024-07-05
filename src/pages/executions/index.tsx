import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';

const ExecutionsList = () => {
  type TData = {
    uuid: string;
    url: string;
    started: string;
    status: string;
    provider: string;
    ended: string | null;
    results: string;
  };

  const data: TData[] = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      uuid: i.toString(),
      url: i % 4 == 0 ? 'https://www.clarin.com/' : 'https://www.lanacion.com.ar/',
      started: new Date().toISOString(),
      status: 'pending',
      provider: i % 3 == 0 ? 'LH/ECS' : 'Google PSI',
      ended: null,
      results: 'link',
    });
  }

  const colDefs: ColDef<TData>[] = [
    { field: 'uuid', headerName: 'UUID', flex: 1},
    { field: 'url', headerName: 'URL', flex: 1},
    { field: 'started', headerName: 'Started', flex: 1},
    { field: 'status', headerName: 'Status', flex: 1},
    { field: 'provider', headerName: 'Provider', flex: 1},
    { field: 'results', headerName: 'Results', flex: 1},
  ];

  return (
    <Container>
      <Stack>
        <Trigger />
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
