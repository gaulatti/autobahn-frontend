import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Title1,
} from '@fluentui/react-components';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
import { Dismiss24Regular } from "@fluentui/react-icons";
const UsersAdmin = () => {
  const { pathname } = useLocation();
  const action = pathname.split('/').pop();
  const navigate = useNavigate();
  // const [isDrawerOpen, setIsDrawerOpen] = useState(action === 'create');

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
        {action === 'create' && (
          <Drawer
            type='overlay'
            separator
            open={true}
            position='end'
            // onOpenChange={(_, { open }) => setIsOpen(open)}
          >
            <DrawerHeader>
              <DrawerHeaderTitle
                action={
                  <Button
                    appearance='subtle'
                    aria-label='Close'
                    icon={<Dismiss24Regular />}
                    onClick={() => navigate('/admin/users')}
                  />
                }
              >
                Default Drawer
              </DrawerHeaderTitle>
            </DrawerHeader>

            <DrawerBody>
              <p>Drawer content</p>
            </DrawerBody>
          </Drawer>
        )}
        <Title1 className='text-left'>Users</Title1>
        <Breadcrumb aria-label='Breadcrumb default example'>
          <BreadcrumbItem>
            <BreadcrumbButton>
              <Link to='/'>Home</Link>
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>
              <Link to='/admin'>Admin</Link>
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>
              <Link to='/admin/users'>Users</Link>
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className='ag-theme-quartz w-full' style={{ width: '100%', height: 500 }}>
          <AgGridReact rowData={data} columnDefs={colDefs} pagination={true} paginationPageSize={10} />
        </div>
      </Stack>
    </Container>
  );
};

export { UsersAdmin };
function setIsOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}
