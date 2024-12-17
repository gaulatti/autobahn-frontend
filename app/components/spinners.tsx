import { Spinner } from '@radix-ui/themes';

/**
 * OverlaySpinner is a functional component that renders a full-screen overlay
 * with a centered spinner. The overlay has a white background and a high z-index
 * to ensure it appears above other content.
 *
 * @returns {JSX.Element} A div element containing the spinner.
 */
const OverlaySpinner = (): JSX.Element => (
  <div className='fixed inset-0 flex items-center justify-center z-50'>
    <Spinner size='3' />
  </div>
);

export { OverlaySpinner };
