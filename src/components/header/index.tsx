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
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuth';
import { Container } from '../foundations/container';
import { Logo } from './logo';
import { UserPersona } from './persona';
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Users = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Projects = bundleIcon(DocumentCatchUpFilled, DocumentCatchUpRegular);
const Teams = bundleIcon(PeopleTeamRegular, PeopleTeamFilled);
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuthStatus();

  useEffect(() => {
    /**
     * Handles the click event for the header component.
     * Closes the overlay drawer if the click target is the backdrop and the drawer is open.
     * @param event - The click event.
     */
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.classList.contains('fui-OverlayDrawer__backdrop') && isOpen) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('click', handleClick);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [setIsOpen, isOpen]);

  /**
   * Renders a hamburger icon with a tooltip for navigation.
   * @returns The JSX element representing the hamburger icon with tooltip.
   */
  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content='Navigation' relationship='label'>
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  /**
   * Handles the navigation when a button is clicked.
   *
   * @param event - The click event.
   * @param path - The path to navigate to.
   */
  const handleNavigate = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pathname: string, params?: Record<string, string>) => {
      event.preventDefault();
      setIsOpen(false);
      navigate({
        pathname,
        search: params && createSearchParams(params).toString(),
      });
    },
    [navigate, setIsOpen]
  );

  return (
    <header className='flex justify-center items-center border-b border-gray-300 mb-4'>
      <NavDrawer defaultSelectedValue='2' defaultSelectedCategoryValue='1' open={isOpen}>
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
        <NavDrawerBody>
          <NavItem icon={<Dashboard />} value='1' onClick={(event) => handleNavigate(event, '/')}>
            Dashboard
          </NavItem>
          <NavSectionHeader>Management</NavSectionHeader>
          <NavCategory value='2'>
            <NavCategoryItem icon={<Users />}>Users</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='3' onClick={(event) => handleNavigate(event, '/admin/users')}>
                List of Users
              </NavSubItem>
              <NavSubItem value='4' onClick={(event) => handleNavigate(event, '/admin/users/create')}>
                Create New
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value='5'>
            <NavCategoryItem icon={<Projects />}>Projects</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='6' onClick={(event) => handleNavigate(event, '/admin/projects')}>
                List of Projects
              </NavSubItem>
              <NavSubItem value='7' onClick={(event) => handleNavigate(event, '/admin/projects/create')}>
                Create New
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value='8'>
            <NavCategoryItem icon={<Teams />}>Teams</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='9' onClick={(event) => handleNavigate(event, '/admin/teams')}>
                List of Teams
              </NavSubItem>
              <NavSubItem value='10' onClick={(event) => handleNavigate(event, '/admin/teams/create')}>
                Create New
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavDivider />
          <NavSectionHeader>
            {currentUser?.name} {currentUser?.last_name}
          </NavSectionHeader>
          <NavSubItem value='11' onClick={(event) => handleNavigate(event, '/settings')}>
            Settings
          </NavSubItem>
          <NavSubItem value='12' onClick={(event) => handleNavigate(event, '/logout')}>
            Logout
          </NavSubItem>
        </NavDrawerBody>
      </NavDrawer>
      <Container>
        {renderHamburgerWithToolTip()}
        <Logo />
        <UserPersona />
      </Container>
    </header>
  );
};

export { Header };
