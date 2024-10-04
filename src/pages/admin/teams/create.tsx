import { Container, Heading, Section } from '@radix-ui/themes';
import { Link } from '../../../components/foundations/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '../../../components/ui/breadcrumb';

const CreateTeam = () => {
  return (
    <Container>
      <Section size='1'>
        <Heading as="h1" className='text-left'>Create Team</Heading>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to='/admin'>Admin</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to='/admin/teams'>Teams</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
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
