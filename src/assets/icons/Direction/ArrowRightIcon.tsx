import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function ArrowRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 15 15" fill="none" {...props}>
      <path d="M1 7.6875H14M14 7.6875L8.3125 2M14 7.6875L8.3125 13.375" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}
