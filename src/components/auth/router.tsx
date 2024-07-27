import { Spinner } from '@fluentui/react-components';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuth';
import { Home } from '../../pages';
import { ProjectsAdmin } from '../../pages/admin/projects';
import { CreateProject } from '../../pages/admin/projects/create';
import { SchedulesAdmin } from '../../pages/admin/schedules';
import { CreateSchedule } from '../../pages/admin/schedules/create';
import { TeamsAdmin } from '../../pages/admin/teams';
import { CreateTeam } from '../../pages/admin/teams/create';
import { UsersAdmin } from '../../pages/admin/users';
import { ExecutionsList } from '../../pages/executions';
import { ExecutionDetails } from '../../pages/executions/details';
import { HomePublic } from '../../pages/public';
import { getKickoffReady } from '../../state/selectors/lifecycle';
import { getTeams } from '../../state/selectors/teams';
import { Header } from '../header';

/**
 * Renders the authenticated router component.
 * This component handles the routing logic based on the user's authentication
 * status and other conditions.
 *
 * If the user is authenticated and the kickoff is ready:
 * it renders the main content with the header and routes.
 *
 * If the user is not authenticated:
 * it redirects to the login page if the current page is not a public page.
 *
 * If the user is not authenticated or the kickoff is not ready:
 * it renders a loading spinner.
 */
const AuthenticatedRouter = () => {
  const { isAuthenticated, isLoaded } = useAuthStatus();
  const teams = useSelector(getTeams);
  const isKickoffReady = useSelector(getKickoffReady);
  const { pathname } = useLocation();

  /**
   * List of public pages that are accessible without authentication.
   */
  const publicPages: string[] = [];

  /**
   * Renders the main content with the header and routes if the user
   * is authenticated and the kickoff is ready.
   */
  if (isAuthenticated && isLoaded && isKickoffReady) {
    return <>
      <Header />
      <main className='flex justify-center'>
        {teams.length ? (
          <Routes>
            <Route path='/admin/projects/create' element={<CreateProject />} />
            <Route path='/admin/projects' element={<ProjectsAdmin />} />
            <Route path='/admin/teams/create' element={<CreateTeam />} />
            <Route path='/admin/teams' element={<TeamsAdmin />} />
            <Route path='/admin/users' element={<UsersAdmin />} />
            <Route path='/schedules/create' element={<CreateSchedule />} />
            <Route path='/schedules' element={<SchedulesAdmin />} />
            <Route path='/executions' element={<ExecutionsList />} />
            <Route path="/executions/:uuid" element={<ExecutionDetails />} />
            <Route path='/' element={<Home />} />
          </Routes>
        ) : (
          <>no teams</>
        )}
      </main>
    </>;
  }

  /**
   * Redirects to the login page if the user is not authenticated
   * and the current page is not a public page.
   */
  const currentPage = pathname.split('/').pop() || '';
  if (isLoaded && !isAuthenticated) {
    if (publicPages.includes(currentPage) || pathname === '/') {
      return (
        <Routes>
          <Route path='/' element={<HomePublic />} />
        </Routes>
      );
    } else {
      return <Navigate to='/login' replace />;
    }
  }

  /**
   * Renders a loading spinner if the user is not authenticated
   * or the kickoff is not ready.
   */
  return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner size='huge' />
    </div>
  );
};

export { AuthenticatedRouter };
