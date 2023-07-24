import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { MainContentContainer } from '@containers';

export const Reports = () => {
  const { t: tReports } = useTranslation('reports');

  return (
    <MainContentContainer fullHeight>
      <Typography variant="headerS">{`${tReports('title')}`}</Typography>
    </MainContentContainer>
  );
};
