import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import { ReactNode } from 'react';

/**
 * ErrorMessage component displays an error message inside a styled callout box.
 *
 * @param props - The properties object.
 * @param props.message - The error message to be displayed.
 *
 * @returns A JSX element containing the error message.
 */
const ErrorMessage = (props: { children: ReactNode }) => (
  <Callout.Root color='red' className='my-4'>
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>{props.children}</Callout.Text>
  </Callout.Root>
);

/**
 * InfoMessage component displays an informational message inside a styled callout box.
 *
 * @param props - The properties object.
 * @param props.message - The informational message to be displayed.
 *
 * @returns A JSX element containing the informational message.
 */
const InfoMessage = (props: { children: ReactNode }) => (
  <Callout.Root color='blue' className='my-4'>
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>{props.children}</Callout.Text>
  </Callout.Root>
);

export { ErrorMessage, InfoMessage };
