import { Flex } from 'antd';
import { Logo } from './logo';
import { Menu } from './menu';
import { UserMenu } from './user-menu';

const Header = () => {
  return (
    <header>
      <Flex justify='center'>
        <section>
          <Flex justify='space-between' className='header'>
            <Flex className='menu'>
              <Logo  />
              <Menu />
            </Flex>
            <UserMenu />
          </Flex>
        </section>
      </Flex>
    </header>
  );
};

export { Header };
