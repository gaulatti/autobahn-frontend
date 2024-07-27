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
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Method, useAPI } from '../../clients/api';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Trigger } from '../../components/trigger';
import { getEnums } from '../../state/selectors/enums';

type TData = {
  uuid: string;
  url: string;
  created_at: string;
  status: number;
  mode: number;
  results: string;
};

const ExecutionsList = () => {
  const enums = useSelector(getEnums);
  const [refresh, setRefresh] = useState<number>(0);
  const { loading, data } = useAPI(Method.GET, [refresh], 'executions');

  const colDefs: ColDef<TData>[] = [
    { field: 'uuid', headerName: 'UUID', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1, cellRenderer: (params: { data: TData }) => enums.beaconStatus[params.data.status] },
    { field: 'mode', headerName: 'Mode', flex: 1, cellRenderer: (params: { data: TData }) => enums.viewportMode[params.data.mode] },
    { field: 'created_at', headerName: 'Triggered', flex: 1, cellRenderer: (params: { data: TData }) => moment(params.data.created_at).fromNow() },
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
              <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Executions</b>
          </BreadcrumbItem>
        </Breadcrumb>
        <Trigger setRefresh={setRefresh} />
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact loading={loading} rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={20} />
        </div>
      </Stack>
    </Container>
  );
};

export { ExecutionsList };
