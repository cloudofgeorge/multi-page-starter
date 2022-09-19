const postcssPresetEnv = require('postcss-preset-env');
const postcssCustomMedia = require('postcss-custom-media');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const scssSyntax = require('postcss-scss');
const customMedia = require('./src/styles/utils/breakpoints').breakpoints;

module.exports = {
  syntax: scssSyntax,
  plugins: [
    postcssPresetEnv,
    postcssCustomMedia({
      importFrom: [{ customMedia }], // => @custom-selector --small-viewport (max-width: 30em);
    }),
    postcssFlexbugsFixes,
    autoprefixer,
  ],
};
