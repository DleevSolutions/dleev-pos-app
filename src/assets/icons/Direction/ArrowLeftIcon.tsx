import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function ArrowLeftIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 15 15" fill="none" {...props}>
      <path d="M6.6875 2L1 7.6875M1 7.6875L6.6875 13.375M1 7.6875H14" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}
