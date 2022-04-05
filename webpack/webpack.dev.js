const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const { rootPath } = require('./utils/root-path');
const { OUTPUT_PATH } = require('./constants');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    static: {
      directory: rootPath(OUTPUT_PATH),
    },
    historyApiFallback: true,
    open: true,
    port: 8800,
    client: {
      logging: 'info',
    },
  },
});
