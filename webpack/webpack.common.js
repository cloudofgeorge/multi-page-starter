const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = require('./utils/is-dev');
const rootPath = require('./utils/root-path');
const generateHtmlPlugins = require('./utils/generate-html-plugins');

module.exports = {
	entry: rootPath('src/index.js'),
	output: {
		path: rootPath('dist'),
		filename: 'js/[name].bundle.js',
		publicPath: '/',
		crossOriginLoading: 'anonymous',
		module: true,
		environment: {
			arrowFunction: true,
			bigIntLiteral: false,
			const: true,
			destructuring: true,
			dynamicImport: false,
			forOf: true,
		},
	},
	resolve: {
		alias: {
			'@': rootPath('src/app'),
		},
		extensions: ['.mjs', '.js', 'jsx', '.json'],
	},
	experiments: {
		topLevelAwait: true,
		outputModule: true,
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { importLoaders: 1 },
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: isDev,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDev,
							sassOptions: {
								webpackImporter: false,
								importer: globImporter(),
								import: false,
							},
						},
					},
				],
			},
			{
				test: /\.md$/i,
				use: ['html-loader', 'markdown-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|svg?)$/i,
				type: 'asset',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext][query]',
				},
			},
		],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: rootPath('public/assets'),
					globOptions: {
						ignore: ['**/fonts/**/*'],
					},
				},
			],
		}),
		...generateHtmlPlugins('public/templates', {
			inject: 'body',
			scriptLoading: 'defer',
		}),
		new CircularDependencyPlugin(),
		new DuplicatePackageCheckerPlugin(),
		new Dotenv({
			path: rootPath('.env'),
			allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false, // load '.env.defaults' as the default values if empty.
		}),
	],
};
