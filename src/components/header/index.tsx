import { Container, Flex } from '@radix-ui/themes';
import { TeamSelector } from '../foundations/team-selector';
import { Logo } from './logo';
import { Menu } from './menu';

/**
 * Header component that renders the main header of the website.
 *
 * This component includes:
 * - A logo and menu wrapped in a flex container.
 * - A team selector component.
 *
 * The layout is managed using a `Container` and `Flex` components for alignment and spacing.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header = (): JSX.Element => {
  return (
    <header>
      <Container>
        <Flex justify='between' className='my-8'>
          <Flex gap='3'>
            <Logo />
            <Menu />
          </Flex>
          <TeamSelector />
        </Flex>
      </Container>
    </header>
  );
};
export { Header };