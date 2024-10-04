import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../../components/ui/navigation-menu';
import { cn } from '../../lib/utils';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

/**
 * `ListItem` is a React functional component that renders a list item (`<li>`) containing a navigation link.
 * The link is styled with various utility classes and supports hover and focus states.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.className] - Additional class names to apply to the link element.
 * @param {string} props.title - The title text to display inside the link.
 * @param {React.ReactNode} props.children - The content to display inside the link, typically a description or additional text.
 * @param {React.Ref<HTMLAnchorElement>} ref - A ref to the anchor element.
 *
 * @returns {JSX.Element} The rendered list item with a navigation link.
 */
const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

/**
 * Menu component that renders a navigation menu with various items.
 *
 * This component uses the `useNavigate` hook to handle navigation events
 * and the `useFeatureFlags` hook to conditionally render menu items based
 * on feature flags.
 *
 * @component
 * @example
 * return (
 *   <Menu />
 * )
 *
 * @returns {JSX.Element} The rendered navigation menu.
 */
const Menu = (): JSX.Element => {
  /**
   * The hook that allows us to navigate to different pages.
   */
  const navigate = useNavigate();

  /**
   * The hook that allows us to check if a feature flag is enabled.
   */
  const isFeatureEnabled = useFeatureFlags();

  /**
   * Handles the navigation event for menu items.
   *
   * @param event - The mouse event triggered by clicking the anchor element.
   * @param pathname - The path to navigate to.
   */
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, pathname: string) => {
    event.preventDefault();
    navigate(pathname);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Assessments</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li
                className='row-span-3 rounded-md'
                style={{
                  backgroundImage: 'url(/charts.jpg)',
                  backgroundSize: 'cover',
                }}
              >
                <NavigationMenuLink asChild>
                  <a
                    className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                    onClick={(e) => handleNavigate(e, '/pulses')}
                    href='#'
                  >
                    <div className='mb-2 mt-4 text-lg font-medium'>Pulses</div>
                    <p className='text-sm leading-tight text-muted-foreground'>Detailed list of all the pulses</p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href='#' onClick={(e) => handleNavigate(e, '/urls')} title='URLs'>
                Inventory of the all the URLs analyzed by the Assessment Engine
              </ListItem>
              <ListItem href='#' onClick={(e) => handleNavigate(e, '/targets')} title='Targets'>
                Target multi-url based pulses.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {isFeatureEnabled('engine') && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Engine</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li
                  className='row-span-3 rounded-md'
                  style={{
                    backgroundImage: 'url(/engine.png)',
                    backgroundSize: 'cover',
                  }}
                >
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='#'
                      onClick={(e) => handleNavigate(e, '/projects')}
                    >
                      <div className='mb-2 mt-4 text-lg font-medium'>Projects</div>
                      <p className='text-sm leading-tight text-muted-foreground'>Assessment Projects Management</p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href='#' onClick={(e) => handleNavigate(e, '/plugins')} title='Plugins'>
                  Mechanisms to perform assessment analysis or discovery
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { Menu };
