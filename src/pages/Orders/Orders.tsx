import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { MainContentContainer } from '@containers';

export const Orders = () => {
  const { t: tOrders } = useTranslation('orders');

  return (
    <MainContentContainer fullHeight>
      <Typography variant="headerS">{`${tOrders('title')}`}</Typography>
    </MainContentContainer>
  );
};
