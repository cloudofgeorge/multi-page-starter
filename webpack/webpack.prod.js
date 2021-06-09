const merge = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');

const common = require('./webpack.common');

const rootPath = require('./utils/root-path');

const manifestConfig = require('./configs/manifest');
const workBoxConfig = require('./configs/workbox-config');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	entry: {
		index: {
			import: rootPath('src/index.js'),
			dependOn: ['utils'],
		},
		utils: ['nanoid'],
	},
	output: {
		filename: 'js/[name].[contenthash].bundle.js',
		publicPath: '/',
		clean: true,
	},
	optimization: {
		runtimeChunk: 'single',
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
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
		}),
		new WebpackPwaManifest(manifestConfig),
		new WorkboxPlugin.GenerateSW(workBoxConfig),
	],
});
