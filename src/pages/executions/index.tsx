import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Title1,
  ToolbarButton
} from '@fluentui/react-components';
import { MoreHorizontal24Filled } from '@fluentui/react-icons';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Link } from 'react-router-dom';
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
    stage: string;
    mode: string;
  };

  const data: TData[] = [];
  for (let i = 0; i < 60; i++) {
    data.push({
      uuid: i.toString(),
      url: i % 4 == 0 ? 'https://www.clarin.com/' : 'https://www.lanacion.com.ar/',
      started: new Date().toISOString(),
      status: 'Pending',
      provider: i % 3 == 0 ? 'LH/ECS' : 'Google PSI',
      ended: null,
      results: 'link',
      stage: Math.ceil(Math.random() * 100) % 2 == 0 ? 'Staging' : 'Production',
      mode: Math.ceil(Math.random() * 100) % 2 == 0 ? 'Desktop' : 'Mobile',
    });
  }

  const colDefs: ColDef<TData>[] = [
    { field: 'uuid', headerName: 'UUID', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'provider', headerName: 'Provider', flex: 1 },
    { field: 'stage', headerName: 'Stage', flex: 1 },
    { field: 'mode', headerName: 'Mode', flex: 1 },
    {
      field: 'results',
      headerName: 'Actions',
      flex: 1,
      cellRenderer: (params: { data: TData }) => {
        return (
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <ToolbarButton aria-label='More' icon={<MoreHorizontal24Filled />} />
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem>
                  <Link to={`/executions/${params.data.uuid}`}>View Results</Link>
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        );
      },
    },
  ];

  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Beacon Executions</Title1>
        <Breadcrumb aria-label='Breadcrumb default example'>
          <BreadcrumbItem>
            <BreadcrumbButton>
              <Link to='/'>Home</Link>
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>
              <Link to='/executions'>Executions</Link>
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
        <Trigger />
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
