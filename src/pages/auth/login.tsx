import { Button, Card } from '@fluentui/react-components';
import { signInWithRedirect } from 'aws-amplify/auth';
import { SVGProps, useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useAuthStatus } from '../../hooks/useAuth';

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

const Login = () => {
  const { isAuthenticated, isLoaded } = useAuthStatus();

  useEffect(() => {
    if (isLoaded && isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, isLoaded]);

  return isAuthenticated || !isLoaded ? (
    <></>
  ) : (
    <div className='relative h-screen w-full'>
      <img
        src='https://media.cnn.com/api/v1/images/stellar/prod/181107112022-long-island-city-restricted.jpg?q=w_3442,h_2297,x_0,y_0,c_fill'
        alt='Background image'
        className='object-cover'
      />
      <div className='absolute inset-0 bg-black/50 flex items-center justify-center px-4'>
        <div className='w-full max-w-3xl'>
          <Card className='mx-auto space-y-6 p-8 md:p-12 lg:p-16'>
            <div className='space-y-4 text-center'>
              <h1 className='text-4xl font-bold md:text-5xl'>Welcome Back</h1>
              <p className='text-muted-foreground text-lg'>Sign in to your account to continue</p>
            </div>
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
  );
};

export { Login };

// <div className='surface-0 text-700 text-center'>
// <div className='grid-nogutter'>
//   <div className='col-12 lg:col-4 lg:col-offset-4 grid flex-column justify-content-around' style={{ height: '100vh' }}>
//     <Card className='shadow-2'>
//       <Image src='/logo192.png' width='192px' height='192px' alt='Alcántara' style={{ textAlign: 'center' }} />
//       <h1 style={{ textAlign: 'center', fontFamily: 'Berlin', fontSize: '32px', fontWeight: 'bold' }}>Alcántara</h1>
//       <Divider align='center'>Please join us by using any of the following providers.</Divider>
//       <div className='p-3 flex flex-column' style={{ borderRadius: '6px' }}>
//         <Button className='my-2' onClick={loginWithGoogle} label='Login with Google' />
//         <Button onClick={loginWithApple} label='Login with Apple' />
//       </div>
//     </Card>
//   </div>
// </div>
// </div>
