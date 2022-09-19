const ld = 1200;
const md = 1024;
const sm = 768;
const ldMin = ld;
const mdMin = md;
const mdMax = ld - 1;
const smMin = sm;
const smMax = md - 1;
const xsMax = sm - 1;

const sizes = [
  { name: 'only-mobile', max: xsMax },
  { name: 'only-tablet', min: smMin, max: xsMax },
  { name: 'only-desktop', min: mdMin, max: mdMax },
  { name: 'only-large-desktop', min: ldMin },
  { name: 'from-tablet', min: smMin },
  { name: 'from-tablet', min: smMin },
  { name: 'from-desktop', min: mdMin },
  { name: 'from-large-desktop', min: ldMin },
  { name: 'to-tablet', max: smMax },
  { name: 'to-desktop', max: mdMax },
];

const getObjQueries = () => {
  let data = {};

  for (let i = 0; i < sizes.length; i += 1) {
    const { name, min, max } = sizes[i];
    data = {
      ...data,
      [`--${name}`]: `${min ? `(min-width: ${min}px)` : ''}${min && max ? ' and ' : ' '}${
        max ? `(max-width: ${max}px)` : ''
      }`,
    };
  }

  return data;
};

const breakpoints = getObjQueries();

module.exports = {
  ldMin,
  mdMin,
  mdMax,
  smMin,
  smMax,
  xsMax,
  breakpoints,
};
