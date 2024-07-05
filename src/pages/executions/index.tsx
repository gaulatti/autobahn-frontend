import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';
import { ColDef } from 'ag-grid-community';

const ExecutionsList = () => {
  type TData = {
    UUID: string;
    URL: string;
    started: string;
    status: string;
    provider: string;
    ended: string | null;
    results: string;
  };

  const data: TData[] = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      UUID: i.toString(),
      URL: i % 4 == 0 ? 'https://www.clarin.com/' : 'https://www.lanacion.com.ar/',
      started: new Date().toISOString(),
      status: 'pending',
      provider: i % 3 == 0 ? 'LH/ECS' : 'Google PSI',
      ended: null,
      results: 'link',
    });
  }

  const colDefs: ColDef<TData>[] = [
    { field: 'UUID' },
    { field: 'URL' },
    { field: 'started' },
    { field: 'status' },
    { field: 'provider' },
    { field: 'results' },
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
