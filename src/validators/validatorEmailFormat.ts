import i18n from 'i18next';
import { emailReg } from '@src/regexp';

export const validatorEmailFormat = () => ({
  value: emailReg,
  message: i18n.t(`common:validation.checkTheEmailFormat`),
});
