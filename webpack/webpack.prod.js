const merge = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const common = require('./webpack.common');

const manifestConfig = require('./configs/manifest');
const workBoxConfig = require('./configs/workbox-config');
const { rootPath } = require('./utils/root-path');
const { generatePluginsArray } = require('./utils/generate-plugins-array');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
		filename: 'js/[name].[contenthash].bundle.js',
		publicPath: '/',
		clean: true,
	},
	optimization: {
		minimizer: [new CssMinimizerPlugin()],
		splitChunks: {
			cacheGroups: {
				mainStyles: {
					name: 'main',
					type: 'css/mini-extract',
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	performance: {
		hints: 'warning',
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	module: {
		rules: [
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { importLoaders: 1 },
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false,
							sassOptions: {
								webpackImporter: false,
								importer: globImporter(),
								import: false,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),

		...generatePluginsArray(
			'public/templates',
			next => {
				return new HtmlCriticalWebpackPlugin({
					base: rootPath('dist'),
					src: next,
					dest: next,
					inline: true,
					minify: true,
					extract: true,
					width: 1920,
					height: 1080,
					penthouse: {
						blockJSRequests: false,
					},
				});
			},
			true
		),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
					[
						'svgo',
						{
							plugins: extendDefaultPlugins([
								{
									name: 'removeViewBox',
									active: false,
								},
								{
									name: 'addAttributesToSVGElement',
									params: {
										attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
									},
								},
							]),
						},
					],
				],
			},
		}),

		new WebpackPwaManifest(manifestConfig),
		new WorkboxPlugin.GenerateSW(workBoxConfig),
	],
});
