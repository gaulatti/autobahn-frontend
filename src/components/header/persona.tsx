import { Persona } from '@fluentui/react-components';
import { url } from 'gravatar';
import { useEffect, useState } from 'react';
import { useAuthStatus } from '../../hooks/useAuth';

const UserPersona = () => {
  const { currentUser } = useAuthStatus();

  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (currentUser) {
      setAvatar(url(currentUser.email));
    }
  }, [currentUser, setAvatar]);

  return (
    currentUser && (
      <div className='user-menu'>
        <Persona
          name={`${currentUser.name} ${currentUser.last_name}`}
          secondaryText={currentUser.email}
          presence={{ status: 'available' }}
          avatar={{
            image: {
              src: `https:${avatar}`
            },
          }}
        />
      </div>
    )
  );
};

export { UserPersona };
