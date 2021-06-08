const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');
const rootPath = require('./utils/root-path');
const isDev = require('./utils/is-dev');
const generateHtmlPlugins = require('./utils/generate-html-plugins');

module.exports = merge(common, {
	mode: 'development',
	devtool: isDev && 'source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: rootPath('dist'),
		open: true,
		compress: true,
		hot: true,
		port: 8080,
		watchOptions: {
			ignored: /node_modules/,
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		...generateHtmlPlugins('src/templates', {
			inject: 'body',
			scriptLoading: 'defer',
		}),
		new MiniCssExtractPlugin({
			filename: 'main-styles.css',
			chunkFilename: '[id].css',
		}),
	],
});
