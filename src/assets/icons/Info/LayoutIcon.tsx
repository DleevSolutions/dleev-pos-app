import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function LayoutIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 15 15" fill="none" {...props}>
      <path d="M13 2H2C1.73478 2 1.48043 2.10536 1.29289 2.29289C1.10536 2.48043 1 2.73478 1 3V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H13C13.2652 13 13.5196 12.8946 13.7071 12.7071C13.8946 12.5196 14 12.2652 14 12V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2ZM13 3V5.5H2V3H13ZM2 6.5H5.5V12H2V6.5ZM13 12H6.5V6.5H13V12Z" />
    </SvgIcon>
  );
}