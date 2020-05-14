const path = require('path');

const rootPath = src => path.resolve(__dirname, `../${src}`);
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = { rootPath, isDevelopment };
