const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const { rootPath, isDev } = require('./utils.js');

module.exports = merge(common, {
	devtool: isDev && 'source-map',
	devServer: {
		port: 3000,
		open: true,
		contentBase: rootPath('src'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: rootPath('src/index.html'),
		}),
	],
});
