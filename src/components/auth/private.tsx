import { fetchAuthSession } from 'aws-amplify/auth';
import { ReactNode, useEffect, useState } from 'react';
import { Header } from '../header';

const PrivateRoute = (props: { element: () => ReactNode; }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchAuthSession().then((authSession) => {
      setIsAuthenticated(!!authSession.userSub);
      if (!authSession.userSub) {
        window.location.href = '/login';
      }
    });
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or a loading spinner
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
