import { Tooltip } from '@fluentui/react-components';
import { Hamburger } from '@fluentui/react-nav-preview';
import { Container, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Logo } from './logo';
import { NavigationMenu } from './menu';
import { UserPersona } from './persona';
/**
 * Represents the header component of the application.
 * The header contains a navigation menu, a hamburger icon, a logo, and a user persona.
 */
const Header = () => {
  /**
   * Represents the state of the overlay drawer.
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handles the click event for the header component.
   */
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

  return (
    <header>
      <NavigationMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <Container>
        <Flex justify='between'>
          <div className='flex items-center'>
            {renderHamburgerWithToolTip()}
            <Logo />
          </div>
          <UserPersona />
        </Flex>
      </Container>
    </header>
  );
};

export { Header };
