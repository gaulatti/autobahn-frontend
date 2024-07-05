import { Container } from '../foundations/container';
import { Logo } from './logo';
import { Menu } from './menu';
import { UserMenu } from './user-menu';

const Header = () => {
  return (
    <header className='flex justify-center items-center border-b border-gray-300 mb-4'>
      <Container>
        <Logo />
        <Menu />
        <UserMenu />
      </Container>
    </header>
  );
};

export { Header };
