import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Title1 } from '@fluentui/react-components';
import { Container, Section } from '@radix-ui/themes';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Link } from '../../../components/foundations/link';
const UsersAdmin = () => {
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
      <Section>
        <Title1 className='text-left'>Users</Title1>
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
            <b>Users</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
        </div>
      </Section>
    </Container>
  );
};

export { UsersAdmin };
