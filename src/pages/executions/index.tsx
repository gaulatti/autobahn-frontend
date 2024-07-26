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
  ToolbarButton,
} from '@fluentui/react-components';
import { MoreHorizontal24Filled } from '@fluentui/react-icons';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Link } from 'react-router-dom';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';
import { Method, useAPI } from '../../clients/api';

type TData = {
  uuid: string;
  url: string;
  created_at: string;
  status: string;
  results: string;
};

const ExecutionsList = () => {
  const { loading, data } = useAPI(Method.GET, 'executions');

  const colDefs: ColDef<TData>[] = [
    { field: 'uuid', headerName: 'UUID', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'created_at', headerName: 'Triggered', flex: 1 },
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
          <AgGridReact loading={loading} rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
