import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@src/i18n/config';

i18n.use(initReactI18next).init({
  lng: 'en',
  nsSeparator: ':',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
  resources,
});
