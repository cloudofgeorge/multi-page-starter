const { merge } = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
		filename: 'main.[fullhash].js',
		clean: true,
		publicPath: ASSET_PATH,
	},
	optimization: {
		minimizer: [
			compiler => {
				new TerserPlugin({
					terserOptions: {
						compress: {},
					},
				}).apply(compiler);
			},
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
			{
				test: /\.svg$/,
				type: 'asset',
				use: 'svgo-loader',
			},
		],
	},
	plugins: [
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
			},
		}),
		new WebpackPwaManifest(manifestConfig),
		new MiniCssExtractPlugin({
			filename: 'main-styles.[fullhash].css',
			chunkFilename: '[id].[chunkhash].css',
		}),
		new WorkboxPlugin.GenerateSW(workBoxConfig),
	],
});
