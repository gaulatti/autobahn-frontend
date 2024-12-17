import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import styled from '@emotion/styled';
import { MixerVerticalIcon } from '@radix-ui/react-icons';
import { Avatar, Container, DropdownMenu, Flex, IconButton } from '@radix-ui/themes';
import { forwardRef } from 'react';
import { NavLink, useNavigate } from 'react-router';

const MenuBackground = styled.section`
  height: 50px;
  background: white;
  display: flex;
  align-items: center;
  color: black;
  font-size: 0.8rem;
  font-variant: small-caps;
  box-shadow: 0 4px 6px rgba(128, 128, 128, 0.4), 0 2px 4px rgba(243, 243, 243, 0.6);
  font-weight: bold;
`;

const MenuContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MenuList = styled(NavigationMenuList)`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const NavMenu = styled(NavigationMenu)`
  & > div {
    width: 100vw;
  }
`;

const MenuLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  height: 50px;
  display: inline-flex;
  line-height: 50px;
  padding: 0 1rem;
  position: relative;
  border-bottom: 0;

  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #f6931e;
    transition: width 1s ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #ccc;
    transition: width 0.2s ease-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

const SettingsMenu = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton>
          <MixerVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Flex gap='2' className='m-3'>
          <Avatar src='https://avatars.githubusercontent.com/u/4602751?v=4' fallback='J' />
          <Flex direction='column'>
            <b>Javier</b>
            <small>jack@gaulatti.com</small>
          </Flex>
        </Flex>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => navigate('/preferences')}>Preferences</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Settings</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item onClick={() => navigate('/admin')}>Admin Panel</DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate('/users')}>Users</DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate('/teams')}>Teams</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item  onClick={() => navigate('/logout')} color='red'>
          Exit
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const Menu = () => {
  return (
    <MenuBackground>
      <MenuContainer className='w-full'>
        <NavMenu className='w-full'>
          <MenuList className='w-full c'>
            <section>
              <NavigationMenuItem>
                <MenuLink to='/' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}>
                  HOME
                </MenuLink>
              </NavigationMenuItem>
            </section>
            <NavigationMenuItem>
              <SettingsMenu />
            </NavigationMenuItem>
          </MenuList>
        </NavMenu>
      </MenuContainer>
    </MenuBackground>
  );
};

export { Menu };
