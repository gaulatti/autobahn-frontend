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
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../foundations/container';
import { Logo } from './logo';
import { UserMenu } from './user-menu';
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Users = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Projects = bundleIcon(DocumentCatchUpFilled, DocumentCatchUpRegular);
const Teams = bundleIcon(PeopleTeamRegular, PeopleTeamFilled);
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Handles the click event on the component.
     * Closes the component if the click target has the class 'fui-OverlayDrawer__backdrop' and the component is open.
     * @param event - The click event object.
     */
    const handleClick = (event: any) => {
      if (event.target.classList.contains('fui-OverlayDrawer__backdrop') && isOpen) {
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
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, path: string) => {
      event.preventDefault();
      setIsOpen(false);
      navigate(path);
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
              <NavSubItem value='4' onClick={(event) => handleNavigate(event, '/admin/users/new')}>
                Create New
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value='5'>
            <NavCategoryItem icon={<Projects />}>Projects</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='6' onClick={(event) => handleNavigate(event, '/admin/projects')}>
                Projects
              </NavSubItem>
              <NavSubItem value='7' onClick={(event) => handleNavigate(event, '/admin/projects/new')}>
                Create New
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value='8'>
            <NavCategoryItem icon={<Teams />}>Teams</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value='9' onClick={(event) => handleNavigate(event, '/admin/teams')}>
                Teams
              </NavSubItem>
              <NavSubItem value='10' onClick={(event) => handleNavigate(event, '/admin/teams/new')}>
                Create New
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
