import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';

const UsersAdmin = () => {
  type TData = {
    mail: string;
    role: string;
  };

  const data: TData[] = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      mail: `mail${i}@mail.com`,
      role: 'admin'
    });
  }

  const colDefs: ColDef<TData>[] = [
    { field: 'mail', headerName: 'E-Mail', flex: 1},
    { field: 'role', headerName: 'Role', flex: 1},
  ];

  return (
    <Container>
      <Stack>
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} />
        </div>
      </Stack>
    </Container>
  );
};

export { UsersAdmin };
