import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';

const ExecutionsList = () => {
  // Row Data: The data to be displayed.
  const rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [{ field: 'make' }, { field: 'model' }, { field: 'price' }, { field: 'electric' }];

  return (
    <Container>
      <Stack>
        <Trigger />
        a
        <AgGridReact rowData={rowData}  />b
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
