import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Header } from '../header';

const PrivateRoute = (props: { element: () => ReactNode; }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchAuthSession().then((authSession) => {
      setIsAuthenticated(!!authSession.userSub);
      if (!authSession.userSub) {
        signInWithRedirect({ provider: { custom: 'Okta' } });
      }
    });
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <>
      <Header />
      <main>
          { props.element() }
      </main>
    </>
  );
};

export { PrivateRoute };
