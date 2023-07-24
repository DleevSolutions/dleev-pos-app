import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { MainContentContainer } from '@containers';

export const DashBoard = () => {
  const { t: tDashboard } = useTranslation('dashboard');

  return (
    <MainContentContainer fullHeight>
      <Typography variant="headerS">{`${tDashboard('title')}`}</Typography>
    </MainContentContainer>
  );
};
