import { Avatar, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, ToolbarButton } from '@fluentui/react-components';
import { url } from 'gravatar';
import { useCallback, useEffect, useState } from 'react';
import { useAuthStatus } from '../../hooks/useAuth';

const UserMenu = () => {
  const { currentUser } = useAuthStatus();

  const logout = useCallback(() => {
    window.location.href = '/logout';
  }, []);

  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  useEffect(() => {
    if(currentUser) {
      setAvatar(url(currentUser.email));
    }
  }, [currentUser, setAvatar])

  console.log();

  return (
    currentUser && (
      <div className='user-menu'>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <ToolbarButton aria-label='More' icon={<Avatar className='user-menu-avatar' image={{ src: `https:${avatar}` }} />}>
              {currentUser?.name}
            </ToolbarButton>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    )
  );
};

export { UserMenu };
