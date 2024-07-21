import {
  Breadcrumb,
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
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/foundations/container';
import { Stack } from '../../../components/foundations/stack';
const ProjectsAdmin = () => {
  type TData = {
    id: number;
    name: string;
    team: string;
    actions: string;
  };

  const data: TData[] = [];
  for (let i = 0; i < 13; i++) {
    data.push({
      id: i,
      name: `Project ${i}`,
      team: 'A Team',
      actions: '',
    });
  }

  const colDefs: ColDef<TData>[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'team', headerName: 'Team', flex: 1 },
    {
      field: 'actions',
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
                  <Link to={`/admin/projects/${params.data.id}/executions`}>View Executions</Link>
                  <Link to={`/admin/projects/${params.data.id}/targets`}>View Targets</Link>
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
        <Title1 className='text-left'>Projects</Title1>
        <Breadcrumb aria-label='Breadcrumb default example'>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link to='/admin'>Admin</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Projects</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
        </div>
      </Stack>
    </Container>
  );
};

export { ProjectsAdmin };
