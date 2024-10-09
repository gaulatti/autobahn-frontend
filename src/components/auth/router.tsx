import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuth';
import { Home } from '../../pages';
import { NotFound } from '../../pages/404';
import { TeamsAdmin } from '../../pages/admin/teams';
import { CreateTeam } from '../../pages/admin/teams/create';
import { UsersAdmin } from '../../pages/admin/users';
import { ExecutionsList } from '../../pages/pulses';
import { ExecutionDetails } from '../../pages/pulses/details';
import { ProjectsList } from '../../pages/projects';
import { ProjectDetails } from '../../pages/projects/project';
import { SchedulesList } from '../../pages/projects/schedules';
import { HomePublic } from '../../pages/public';
import { TargetsList } from '../../pages/targets';
import { TargetDetails } from '../../pages/targets/target';
import { UrlsList } from '../../pages/urls';
import { getKickoffReady } from '../../state/selectors/lifecycle';
import { getTeams } from '../../state/selectors/teams';
import { OverlaySpinner } from '../foundations/spinners';
import { Header } from '../header';
import { URLStats } from '../../pages/urls/url';

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
    return (
      <>
        <Header />
        <main className='flex justify-center'>
          {teams.length ? (
            <Routes>
              <Route path='/pulses' element={<ExecutionsList />} />
              <Route path='/pulses/:uuid/desktop' element={<ExecutionDetails />} />
              <Route path='/pulses/:uuid/mobile' element={<ExecutionDetails />} />
              <Route path='/urls/' element={<UrlsList />} />
              <Route path='/urls/:uuid' element={<URLStats />} />
              <Route path='/targets/:uuid' element={<TargetDetails />} />
              <Route path='/targets/' element={<TargetsList />} />
              <Route path='/projects/:uuid/schedules' element={<SchedulesList />} />
              <Route path='/projects/:uuid' element={<ProjectDetails />} />
              <Route path='/projects/' element={<ProjectsList />} />
              <Route path='/admin/teams/create' element={<CreateTeam />} />
              <Route path='/admin/teams' element={<TeamsAdmin />} />
              <Route path='/admin/users' element={<UsersAdmin />} />
              <Route path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          ) : (
            <>no teams</>
          )}
        </main>
      </>
    );
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
  return <OverlaySpinner />;
};

export { AuthenticatedRouter };
