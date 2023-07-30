import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function ArrowDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 15 15" fill="none" {...props}>
      <path d="M7.6875 14V1M7.6875 14L2 8.3125M7.6875 14L13.375 8.3125" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}
