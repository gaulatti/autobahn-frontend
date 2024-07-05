import { ClassAttributes, HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';

const Container = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) => {
  return <div className='justify-between items-center w-full p-4 max-w-7xl flex flex-row min-h-[32px]' {...props}></div>;
};

export { Container };
