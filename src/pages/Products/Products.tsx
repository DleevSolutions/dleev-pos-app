import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { MainContentContainer } from '@containers';

export const Products = () => {
  const { t: tProducts } = useTranslation('products');

  return (
    <MainContentContainer fullHeight>
      <Typography variant="headerS">{`${tProducts('title')}`}</Typography>
    </MainContentContainer>
  );
};
