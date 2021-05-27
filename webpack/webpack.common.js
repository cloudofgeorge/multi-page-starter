const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = require('./utils/is-dev');

module.exports = {
	target: 'web',
	entry: {
		bundle: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false,
					minimize: !isDev,
				},
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDev,
						},
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
		],
	},
	plugins: [new DuplicatePackageCheckerPlugin()],
};
