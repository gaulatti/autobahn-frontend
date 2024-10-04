import { useNavigate } from 'react-router-dom';
import { Link as RadixLink } from '@radix-ui/themes';
/**
 * Represents a link component.
 *
 * @component
 * @param {object} props - The properties for the Link component.
 * @param {string} props.to - The destination URL for the link.
 * @param {ReactNode} props.children - The content of the link.
 * @returns {JSX.Element} The rendered Link component.
 */
const Link = (props: any) => {
  const navigate = useNavigate();
  return (
    <RadixLink style={{ cursor: 'pointer' }} onClick={() => navigate(props.to)}>
      {props.children}
    </RadixLink>
  );
};

export { Link };
