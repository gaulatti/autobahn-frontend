import { ClassAttributes, HTMLAttributes } from 'react';

const Stack = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) => {
  return <div className='stack flex flex-col justify-center items-center flex-1'>{props.children}</div>;
};
export { Stack };
