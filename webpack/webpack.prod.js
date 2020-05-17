const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

const common = require('./webpack.common.js');
const { rootPath } = require('./utils.js');

const manifestConfig = require('./configs/manifest');
const workBoxConfig = require('./configs/workbox-config');

module.exports = merge(common, {
	output: {
		path: rootPath('dist'),
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
		new WebpackPwaManifest(manifestConfig),
		new WorkboxPlugin.GenerateSW(workBoxConfig),
	],
});
