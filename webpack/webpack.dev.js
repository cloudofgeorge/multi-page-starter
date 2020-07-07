const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const { rootPath, isDevelopment } = require('./utils.js');

module.exports = merge(common, {
	devtool: isDevelopment && 'source-map',
	devServer: {
		port: 3000,
		open: true,
		contentBase: rootPath('src'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				html5: true,
				collapseWhitespace: true,
				caseSensitive: true,
				removeComments: true,
				removeEmptyElements: true,
			},
		}),
	],
});
