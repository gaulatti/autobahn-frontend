import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <section className='menuContainer'>
      <NavLink className={({ isActive }) => isActive ? `active` : ''} to='/'>Home</NavLink>
      <NavLink className={({ isActive }) => isActive ? `active` : ''} to='/admin/users'>Users</NavLink>
      <NavLink className={({ isActive }) => isActive ? `active` : ''} to='/admin/schedules'>Schedules</NavLink>
      <NavLink className={({ isActive }) => isActive ? `active` : ''} to='/admin/executions'>Executions</NavLink>
    </section>
  );
};

export { Menu };
