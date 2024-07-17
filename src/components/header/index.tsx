import { Tooltip } from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  bundleIcon,
  DocumentCatchUpFilled,
  DocumentCatchUpRegular,
  PeopleTeamFilled,
  PeopleTeamRegular,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
} from '@fluentui/react-icons';
import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../foundations/container';
import { Logo } from './logo';
import { UserMenu } from './user-menu';
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Users = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Projects = bundleIcon(DocumentCatchUpFilled, DocumentCatchUpRegular);
const Teams = bundleIcon(PeopleTeamRegular, PeopleTeamFilled);
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (event.target.classList.contains('fui-OverlayDrawer__backdrop') && isOpen) {
        setIsOpen(false)
      }
    };

    // Add event listener
    document.addEventListener('click', handleClick);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [setIsOpen, isOpen]);

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content='Navigation' relationship='label'>
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <header className='flex justify-center items-center border-b border-gray-300 mb-4'>
      <NavDrawer defaultSelectedValue='2' defaultSelectedCategoryValue='1' open={isOpen}>
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
        <NavDrawerBody>
          <NavItem icon={<Dashboard />} value='1' onClick={() => setIsOpen(!isOpen)}>
            <Link to='/'>Dashboard</Link>
          </NavItem>
          <NavSectionHeader>Management</NavSectionHeader>
          <NavCategory value='2'>
            <NavCategoryItem icon={<Users />}>Users</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='3' onClick={() => setIsOpen(!isOpen)}>
                <Link to='/admin/users'>List of Users</Link>
              </NavSubItem>
              <NavSubItem value='4' onClick={() => setIsOpen(!isOpen)}>
                <Link to='/admin/users/new'>Create New</Link>
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value='5'>
            <NavCategoryItem icon={<Projects />}>Projects</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='6' onClick={() => setIsOpen(!isOpen)}>
                <Link to='/admin/projects'>List of Projects</Link>
              </NavSubItem>
              <NavSubItem value='7' onClick={() => setIsOpen(!isOpen)}>
                <Link to='/admin/projects/new'>Create New</Link>
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value='8'>
            <NavCategoryItem icon={<Teams />}>Teams</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='9' onClick={() => setIsOpen(!isOpen)}>
                <Link to='/admin/teams'>List of Teams</Link>
              </NavSubItem>
              <NavSubItem value='10' onClick={() => setIsOpen(!isOpen)}>
                <Link to='/admin/teams/new'>Create New</Link>
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
        </NavDrawerBody>
      </NavDrawer>
      <Container>
        {renderHamburgerWithToolTip()}
        <Logo />
        <UserMenu />
      </Container>
    </header>
  );
};

export { Header };
