import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters';

interface GlobalLoaderProps extends WithSx {
  invisible?: boolean;
}

export const GlobalLoader = ({ invisible = false, sx }: GlobalLoaderProps) => {
  return (
    <Backdrop
      sx={[
        (theme) => ({
          color: theme.palette.primary[100],
          zIndex: (theme) => theme.zIndex.tooltip + 1,
        }),
        ...convertSxToArray(sx),
      ]}
      open
      invisible={invisible}
    >
      <CircularProgress size="4rem" />
    </Backdrop>
  );
};