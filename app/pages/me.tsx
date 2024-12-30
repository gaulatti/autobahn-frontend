import { AlertCircle } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { currentUser as currentUserSelector } from '../state/selectors/auth';

/**
 * The Me component displays the current user's information and provides a button to navigate to the pulses page.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Me = (): JSX.Element => {
  /**
   * The navigate function from the react-router-dom library.
   */
  const navigate = useNavigate();

  /**
   * The current user.
   */
  const currentUser = useSelector(currentUserSelector);

  /**
   * Handles the click event on the button to navigate to the pulses page.
   */
  const handleClick = useCallback(() => {
    navigate('/pulses');
  }, [navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-full p-4'>
      <div className='max-w-md w-full h-full space-y-8 text-center'>
        <AlertCircle className='mx-auto h-24 w-24 text-muted-foreground' />
        <p className='text-muted-foreground'>{currentUser?.sub}</p>
        <h1>{currentUser?.name} {currentUser?.last_name}</h1>
        <p className='text-muted-foreground'>{currentUser?.email}</p>
        <Button onClick={handleClick} className='mt-4'>
          Go to Pulses
        </Button>
      </div>
    </div>
  );
};
export default Me;