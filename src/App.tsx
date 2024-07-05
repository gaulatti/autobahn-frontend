import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/auth/private';
import { useLifecycle } from './hooks/useLifecycle';
import { Home } from './pages';
import { ProjectsAdmin } from './pages/admin/projects';
import { SchedulesAdmin } from './pages/admin/schedules';
import { UsersAdmin } from './pages/admin/users';
import { Logout } from './pages/auth/logout';
import { ExecutionsList } from './pages/executions';

function App() {
  /**
   * Manages the lifecycle of the application.
   */
  useLifecycle();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute element={Home} />} />
        <Route path='/admin/users' element={<PrivateRoute element={UsersAdmin} />} />
        <Route path='/admin/projects' element={<PrivateRoute element={ProjectsAdmin} />} />
        <Route path='/admin/schedules' element={<PrivateRoute element={SchedulesAdmin} />} />
        <Route path='/executions' element={<PrivateRoute element={ExecutionsList} />} />
        <Route path='/logout' element={<PrivateRoute element={Logout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
