const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const rootPath = require('./utils/root-path');
const isDev = require('./utils/is-dev');
const generateHtmlPlugins = require('./utils/generate-html-plugins');

module.exports = merge(common, {
	devtool: isDev && 'source-map',
	devServer: {
		port: 3000,
		open: true,
		contentBase: rootPath('src'),
	},
	plugins: [...generateHtmlPlugins('src/templates')],
});
