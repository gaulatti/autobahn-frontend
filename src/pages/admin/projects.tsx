import { Breadcrumb, BreadcrumbButton, BreadcrumbDivider, BreadcrumbItem, Title1 } from '@fluentui/react-components';
import { Container } from '../../components/foundations/container';
import { Stack } from '../../components/foundations/stack';
const path = 'https://www.bing.com/';

const ProjectsAdmin = () => {
  return (
    <Container>
      <Stack>
        <Title1 className='text-left'>Projects</Title1>
        <Breadcrumb aria-label='Breadcrumb default example'>
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Projects</BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
    </Container>
  );
};

export { ProjectsAdmin };
