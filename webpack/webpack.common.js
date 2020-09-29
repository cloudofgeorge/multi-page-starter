const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const { isDev } = require('./utils.js');

module.exports = {
	entry: {
		bundle: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
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
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main-styles.[hash].css',
			chunkFilename: '[id].css',
		}),
		new DuplicatePackageCheckerPlugin(),
	],
};
