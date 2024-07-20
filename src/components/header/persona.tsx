import { Persona } from '@fluentui/react-components';
import { url } from 'gravatar';
import { useEffect, useState } from 'react';
import { useAuthStatus } from '../../hooks/useAuth';

/**
 * Renders the user persona component.
 * This component displays the user's avatar, name, and email.
 */
const UserPersona = () => {
  const { currentUser } = useAuthStatus();

  const [avatar, setAvatar] = useState<string>();

  /**
   * Sets the avatar URL when the user is loaded.
   */
  useEffect(() => {
    if (currentUser) {
      setAvatar(url(currentUser.email));
    }
  }, [currentUser, setAvatar]);

  return (
    avatar &&
    currentUser && (
      <div className='user-menu'>
        <Persona
          name={`${currentUser.name} ${currentUser.last_name}`}
          secondaryText={currentUser.email}
          presence={{ status: 'available' }}
          avatar={{
            image: {
              src: `https:${avatar}`,
            },
          }}
        />
      </div>
    )
  );
};

export { UserPersona };
