import { Avatar, Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { useAuthStatus } from '../../hooks/useAuth';
import { useCallback } from 'react';
const UserMenu = () => {
  const { currentUser } = useAuthStatus();

  const logout = useCallback(() => {
    window.location.href = '/logout';
  }, [])

  return (
    <div className='user-menu'>
      <Avatar className='user-menu-avatar' />
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button>{currentUser?.name}</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export { UserMenu };
