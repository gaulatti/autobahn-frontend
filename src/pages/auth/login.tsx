import { signInWithRedirect } from 'aws-amplify/auth';
import { SVGProps, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import { useAuthStatus } from '../../hooks/useAuth';
import background from '../../assets/background.svg';
import { Button, Card } from '@tremor/react';
const loginWithGoogle = () => {
  signInWithRedirect({ provider: 'Google' });
};

const ChromeIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <circle cx='12' cy='12' r='4' />
      <line x1='21.17' x2='12' y1='8' y2='8' />
      <line x1='3.95' x2='8.54' y1='6.06' y2='14' />
      <line x1='10.88' x2='15.46' y1='21.94' y2='14' />
    </svg>
  );
};

/**
 * Login component for user authentication.
 * Renders a login page with background image and sign-in options.
 */
const Login = () => {
  const { isAuthenticated, isLoaded } = useAuthStatus();
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  /**
   * Verify the background is loaded before rendering the page.
   */
  useEffect(() => {
    const img = new Image();
    img.src = background;
    img.onload = () => setIsBackgroundLoaded(true);
  }, []);

  /**
   * Redirect the user to the home page if they are authenticated.
   */
  if (isLoaded && isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    isBackgroundLoaded && (
      <div className='relative h-screen w-full login' style={{ backgroundImage: `url(${background})` }}>
        <div className='absolute inset-0 bg-black/50 flex items-center justify-center px-4'>
          <div className='w-full max-w-3xl'>
            <Card className='mx-auto space-y-6 p-8 md:p-12 lg:p-16'>
              <div className='space-y-4'>
                <Button className='w-full' onClick={loginWithGoogle}>
                  <ChromeIcon className='mr-2 h-5 w-5' />
                  Sign in with Google
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  );
};

export { Login };

// <div className='surface-0 text-700 text-center'>
// <div className='grid-nogutter'>
//   <div className='col-12 lg:col-4 lg:col-offset-4 grid flex-column justify-content-around' style={{ { h'eight': ,1strokeWidth }}}}      <Card className='shadow-2'>
//       <Image src='/logo192.png' width='192px' height='192px' alt='Alcántara' style={{ { t'extAlign': ,cstrokeWidth }}}} //       <h1 style={{ { t'extAlign': ,cstrokeWidth fo}} mily: 'Berlin', fontSize: '32px', fontWeight: 'bold' }}>Alcántara</h1>
//       <Divider align='center'>Please join us by using any of the following providers.</Divider>
//       <div className='p-3 flex flex-column' style={{ { b'orderRadius': ,6strokeWidth }}}}          <Button className='my-2' onClick={loginWithGoogle} label='Login with Google' />
//         <Button onClick={loginWithApple} label='Login with Apple' />
//       </div>
//     </Card>
//   </div>
// </div>
// </div>
