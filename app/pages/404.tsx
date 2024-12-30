import { AlertCircle } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';

/**
 * NotFound component renders a 404 error page with a message indicating that the page was not found.
 * It provides a button to navigate back to the pulses page.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 *
 * @returns {JSX.Element} A JSX element representing the 404 error page.
 */
const NotFound = (): JSX.Element => {
  /**
   * The navigate function from the react-router-dom library.
   */
  const navigate = useNavigate();

  /**
   * Handles the click event on the button to navigate to the pulses page.
   */
  const handleClick = useCallback(() => {
    navigate('/pulses');
  }, [navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='max-w-md w-full space-y-8 text-center'>
        <AlertCircle className='mx-auto h-24 w-24 text-muted-foreground' />
        <h1 className='text-4xl font-bold'>404</h1>
        <h2 className='text-2xl font-semibold'>Page Not Found</h2>
        <p className='text-muted-foreground'>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <Button onClick={handleClick} className='mt-4'>
          Go to Pulses
        </Button>
      </div>
    </div>
  );
};
export { NotFound };
