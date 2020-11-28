const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = require('./root-path.js');

module.exports = (templateDir, options = {}) => {
	const templateFiles = fs.readdirSync(rootPath(templateDir));

	return templateFiles.map(item => {
		// Split names and extension
		const parts = item.split('.');
		const name = parts[0];
		const extension = parts[1];
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: rootPath(`${templateDir}/${name}.${extension}`),
			...options,
		});
	});
};
