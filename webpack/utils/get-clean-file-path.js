const { rootPath } = require('./root-path');
const { PAGES_PATH } = require('../constants');

const getCleanFilePath = file => {
  const newPath = rootPath(PAGES_PATH);
  const pathWithoutAbsolute = file.replace(`${newPath}/`, '');
  const bringEverythingToHTML = value => value.replace(/\.(.*)$/g, '.html');
  return bringEverythingToHTML(pathWithoutAbsolute);
};

module.exports = { getCleanFilePath };
