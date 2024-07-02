import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <section className='menuContainer'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/admin/users'>Users</NavLink>
      <NavLink to='/admin/schedules'>Schedules</NavLink>
    </section>
  );
};

export { Menu };
