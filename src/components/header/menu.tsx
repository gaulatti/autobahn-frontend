import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const MenuLink = ({ to, title }: { to: string; title: string }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames(
          'no-underline transition-all duration-300 text-gray-800 mr-4',
          {
            'text-gray-900 font-bold': isActive,
            'hover:text-gray-600': !isActive,
          }
        )
      }
      to={to}
    >
      {title}
    </NavLink>
  );
};

export default MenuLink;

const Menu = () => {
  return (
    <section className='menu flex-1 justify-center text-center transition-all duration-300'>
      <MenuLink to='/' title='Home' />
      <MenuLink to='/admin/projects' title='Projects' />
      <MenuLink to='/admin/users' title='Users' />
      <MenuLink to='/schedules' title='Schedules' />
      <MenuLink to='/executions' title='Executions' />
    </section>
  );
};

export { Menu };
