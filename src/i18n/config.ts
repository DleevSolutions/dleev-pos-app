import {
  COMMON_EN,
  LANGUAGES_EN,
  PRODUCTS_EN,
  ORDERS_EN,
  DASHBOARD_EN,
  REPORTS_EN,
  SIGN_IN_EN,
  CONTROL_PANEL_EN,
  ERRORS_EN,
} from './en';
import {
  COMMON_CH,
  LANGUAGES_CH,
  PRODUCTS_CH,
  ORDERS_CH,
  DASHBOARD_CH,
  REPORTS_CH,
  SIGN_IN_CH,
  CONTROL_PANEL_CH,
  ERRORS_CH,
} from './ch';
import {
  COMMON_SYSTEM,
  LANGUAGES_SYSTEM,
  PRODUCTS_SYSTEM,
  ORDERS_SYSTEM,
  DASHBOARD_SYSTEM,
  REPORTS_SYSTEM,
  SIGN_IN_SYSTEM,
  CONTROL_PANEL_SYSTEM,
  ERRORS_SYSTEM,
} from './system';

export const resources = {
  en: {
    common: COMMON_EN,
    languages: LANGUAGES_EN,
    products: PRODUCTS_EN,
    orders: ORDERS_EN,
    dashboard: DASHBOARD_EN,
    reports: REPORTS_EN,
    signIn: SIGN_IN_EN,
    controlPanel: CONTROL_PANEL_EN,
    errors: ERRORS_EN,
  },
  ch: {
    common: COMMON_CH,
    languages: LANGUAGES_CH,
    products: PRODUCTS_CH,
    orders: ORDERS_CH,
    dashboard: DASHBOARD_CH,
    reports: REPORTS_CH,
    signIn: SIGN_IN_CH,
    controlPanel: CONTROL_PANEL_CH,
    errors: ERRORS_CH,
  },
  system: {
    common: COMMON_SYSTEM,
    languages: LANGUAGES_SYSTEM,
    products: PRODUCTS_SYSTEM,
    orders: ORDERS_SYSTEM,
    dashboard: DASHBOARD_SYSTEM,
    reports: REPORTS_SYSTEM,
    signIn: SIGN_IN_SYSTEM,
    controlPanel: CONTROL_PANEL_SYSTEM,
    errors: ERRORS_SYSTEM,
  },
} as const;
