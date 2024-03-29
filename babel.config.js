module.exports = {
  presets: ['@babel/preset-typescript', ['@babel/preset-env', { targets: { esmodules: true } }]],
  plugins: [
    ['@babel/plugin-transform-runtime', { helpers: false, regenerator: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
