const HtmlWebpackPlugin = require('html-webpack-plugin');
const { rootPath } = require('./root-path');
const { getAllFiles } = require('./get-all-files');

const generateHtmlPlugins = (templateDir, options = {}) => {
	const sourcePath = rootPath(templateDir);

	return getAllFiles(sourcePath).reduce(
		(acc, next) => [
			...acc,
			new HtmlWebpackPlugin({
				filename: next.replace(`${sourcePath}/`, ''),
				template: next,
				...options,
			}),
		],
		[]
	);
};

module.exports = { generateHtmlPlugins };
