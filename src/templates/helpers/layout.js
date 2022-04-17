const { getArgs } = require('./utils/get-args');

module.exports = (args, options) => {
  // https://handlebarsjs.com/guide/block-helpers.html#basic-block-variation
  const innerHTML = options.fn(this);
  // Run the layout and pass in any information
  // e.g. from htmlWebpackPlugin

  return require('../partials/layout.hbs')({
    innerHTML,
    ...getArgs(args),
  });
};
