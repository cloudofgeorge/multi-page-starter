const { merge } = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common');
const rootPath = require('./utils/root-path');
const generateHtmlPlugins = require('./utils/generate-html-plugins');

const manifestConfig = require('./configs/manifest');
const workBoxConfig = require('./configs/workbox-config');

const ASSET_PATH = process.env.ASSET_PATH || './';

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: rootPath('dist'),
		filename: 'main.[hash].js',
		publicPath: ASSET_PATH,
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				sourceMap: true,
				terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
				},
			}),
		],
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
		...generateHtmlPlugins('src/templates', {
			inject: 'body',
			scriptLoading: 'defer',
			minify: {
				html5: true,
				collapseWhitespace: false,
				caseSensitive: true,
				removeComments: true,
				removeEmptyElements: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
			},
		}),
		new WebpackPwaManifest(manifestConfig),
		new MiniCssExtractPlugin({
			filename: 'main-styles.[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		new WorkboxPlugin.GenerateSW(workBoxConfig),
	],
});
