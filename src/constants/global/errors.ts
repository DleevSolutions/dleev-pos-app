import { SnackState } from '@types';

export const CONSOLE_EXCLUDED_ERROR_FRAGMENTS = [
  'MUI: ',
  'Warning: validateDOMNesting',
  'GET ',
  'POST ',
  'PUT ',
  '404 (Not Found)',
  'Error during service worker registration',
  'A bad HTTP response code (403) was received when fetching the script',
  'No routes matched location',
];

export enum ERROR_CODES {
  ERR_CANCELED = 'ERR_CANCELED',
  ERR_NETWORK = 'ERR_NETWORK',
}

export const ERROR_CUSTOM_SNACKS: { [key in keyof typeof ERROR_CODES]?: SnackState } = {};
