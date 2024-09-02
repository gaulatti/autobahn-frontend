import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Title1 } from '@fluentui/react-components';
import { Container, Section } from '@radix-ui/themes';
import { Link } from '../../../components/foundations/link';
const CreateTeam = () => {
  return (
    <Container>
      <Section>
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
      </Section>
    </Container>
  );
};

export { CreateTeam };
