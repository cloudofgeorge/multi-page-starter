const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');
const rootPath = require('./utils/root-path');
const generateHtmlPlugins = require('./utils/generate-html-plugins');

const manifestConfig = require('./configs/manifest');
const workBoxConfig = require('./configs/workbox-config');

const htmlPlugins = generateHtmlPlugins('src/templates', {
	minify: {
		html5: true,
		collapseWhitespace: true,
		caseSensitive: true,
		removeComments: true,
		removeEmptyElements: true,
	},
	hash: true,
});

module.exports = merge(common, {
	output: {
		path: rootPath('dist'),
		filename: 'main.[hash].js',
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'static/',
							useRelativePath: true,
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
							optipng: {
								enabled: true,
							},
							pngquant: {
								quality: '65-90',
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
		],
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
		...htmlPlugins,
		new WebpackPwaManifest(manifestConfig),
		new WorkboxPlugin.GenerateSW(workBoxConfig),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				// Use multi-process parallel running to improve the build speed
				// Default number of concurrent runs: os.cpus().length - 1
				parallel: true,
				// Enable file caching
				cache: true,
				sourceMap: true,
			}),
		],
	},
});
