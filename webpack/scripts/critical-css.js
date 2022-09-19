const critical = require('critical');
const { rootPath } = require('../utils/root-path');
const { OUTPUT_PATH, TEMP_PATH } = require('./constants');

critical.generate({
  // Inline the generated critical-path CSS
  // - true generates HTML
  // - false generates CSS
  inline: true,

  // Your base directory
  base: rootPath(`${OUTPUT_PATH}`),

  // HTML source
  // html: '<html>...</html>',

  // HTML source file
  src: 'index.html',

  // Your CSS Files (optional)
  // css: ['dist/styles/main.css'],

  // Viewport width
  width: 1300,

  // Viewport height
  height: 900,

  // Output results to file
  target: {
    css: rootPath(`${TEMP_PATH}/critical.css`),
    html: `${TEMP_PATH}/index-critical.html`,
    uncritical: rootPath(`${TEMP_PATH}/uncritical.css`),
  },

  // Extract inlined styles from referenced stylesheets
  extract: true,

  // ignore CSS rules
  ignore: {
    atrule: ['@font-face'],
    rule: [/some-regexp/],
    decl: (node, value) => /big-image\.png/.test(value),
  },
});
