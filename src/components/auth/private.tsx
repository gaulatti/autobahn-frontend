import { fetchAuthSession } from 'aws-amplify/auth';
import { ReactNode, useEffect, useState } from 'react';
import { Header } from '../header';
import { useSelector } from 'react-redux';
import { getKickoffReady } from '../../state/selectors/lifecycle';
import { Spinner } from '@fluentui/react-components';

const PrivateRoute = (props: { element: () => ReactNode; }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isKickoffReady = useSelector(getKickoffReady);
  useEffect(() => {
    fetchAuthSession().then((authSession) => {
      setIsAuthenticated(!!authSession.userSub);
      if (!authSession.userSub) {
        window.location.href = '/login';
      }
    });
  }, []);

  if (!isAuthenticated || !isKickoffReady) {

    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size='huge' />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className='flex justify-center'>
          { props.element() }
      </main>
    </>
  );
};

export { PrivateRoute };
