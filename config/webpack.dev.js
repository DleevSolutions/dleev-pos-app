const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const plugins = [];

if (process.env.CIRCULAR_DEPENDENCY_CHECK) {
  plugins.push(
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      include: /src/,
      failOnError: false,
      allowAsyncCycles: false,
    }),
  );
}

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    publicPath: `http://localhost:${process.env.DEVELOPMENT_MODULE_PORT}/`,
  },
  ...({ optimization: { runtimeChunk: 'single' } }),
  devServer: {
    ...({ devMiddleware: { writeToDisk: true } }),
    port: process.env.DEVELOPMENT_MODULE_PORT,
    historyApiFallback: true,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: process.env.DEVELOPMENT_API_TARGET,
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        onProxyReq: function (proxyReq) {
          proxyReq.setHeader('referer', process.env.DEVELOPMENT_MODULE_RESOURCES_URL);
          console.log('proxyReq ---', proxyReq.path);
        },
      },
    ],
  },
  plugins,
};

module.exports = merge(commonConfig, devConfig);
