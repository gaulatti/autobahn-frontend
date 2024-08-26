import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Title1 } from '@fluentui/react-components';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Container } from '../../../components/foundations/container';
import { Stack } from '../../../components/foundations/stack';
import { Link } from '../../../components/foundations/link';

const TeamsAdmin = () => {
  type TData = {
    mail: string;
    role: string;
  };

  const data: TData[] = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      mail: `mail${i}@mail.com`,
      role: 'admin',
    });
  }

  const colDefs: ColDef<TData>[] = [
    { field: 'mail', headerName: 'E-Mail', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
  ];

  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Teams</Title1>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link to='/admin'>Admin</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Teams</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
        </div>
      </Stack>
    </Container>
  );
};

export { TeamsAdmin };
