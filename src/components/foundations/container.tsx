import { ClassAttributes, HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';

const Container = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) => {
  return <div className='foundation-container' {...props}></div>;
};

export { Container };
