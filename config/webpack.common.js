require('dotenv').config();

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const moduleConfig = require('./module.config');
const packageJson = require('../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const SRC_PATH = path.join(__dirname, '../src');

const processEnvPlugin = new webpack.DefinePlugin({
  APP_VERSION: JSON.stringify(packageJson.version),
  MODULE_USER_MANAGEMENT_ACTIVE: process.env.MODULE_USER_MANAGEMENT_ACTIVE === 'true',
  MODULE_DYNAMIC_ORIGIN: process.env.MODULE_DYNAMIC_ORIGIN,
});

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
    manifest: './public/manifest.json',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: './public/assets', to: 'assets' },
      { from: './src/service-worker.js', to: 'service-worker.js' }],
  }),
  processEnvPlugin,
  new ModuleFederationPlugin(moduleConfig),
  new ExternalTemplateRemotesPlugin(),
];

if (isProduction) {
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 100000000,
    }),
  );
}

module.exports = {
  entry: './src/index',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'ts-loader',
        include: [SRC_PATH],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        oneOf: [
          {
            issuer: /\.(js|ts|md)x?$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/fonts/[name].[hash].[ext]',
            },
          },
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              fallback: {
                loader: 'file-loader',
                options: {
                  outputPath: 'assets/fonts',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        include: SRC_PATH,
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      '@src': path.resolve(SRC_PATH),
      '@validators': path.resolve(SRC_PATH, 'validators'),
      '@components': path.resolve(SRC_PATH, 'components'),
      '@utils': path.resolve(SRC_PATH, 'utils'),
      '@store': path.resolve(SRC_PATH, 'store'),
      '@sagas': path.resolve(SRC_PATH, 'sagas'),
      '@pages': path.resolve(SRC_PATH, 'pages'),
      '@models': path.resolve(SRC_PATH, 'models'),
      '@services': path.resolve(SRC_PATH, 'services'),
      '@translations': path.resolve(SRC_PATH, 'i18n'),
      '@containers': path.resolve(SRC_PATH, 'containers'),
      '@hooks': path.resolve(SRC_PATH, 'hooks'),
      '@assets': path.resolve(SRC_PATH, 'assets'),
      '@guards': path.resolve(SRC_PATH, 'guards'),
      '@constants': path.resolve(SRC_PATH, 'constants'),
      '@enums': path.resolve(SRC_PATH, 'enums'),
      '@types': path.resolve(SRC_PATH, 'types'),
    },
  },
  plugins,
  externals: {
    Config: getConfig(process.env),
  },
};

function getConfig(env) {
  const config = {};
  // providing a list of env variables otherwise we would push all the node envs here
  const customPropsNames = ['API_URL'];
  for (const key of customPropsNames) {
    if (env.hasOwnProperty(key)) {
      config[key] = env[key].trim();
    }
  }
  return JSON.stringify(config);
}
