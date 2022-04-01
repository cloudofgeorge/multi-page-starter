const { rootPath } = require('./root-path');
const { getAllFiles } = require('./get-all-files');

const generatePluginsArray = (templateDir, plugin, onlyFileNames = false) => {
  const sourcePath = rootPath(templateDir);
  const allFiles = getAllFiles(sourcePath, onlyFileNames);
  const reducedFilesArray = allFiles.reduce((acc, next, index) => [...acc, plugin(next, index)], []);
  return reducedFilesArray;
};

module.exports = { generatePluginsArray };
