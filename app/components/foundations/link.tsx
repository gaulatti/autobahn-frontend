import { Link as RadixLink } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router';

/**
 * Represents a link component.
 *
 * @component
 * @param {object} props - The properties for the Link component.
 * @param {string} props.to - The destination URL for the link.
 * @param {ReactNode} props.children - The content of the link.
 * @returns {JSX.Element} The rendered Link component.
 */
const Link = (props: { to?: string; href?: string; children: ReactNode; className?: string; target?: string }): JSX.Element => {
  if (props.to) {
    return (
      <RadixLink className={props.className} target={props.target}>
        <ReactLink to={props.to}> {props.children}</ReactLink>
      </RadixLink>
    );
  } else if (props.href) {
    return (
      <RadixLink className={props.className} href={props.href} target={props.target}>
        {props.children}
      </RadixLink>
    );
  } else {
    return <></>;
  }
};

export { Link };
