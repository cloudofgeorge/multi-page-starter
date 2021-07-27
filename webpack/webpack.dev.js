const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common');

const { rootPath } = require('./utils/root-path');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		compress: true,
		contentBase: rootPath('dist'),
		historyApiFallback: true,
		hot: true,
		open: true,
		port: 8800,
		clientLogLevel: 'silent',
		watchOptions: {
			ignored: /node_modules/,
		},
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
