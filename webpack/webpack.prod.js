const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const common = require('./webpack.common.js');
const { rootPath } = require('./utils.js');

const manifestConfig = require('./configs/manifest');
const workBoxConfig = require('./configs/workbox-config');

module.exports = merge(common, {
	output: {
		path: rootPath('dist'),
		filename: 'main.[hash].js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: rootPath('src/assets'),
					to: 'assets',
				},
			],
		}),
		new ImageminPlugin({
			pngquant: {
				quality: '95-100',
			},
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				html5: true,
				collapseWhitespace: true,
				caseSensitive: true,
				removeComments: true,
				removeEmptyElements: true,
			},
			hash: true,
		}),
		new WebpackPwaManifest(manifestConfig),
		new WorkboxPlugin.GenerateSW(workBoxConfig),
	],
});
