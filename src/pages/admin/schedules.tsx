import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Title1, Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-components';
import { Link } from 'react-router-dom';

const SchedulesAdmin = () => {
  type TData = {
    url: string;
    start: string;
    end: string;
    periodicity: string;
    next_exec: string | null;
    provider: string;
  };

  const data: TData[] = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      url: i % 4 == 0 ? 'https://www.clarin.com/' : 'https://www.lanacion.com.ar/',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      next_exec: new Date().toISOString(),
      periodicity: 'Daily',
      provider: i % 3 == 0 ? 'LH/ECS' : 'Google PSI',
    });
  }

  const colDefs: ColDef<TData>[] = [
    { field: 'url', headerName: 'URL', flex: 1},
    { field: 'start', headerName: 'Start', flex: 1},
    { field: 'end', headerName: 'End', flex: 1},
    { field: 'periodicity', headerName: 'Periodicity', flex: 1},
    { field: 'next_exec', headerName: 'Next Execution', flex: 1},
    { field: 'provider', headerName: 'Provider', flex: 1},
  ];

  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Schedules</Title1>
        <Breadcrumb aria-label='Breadcrumb default example'>
          <BreadcrumbItem>
            <BreadcrumbButton>
              <Link to='/'>Home</Link>
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>
              <Link to='/schedules'>Schedules</Link>
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs}  pagination={true} paginationPageSize={10}/>
        </div>
      </Stack>
    </Container>
  );
};

export { SchedulesAdmin };
