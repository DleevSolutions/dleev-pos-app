import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { MainContentContainer } from '@containers';

export const ControlPanel = () => {
  const { t: tControlPanel } = useTranslation('controlPanel');

  return (
    <MainContentContainer fullHeight>
      <Typography variant="headerS">{`${tControlPanel('title')}`}</Typography>
    </MainContentContainer>
  );
};
