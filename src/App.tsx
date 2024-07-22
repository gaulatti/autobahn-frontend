import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthenticatedRouter } from './components/auth/router';
import { Login } from './pages/auth/login';
import { Logout } from './pages/auth/logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<AuthenticatedRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
