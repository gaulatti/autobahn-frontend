import { Container, Heading, Section } from '@radix-ui/themes';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Link } from '../../../components/foundations/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '../../../components/ui/breadcrumb';

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
      <Section size='1'>
        <Heading as="h1" className='text-left'>Teams</Heading>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to='/admin'>Admin</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <b>Teams</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
        </div>
      </Section>
    </Container>
  );
};

export { TeamsAdmin };
