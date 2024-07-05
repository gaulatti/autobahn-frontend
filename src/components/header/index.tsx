import { Container } from '../foundations/container';
import { Logo } from './logo';
import { Menu } from './menu';
import { UserMenu } from './user-menu';

const Header = () => {
  return (
    <header>
      <Container>
        <Logo />
        <Menu />
        <UserMenu />
      </Container>
    </header>
  );
};

export { Header };
