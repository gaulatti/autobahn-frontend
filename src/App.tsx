import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/auth/private';
import { Home } from './pages';
import { ProjectsAdmin } from './pages/admin/projects';
import { Login } from './pages/auth/login';
import { Logout } from './pages/auth/logout';
import { ExecutionsList } from './pages/executions';
import { TeamsAdmin } from './pages/admin/teams';
import { UsersAdmin } from './pages/admin/users';
import { SchedulesAdmin } from './pages/admin/schedules';
import { CreateProject } from './pages/admin/projects/create';
import { CreateSchedule } from './pages/admin/schedules/create';
import { CreateTeam } from './pages/admin/teams/create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/users' element={<PrivateRoute private={UsersAdmin} />} />
        <Route path='/admin/projects/create' element={<PrivateRoute private={CreateProject} />} />
        <Route path='/admin/projects' element={<PrivateRoute private={ProjectsAdmin} />} />
        <Route path='/admin/teams/create' element={<PrivateRoute private={CreateTeam} />} />
        <Route path='/admin/teams' element={<PrivateRoute private={TeamsAdmin} />} />
        <Route path='/schedules/create' element={<PrivateRoute private={CreateSchedule} />} />
        <Route path='/schedules' element={<PrivateRoute private={SchedulesAdmin} />} />
        <Route path='/executions' element={<PrivateRoute private={ExecutionsList} />} />
        <Route path='/' element={<PrivateRoute private={Home} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
