import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, Title1 } from '@fluentui/react-components';
import { Container, Section } from '@radix-ui/themes';
import { Link } from '../../../components/foundations/link';
const CreateSchedule = () => {
  return (
    <Container>
      <Section size='1'>
        <Title1 className='text-left'>Create Schedule</Title1>
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
            <Link to='/admin/schedules'>Schedules</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <b>Create New Schedule</b>
          </BreadcrumbItem>
        </Breadcrumb>
        TODO
      </Section>
    </Container>
  );
};

export { CreateSchedule };
