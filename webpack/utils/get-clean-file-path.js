const { rootPath } = require('./root-path');

const getCleanFilePath = (file, pathToPages) => {
  const newPath = rootPath(pathToPages);
  const pathWithoutAbsolute = file.replace(`${newPath}/`, '');
  const bringEverythingToHTML = value => value.replace(/\.(.*)$/g, '.html');
  return bringEverythingToHTML(pathWithoutAbsolute);
};

module.exports = { getCleanFilePath };
