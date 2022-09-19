const getArgs = args => {
  let result = {};

  // you can use args like that with helpers "title:text | second:text"
  if (args && typeof args === 'string') {
    const arrayOfArgs = args.split(' | ');
    const obj = arrayOfArgs.reduce((prev, current) => {
      const item = current.split(':');
      return { ...prev, [item[0]]: item[1] };
    }, {});

    result = obj;
  }

  return result;
};

module.exports = { getArgs };
