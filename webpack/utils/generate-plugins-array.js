const { rootPath } = require('./root-path');
const { getAllFiles } = require('./get-all-files');

const generatePluginsArray = (templateDir, plugin, onlyFileNames = false) => {
	const sourcePath = rootPath(templateDir);
	return getAllFiles(sourcePath, onlyFileNames).reduce((acc, next, index) => [...acc, plugin(next, index)], []);
};

module.exports = { generatePluginsArray };
