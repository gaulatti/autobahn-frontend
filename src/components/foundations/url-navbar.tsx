/**
 * URLNavbar component.
 *
 * @component
 * @param {any} props - The component props.
 * @returns {JSX.Element} - The rendered URLNavbar component.
 */
const URLNavbar = (props: any) => {
  return (
    <div className='bg-background border-b border-input px-4 py-2 flex items-center gap-2 w-full my-4'>
      <GlobeIcon className='w-5 h-5 text-muted-foreground' />
      <div className='flex-1 text-sm font-mono text-muted-foreground overflow-hidden whitespace-nowrap text-ellipsis'>{props.children}</div>
    </div>
  );
};

/**
 * Represents a GlobeIcon component.
 *
 * @component
 * @example
 * ```tsx
 * <GlobeIcon />
 * ```
 */
const GlobeIcon = (props: any) => {
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
      <path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' />
      <path d='M2 12h20' />
    </svg>
  );
};

export { URLNavbar };
