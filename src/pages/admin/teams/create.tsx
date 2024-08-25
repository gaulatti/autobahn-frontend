import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Title1 } from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/foundations/container';
import { Stack } from '../../../components/foundations/stack';
const CreateTeam = () => {
  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Create Team</Title1>
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
            <Link to='/admin/teams'>Teams</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Create New Team</b>
          </BreadcrumbItem>
        </Breadcrumb>
        TODO
      </Stack>
    </Container>
  );
};

export { CreateTeam };
