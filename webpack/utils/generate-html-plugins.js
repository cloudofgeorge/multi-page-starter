const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = require('./root-path.js');

module.exports = (templateDir, options = {}) => {
	const templateFiles = fs.readdirSync(rootPath(templateDir));

	const data = [];

	for (let index = 0; index < templateFiles.length; index += 1) {
		const element = templateFiles[index];
		const parts = element.split('.');
		const isFile = parts.length > 1;

		if (isFile) {
			const name = parts[0];
			const extension = parts[1];

			const plugin = new HtmlWebpackPlugin({
				filename: `${name}.html`,
				template: rootPath(`${templateDir}/${name}.${extension}`),
				...options,
			});

			data.push(plugin);
		}
	}

	return data;
};
