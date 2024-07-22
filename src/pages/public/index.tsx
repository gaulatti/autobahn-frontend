import { Navigate } from 'react-router-dom';

const HomePublic = () => {
  return <Navigate to='/login' replace />;
};

export { HomePublic };
