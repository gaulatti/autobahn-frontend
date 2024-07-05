import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';
import { ColDef } from 'ag-grid-community';
const ExecutionsList = () => {
  type TData = {
    make: string;
    model: string;
    price: number;
    electric: boolean;
  };

  const rowData: TData[] = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  const colDefs: ColDef<TData>[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }, { field: 'electric' }];

  return (
    <Container>
      <Stack>
        <Trigger />
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
