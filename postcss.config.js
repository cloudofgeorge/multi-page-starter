/* eslint-disable import/no-extraneous-dependencies,global-require */
const customMedia = require('./src/styles/utils/breakpoints').breakpoints;

module.exports = {
	plugins: [
		require('postcss-preset-env'),
		require('postcss-custom-media')({ importFrom: [{ customMedia }] }),
		require('postcss-flexbugs-fixes'),
		require('autoprefixer'),
	],
};
