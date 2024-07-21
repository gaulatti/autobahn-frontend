import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Title1 } from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/foundations/container';
import { Stack } from '../../../components/foundations/stack';
const CreateProject = () => {
  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Create Project</Title1>
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
            <Link to='/admin/projects'>Projects</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Create New Project</b>
          </BreadcrumbItem>
        </Breadcrumb>
        TODO
      </Stack>
    </Container>
  );
};

export { CreateProject };
