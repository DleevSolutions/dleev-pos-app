import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function ArrowUpIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 15 15" fill="none" {...props}>
      <path d="M7.6875 14V1M7.6875 1L2 6.6875M7.6875 1L13.375 6.6875" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}
