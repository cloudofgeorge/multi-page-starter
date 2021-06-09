const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = require('./root-path');

module.exports = (templateDir, options = {}) => {
	const sourcePath = rootPath(templateDir);

	const getAllFiles = dir => {
		return fs.readdirSync(dir).reduce((files, file) => {
			const name = path.join(dir, file);
			const isDirectory = fs.statSync(name).isDirectory();
			return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
		}, []);
	};

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
