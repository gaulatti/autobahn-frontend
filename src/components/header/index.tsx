import { Logo } from './logo';
import { Menu } from './menu';
import { UserMenu } from './user-menu';

const Header = () => {
  return (
    <header>
      <section>
        <Logo />
        <Menu />
        <UserMenu />
      </section>
    </header>
  );
};

export { Header };
