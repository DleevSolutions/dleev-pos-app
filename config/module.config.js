const { dependencies } = require('../package.json');

const moduleConfig = {
  name: 'Merchant',
  filename: process.env.MODULE_BUNDLE_NAME,
  remotes: {},
  exposes: {
    './App': './src/App',
    './translations': './src/i18n/config',
    './styles': './src/styles',
    './utils': './src/utils',
    './constants': './src/constants',
    './components': './src/components',
    './containers': './src/containers',
    './services': './src/services',
    './guards': './src/guards',
    './hooks': './src/hooks',
    './store': './src/store',
    './validators': './src/validators',
    './types': './src/types',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    msw: {
      singleton: true,
      requiredVersion: dependencies['msw'],
    },
    i18next: {
      singleton: true,
      requiredVersion: dependencies['i18next'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: dependencies['react-router-dom'],
    },
    'react-redux': {
      singleton: true,
      requiredVersion: dependencies['react-redux'],
    },
    'react-i18next': {
      singleton: true,
      requiredVersion: dependencies['react-i18next'],
    },
    '@material-ui/core': {
      singleton: true,
      requiredVersion: dependencies['@material-ui/core'],
    },
    '@mui/private-theming': { singleton: true, requiredVersion: dependencies['@mui/material'] },
    '@mui/styles': { singleton: true, requiredVersion: dependencies['@mui/material'] },
  },
};

if (process.env.MODULE_USER_MANAGEMENT_ACTIVE === 'true') {
  moduleConfig.remotes.UserManagement = `UserManagement@[window.MODULE_ORIGIN]${process.env.MODULE_USER_MANAGEMENT_URL}${process.env.MODULE_USER_MANAGEMENT_BUNDLE_FILE_NAME}`;
}

module.exports = moduleConfig;
