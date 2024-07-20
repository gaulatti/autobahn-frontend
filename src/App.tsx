import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/auth/private';
import { Home } from './pages';
import { ProjectsAdmin } from './pages/admin/projects';
import { SchedulesAdmin } from './pages/admin/schedules';
import { UsersAdmin } from './pages/admin/users';
import { Login } from './pages/auth/login';
import { Logout } from './pages/auth/logout';
import { ExecutionsList } from './pages/executions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/users/create' element={<PrivateRoute private={UsersAdmin} />} />
        <Route path='/admin/users' element={<PrivateRoute private={UsersAdmin} />} />
        <Route path='/admin/projects/create' element={<PrivateRoute private={ProjectsAdmin} />} />
        <Route path='/admin/projects' element={<PrivateRoute private={ProjectsAdmin} />} />
        <Route path='/schedules/create' element={<PrivateRoute private={SchedulesAdmin} />} />
        <Route path='/schedules' element={<PrivateRoute private={SchedulesAdmin} />} />
        <Route path='/executions' element={<PrivateRoute private={ExecutionsList} />} />
        <Route path='/' element={<PrivateRoute private={Home} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
